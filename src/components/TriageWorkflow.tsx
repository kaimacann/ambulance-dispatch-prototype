import { useEffect, useState } from 'react';
import { EMPTY_PATIENT_DETAILS, INITIAL_PATIENTS, PATIENTS_STORAGE_KEY, type Patient, type PatientDetails } from '../lib/patients';
import { SYMPTOMS, symptomScore } from '../lib/symptoms';
import { Button, Input, Select, Surface, Textarea, ToggleButton } from './ui/controls';

/** Selects the nurse intake view or ambulance dispatch queue. */
type Props = { mode: 'nurse' | 'ambulance' };
const panelClass = 'rounded-xl p-5 shadow-sm';

/** Loads saved assessments, falling back to the fixture queue when storage is unavailable or empty.
 * @returns Stored patients, or the initial fixture patients when none are saved.
 */
function readPatients(): Patient[] {
	try {
		const stored = window.localStorage.getItem(PATIENTS_STORAGE_KEY);
		return stored ? (JSON.parse(stored) as Patient[]) : INITIAL_PATIENTS;
	} catch {
		return INITIAL_PATIENTS;
	}
}

/** Saves the simulated dispatch queue when browser storage is available.
 * @param patients - Current patient queue to serialize into browser storage.
 */
function writePatients(patients: Patient[]): void {
	try {
		window.localStorage.setItem(PATIENTS_STORAGE_KEY, JSON.stringify(patients));
	} catch {
		// Keep the demo usable when browser storage is unavailable.
	}
}

/** Formats elapsed time as `MM:SS`.
 * @param seconds - Elapsed duration in whole seconds.
 * @returns The duration formatted with two-digit minutes and seconds.
 */
function timeLabel(seconds: number): string {
	return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

/** Maps the triage score to the dispatch priority label.
 * @param score - Numeric triage score produced from selected symptoms.
 * @returns Critical, medium, or low priority for the dispatch queue.
 */
function priority(score: number): 'Critical' | 'Medium' | 'Low' {
	return score >= 75 ? 'Critical' : score >= 40 ? 'Medium' : 'Low';
}

/**
 * Renders a nurse assessment workflow or an ambulance dispatch queue.
 *
 * @param props - Workflow mode that determines which role-specific interface is displayed.
 * @param mode - Selects nurse intake or ambulance dispatch.
 * @returns The selected workflow after client state is mounted, or null during initial hydration.
 */
export default function TriageWorkflow({ mode }: Props): React.JSX.Element | null {
	const [mounted, setMounted] = useState(false);
	const [intake, setIntake] = useState<PatientDetails>(EMPTY_PATIENT_DETAILS);
	const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
	const [seconds, setSeconds] = useState(0);
	const [step, setStep] = useState<'intake' | 'result'>('intake');
	const [patients, setPatients] = useState<Patient[]>([]);
	const [selectedId, setSelectedId] = useState('');
	const score = symptomScore(selectedSymptoms);

	useEffect(() => {
		setMounted(true);
		setPatients(readPatients());
	}, []);

	useEffect(() => {
		if (mode === 'ambulance') return;
		const timer = window.setInterval(() => setSeconds(value => value + 1), 1000);
		return () => window.clearInterval(timer);
	}, [mode]);

	const selectedPatient = patients.find(patient => patient.id === selectedId);

	if (!mounted) return null;

	if (mode === 'ambulance') {
		const dispatch = (patient: Patient) => {
			const updated = patients.map(item => (item.id === patient.id ? { ...item, status: 'dispatched' as const } : item));
			setPatients(updated);
			writePatients(updated);
		};
		return (
			<div className='mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.5fr)]'>
				<Surface as='section' className={`${panelClass} flex min-h-[32rem] flex-col`} aria-labelledby='queue-heading'>
					<p className='mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary-9'>Emergency services</p>
					<h1 id='queue-heading' className='mb-4 mt-0 text-2xl font-semibold'>
						Dispatch requests
					</h1>
					{patients.length === 0 ? (
						<p className='text-primary-9'>No patients in the queue.</p>
					) : (
						<div className='flex flex-col gap-2' role='list' aria-label='Patients awaiting dispatch'>
							{patients.map(patient => (
								<ToggleButton key={patient.id} role='listitem' aria-pressed={selectedId === patient.id} onClick={() => setSelectedId(patient.id)} size='lg' className='justify-between'>
									<span>
										<span className='block font-semibold'>
											{patient.firstName} {patient.lastName}
										</span>
										<span className='text-sm text-primary-9'>Severity score: {patient.score}</span>
									</span>
									<span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${patient.status === 'pending' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'}`}>
										{patient.status === 'pending' ? 'Pending' : 'Dispatched'}
									</span>
								</ToggleButton>
							))}
						</div>
					)}
				</Surface>
				<Surface as='section' className={`${panelClass} flex min-h-[32rem] flex-col`} aria-live='polite'>
					{selectedPatient ? (
						<DispatchDetails patient={selectedPatient} onDispatch={dispatch} />
					) : (
						<div className='m-auto max-w-sm text-center text-primary-9'>
							<span className='mb-3 block text-3xl' aria-hidden='true'>
								↖
							</span>
							Select a patient from the queue to review priority and recommended action.
						</div>
					)}
				</Surface>
			</div>
		);
	}

	const progress = [
		{ label: 'Incident', value: intake.phone ? 100 : 0 },
		{ label: 'Location', value: intake.location ? 100 : 0 },
		{ label: 'Personal', value: [intake.firstName, intake.lastName, intake.gender, intake.age].filter(Boolean).length * 25 },
		{ label: 'Medical', value: selectedSymptoms.length ? 100 : 0 },
	];
	const action = score >= 75 ? 'Dispatch Ambulance' : score >= 40 ? 'See GP' : 'All Fine';
	const finish = () => {
		const patient: Patient = { id: crypto.randomUUID(), firstName: intake.firstName || 'Unknown', lastName: intake.lastName || 'Patient', score, eta: '6-8', status: 'pending', timeSeconds: seconds };
		const updated = [...patients, patient];
		setPatients(updated);
		writePatients(updated);
		setStep('intake');
		setIntake(EMPTY_PATIENT_DETAILS);
		setSelectedSymptoms([]);
		setSeconds(0);
		window.alert('Patient added to the ambulance dispatch queue.');
	};

	return (
		<div className='mx-auto w-full max-w-6xl'>
			{step === 'intake' ? (
				<>
					<Surface as='header' className='mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl px-5 py-4 shadow-sm'>
						<div>
							<p className='mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary-9'>Nurse intake · simulated case</p>
							<h1 className='m-0 text-2xl font-semibold'>Patient assessment</h1>
						</div>
						<Surface as='span' variant='primary-tonal' className='rounded-lg px-4 py-2 font-mono text-lg tabular-nums' aria-label={`Elapsed time ${timeLabel(seconds)}`}>
							◷ {timeLabel(seconds)}
						</Surface>
					</Surface>
					<div className='grid items-start gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]'>
						<Surface as='section' className={panelClass} aria-labelledby='caller-heading'>
							<div className='mb-5 flex items-center justify-between'>
								<h2 id='caller-heading' className='m-0 text-xl font-semibold'>
									Caller & patient details
								</h2>
								<span className='text-sm text-primary-9'>Step 1 of 2</span>
							</div>
							<div className='grid gap-4 sm:grid-cols-2'>
								{(
									[
										{ key: 'firstName', label: 'First name', type: 'text' },
										{ key: 'lastName', label: 'Last name', type: 'text' },
										{ key: 'phone', label: 'Phone number', type: 'tel' },
										{ key: 'location', label: 'Location', type: 'text' },
										{ key: 'age', label: 'Age', type: 'number' },
									] as const
								).map(field => (
									<label key={field.key} className='text-sm font-medium'>
										{field.label}
										<Input className='mt-1' type={field.type} value={intake[field.key]} onChange={event => setIntake(current => ({ ...current, [field.key]: event.currentTarget.value }))} />
									</label>
								))}
								<label className='text-sm font-medium'>
									Gender
									<Select className='mt-1' value={intake.gender} onChange={event => setIntake(current => ({ ...current, gender: event.currentTarget.value }))}>
										<option value=''>Select…</option>
										<option>Female</option>
										<option>Male</option>
										<option>Other</option>
										<option>Prefer not to specify</option>
									</Select>
								</label>
							</div>
							<fieldset className='mt-6 border-0 p-0'>
								<legend className='mb-3 text-sm font-semibold'>
									Reported symptoms <span className='font-normal text-primary-9'>(select all that apply)</span>
								</legend>
								<div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
									{SYMPTOMS.map(item => {
										const checked = selectedSymptoms.includes(item.id);
										return (
											<ToggleButton
												key={item.id}
												aria-pressed={checked}
												onClick={() => setSelectedSymptoms(current => (checked ? current.filter(id => id !== item.id) : [...current, item.id]))}
												size='sm'
											>
												{item.nurseLabel}
											</ToggleButton>
										);
									})}
								</div>
							</fieldset>
							<div className='mt-6 flex flex-wrap items-center justify-between gap-4'>
								<span className='text-sm text-primary-9'>
									Current triage score: <strong className='text-primary-12'>{score} / 100</strong>
								</span>
								<Button onClick={() => setStep('result')}>Review assessment →</Button>
							</div>
						</Surface>
						<aside className='flex flex-col gap-5'>
							<Surface as='section' className={panelClass}>
								<h2 className='mb-3 mt-0 text-lg font-semibold'>Assessment progress</h2>
								<div className='space-y-3'>
									{progress.map(item => (
										<div key={item.label}>
											<div className='mb-1 flex justify-between text-sm'>
												<span>{item.label}</span>
												<span className='text-primary-9'>{item.value}%</span>
											</div>
											<div className='h-2 overflow-hidden rounded-full bg-primary-2'>
												<div className='h-full rounded-full bg-primary-9 transition-all' style={{ width: `${item.value}%` }} />
											</div>
										</div>
									))}
								</div>
							</Surface>
							<Surface as='section' className={panelClass}>
								<h2 className='mb-2 mt-0 text-lg font-semibold'>Suggested questions</h2>
								<ul className='mb-0 space-y-2 pl-5 text-sm text-primary-10'>
									<li>When did the symptoms begin?</li>
									<li>Have symptoms changed recently?</li>
									<li>Does the patient have relevant medical history?</li>
								</ul>
							</Surface>
							<Surface as='section' className={`${panelClass} border-dashed`}>
								<h2 className='mb-2 mt-0 text-lg font-semibold'>Handover notes</h2>
								<Textarea aria-label='Handover notes' placeholder='Record notes for the receiving team' />
							</Surface>
						</aside>
					</div>
				</>
			) : (
				<Surface as='section' className={`${panelClass} mx-auto max-w-3xl`} aria-labelledby='result-heading'>
					<div className='mb-5 flex flex-wrap items-start justify-between gap-4'>
						<div>
							<p className='mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary-9'>Nurse intake · assessment result</p>
							<h1 id='result-heading' className='m-0 text-2xl font-semibold'>
								Recommended next step
							</h1>
						</div>
						<span className='rounded-lg bg-primary-2 px-4 py-2 font-mono tabular-nums'>◷ {timeLabel(seconds)}</span>
					</div>
					<div className='grid gap-6 sm:grid-cols-[12rem_1fr] sm:items-center'>
						<ScoreGauge score={score} />
						<div>
							<p className='mb-1 text-sm text-primary-9'>Computed severity score</p>
							<p className='mb-4 mt-0 text-4xl font-bold'>
								{score}
								<span className='text-lg font-medium text-primary-9'> / 100</span>
							</p>
							<p className='mb-2 text-sm text-primary-9'>Recommended action</p>
							<p className='m-0 text-2xl font-semibold'>{action}</p>
							<p className='mt-2 text-sm text-primary-9'>
								{action === 'Dispatch Ambulance'
									? 'Escalate to emergency services immediately.'
									: action === 'See GP'
										? 'Arrange clinical review within 24 hours.'
										: 'Continue to monitor and seek care if symptoms worsen.'}
							</p>
						</div>
					</div>
					<Surface variant='primary-tonal' className='mt-6 rounded-lg p-4'>
						<h2 className='mb-3 mt-0 text-base font-semibold'>Information completeness</h2>
						<div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
							{progress.map(item => (
								<Surface key={item.label} className='rounded-md p-3'>
									<p className='m-0 text-xs text-primary-9'>{item.label}</p>
									<p className='mb-0 mt-1 font-semibold'>{item.value}%</p>
								</Surface>
							))}
						</div>
					</Surface>
					<div className='mt-6 flex flex-col-reverse justify-between gap-3 sm:flex-row'>
						<Button variant='primary-outline' size='sm' onClick={() => setStep('intake')}>
							← Back to assessment
						</Button>
						<Button size='sm' onClick={finish}>
							Add to dispatch queue
						</Button>
					</div>
				</Surface>
			)}
		</div>
	);
}

/**
 * Shows the assessment score marker along a low-to-high severity scale.
 *
 * @param props - Assessment score displayed by the gauge.
 * @param score - Severity score on the 0–100 scale.
 * @returns An accessible visual gauge for the assessment score.
 */
function ScoreGauge({ score }: { score: number }): React.JSX.Element {
	return (
		<div className='mx-auto w-full max-w-48' role='img' aria-label={`Severity score ${score} out of 100`}>
			<div className='relative h-4 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-600'>
				<span className='absolute -top-1 h-6 w-1 rounded bg-primary-12 shadow' style={{ left: `${score}%` }} />
			</div>
			<div className='mt-2 flex justify-between text-xs text-primary-9'>
				<span>Low</span>
				<span>Moderate</span>
				<span>High</span>
			</div>
		</div>
	);
}

/**
 * Displays the selected request's priority, recommendation, and dispatch action.
 *
 * @param props - Selected queue record and the callback that changes its dispatch status.
 * @param patient - Assessment record currently selected in the ambulance queue.
 * @param onDispatch - Marks the selected patient as dispatched when the action is available.
 * @returns Dispatch details and the status-aware action button for the selected request.
 */
function DispatchDetails({ patient, onDispatch }: { patient: Patient; onDispatch: (patient: Patient) => void }): React.JSX.Element {
	const level = priority(patient.score);
	const advice =
		level === 'Critical'
			? 'Dispatch emergency medical services immediately.'
			: level === 'Medium'
				? 'Advise patient to see a GP within 24 hours.'
				: 'Recommend a GP visit in the next 1–3 days if symptoms persist.';
	return (
		<>
			<p className='mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary-9'>Selected request</p>
			<h2 className='mb-6 mt-0 text-2xl font-semibold'>
				{patient.firstName} {patient.lastName}
			</h2>
			<div className='grid gap-4 sm:grid-cols-[0.7fr_1.3fr]'>
				<div>
					<p className='mb-1 text-sm text-primary-9'>Priority level</p>
					<p className='m-0 text-2xl font-semibold'>{level}</p>
				</div>
				<div>
					<p className='mb-1 text-sm text-primary-9'>Recommended action</p>
					<p className='m-0 font-semibold'>{advice}</p>
				</div>
			</div>
			<Surface variant='primary-tonal' className='my-8 rounded-xl p-5'>
				<div className='mb-2 flex justify-between text-sm'>
					<span>Severity score</span>
					<strong>{patient.score} / 100</strong>
				</div>
				<div className='relative h-4 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-600'>
					<span className='absolute -top-1 h-6 w-1 rounded bg-primary-12 shadow' style={{ left: `${patient.score}%` }} />
				</div>
				<div className='mt-2 flex justify-between text-xs text-primary-9'>
					<span>Low</span>
					<span>Moderate</span>
					<span>Critical</span>
				</div>
				<p className='mb-0 mt-5 text-sm text-primary-9'>Reported assessment completed in {timeLabel(patient.timeSeconds)}.</p>
			</Surface>
			{level === 'Critical' && (
				<p className='text-sm'>
					Estimated arrival: <strong>{patient.eta} min</strong>
				</p>
			)}
			<Button disabled={patient.status === 'dispatched'} onClick={() => onDispatch(patient)} size='lg' className='mt-auto'>
				{patient.status === 'dispatched' ? 'Already dispatched' : 'Dispatch ambulance'}
			</Button>
		</>
	);
}
