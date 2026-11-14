/**
 * src/components/TriageWorkflow.tsx
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import { symptomScore } from '../lib/symptoms';
import { useEffect, useRef, useState } from 'react';

// COMPONENTS
import { Button, Input, Select, Surface, Textarea, ToggleButton } from './ui/controls';

// DATA
import { clearLegacyPatientQueue, createPatientRecord, EMPTY_PATIENT_DETAILS, INITIAL_PATIENTS, parsePatientQueue, PATIENTS_STORAGE_KEY } from '../lib/patients';
import { SYMPTOMS } from '../lib/symptoms';

// TYPES
import type { Patient, PatientDetails } from '../lib/patients';

/*//////////////////////////////////////////////////
CONFIG
//////////////////////////////////////////////////*/
const TEXT_SM_TEXT_PRIMARY_9_CLASS = 'text-sm text-primary-9';
const MB_1_TEXT_XS_FONT_SEMIBOLD_UPPERCASE_TRACKING_0_16EM_TEXT_PRIMARY_9_CLASS = 'mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary-9';
const M_0_TEXT_2XL_FONT_SEMIBOLD_CLASS = 'm-0 text-2xl font-semibold';
const MB_1_TEXT_SM_TEXT_PRIMARY_9_CLASS = 'mb-1 text-sm text-primary-9';
const M_0_FONT_MEDIUM_CLASS = 'm-0 font-medium';

const panelClass = 'rounded-xl p-5 shadow-sm';

/*//////////////////////////////////////////////////
HELPERS
//////////////////////////////////////////////////*/

/**
 * Saves the simulated dispatch queue for the current browser session.
 *
 * @param p - Current patient queue to serialize into browser storage.
 */
function writePatients(p: Patient[]): void {
	try {
		window.sessionStorage.setItem(PATIENTS_STORAGE_KEY, JSON.stringify(p));
	} catch {
		// Keep the demo usable when browser storage is unavailable.
	}
}

/**
 * Formats elapsed time as `MM:SS`.
 *
 * @param seconds - Elapsed duration in whole seconds.
 *
 * @return The duration formatted with two-digit minutes and seconds.
 */
function timeLabel(seconds: number): string {
	return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

/**
 * Renders a nurse assessment workflow or an ambulance dispatch queue.
 *
 * @param mode - Selects nurse intake or ambulance dispatch.
 *
 * @return The selected workflow after client state is mounted, or null during initial hydration.
 */
export default function TriageWorkflow({ mode }: { mode: 'nurse' | 'ambulance' }): React.JSX.Element | null {
	const [mounted, setMounted] = useState(false);
	const [intake, setIntake] = useState<PatientDetails>(EMPTY_PATIENT_DETAILS);
	const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
	const [seconds, setSeconds] = useState(0);
	const intervalRef = useRef<number | null>(null);
	const [step, setStep] = useState<'intake' | 'result'>('intake');
	const [patients, setPatients] = useState<Patient[]>([]);
	const [selectedId, setSelectedId] = useState('');
	const score = symptomScore(selectedSymptoms);
	useEffect(() => {
		setMounted(true);
		try {
			clearLegacyPatientQueue(() => window.localStorage);
			setPatients(parsePatientQueue(window.sessionStorage.getItem(PATIENTS_STORAGE_KEY)) ?? INITIAL_PATIENTS);
		} catch {
			setPatients(INITIAL_PATIENTS);
		}
	}, []);
	useEffect((): (() => void) | void => {
		if (mode === 'ambulance') return;
		intervalRef.current = window.setInterval(() => setSeconds(current => current + 1), 1000);
		return () => {
			if (intervalRef.current !== null) {
				window.clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [mode]);
	/** Checks whether a patient matches the selected queue id.
	 * @param p - Patient record being rendered or searched.
	 * @returns Whether this patient is the currently selected request.
	 */
	function isSelectedPatient(p: Patient): boolean {
		return p.id === selectedId;
	}
	/** Renders one queue patient as an accessible selection toggle.
	 * @param p - Patient record to show in the dispatch queue.
	 * @returns The patient toggle with severity and dispatch status.
	 */
	function renderPatientToggle(p: Patient): React.JSX.Element {
		return (
			<ToggleButton
				key={p.id}
				data-patient-id={p.id}
				role='listitem'
				aria-pressed={selectedId === p.id}
				onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
					const id = e.currentTarget.dataset.patientId;
					if (id) setSelectedId(id);
				}}
				size='lg'
				className='justify-between'
			>
				<span>
					<span className='block font-semibold'>
						{p.firstName} {p.lastName}
					</span>
					<span className={TEXT_SM_TEXT_PRIMARY_9_CLASS}>Severity score: {p.score}</span>
				</span>
				<span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${p.status === 'pending' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'}`}>
					{p.status === 'pending' ? 'Pending' : 'Dispatched'}
				</span>
			</ToggleButton>
		);
	}
	const selectedPatient = patients.find(isSelectedPatient);
	const progress = [
		{ label: 'Incident', value: intake.phone ? 100 : 0 },
		{ label: 'Location', value: intake.location ? 100 : 0 },
		{ label: 'Personal', value: [intake.firstName, intake.lastName, intake.gender, intake.age].filter(Boolean).length * 25 },
		{ label: 'Medical', value: selectedSymptoms.length ? 100 : 0 },
	];
	/** Renders a progress label and filled percentage bar.
	 * @param i - Progress item containing its label and completion percentage.
	 * @returns The labeled visual progress bar.
	 */
	function renderProgressBar(i: (typeof progress)[number]): React.JSX.Element {
		return (
			<div key={i.label}>
				<div className='mb-1 flex justify-between text-sm'>
					<span>{i.label}</span>
					<span className='text-primary-9'>{i.value}%</span>
				</div>
				<div className='h-2 overflow-hidden rounded-full bg-primary-2'>
					<div className='h-full rounded-full bg-primary-9 transition-all' style={{ width: `${i.value}%` }} />
				</div>
			</div>
		);
	}
	/** Renders a compact card for one assessment progress item.
	 * @param i - Progress item containing its label and completion percentage.
	 * @returns The progress card shown in the assessment summary.
	 */
	function renderProgressCard(i: (typeof progress)[number]): React.JSX.Element {
		return (
			<Surface key={i.label} className='rounded-md p-3'>
				<p className='m-0 text-xs text-primary-9'>{i.label}</p>
				<p className='mb-0 mt-1 font-semibold'>{i.value}%</p>
			</Surface>
		);
	}
	/** Updates one intake value using the current form state.
	 * @param e - Input or select event naming the field and its new value.
	 */
	function handleIntakeFieldChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
		// terra-quality-ignore single-use -- Capture the event field before React runs the state updater.
		const key = e.currentTarget.name as keyof PatientDetails;
		const value = e.currentTarget.value;
		setIntake(current => ({ ...current, [key]: value }));
	}
	const intakeFields = [
		{ key: 'firstName', label: 'First name', type: 'text' },
		{ key: 'lastName', label: 'Last name', type: 'text' },
		{ key: 'phone', label: 'Phone number', type: 'tel' },
		{ key: 'location', label: 'Location', type: 'text' },
		{ key: 'age', label: 'Age', type: 'number' },
	] as const;
	/** Renders the configured patient intake field.
	 * @param f - Field definition providing its key, visible label, and input type.
	 * @returns A label and input bound to that intake property.
	 */
	function renderIntakeField(f: (typeof intakeFields)[number]): React.JSX.Element {
		return (
			<label key={f.key} className='text-sm font-medium'>
				{f.label}
				<Input className='mt-1' name={f.key} type={f.type} value={intake[f.key]} onChange={handleIntakeFieldChange} />
			</label>
		);
	}
	/** Renders a catalog symptom using its nurse-facing label.
	 * @param s - Symptom definition to render as an intake toggle.
	 * @returns A toggle that reflects whether this symptom is selected.
	 */
	function renderIntakeSymptom(s: (typeof SYMPTOMS)[number]): React.JSX.Element {
		return (
			<ToggleButton
				key={s.id}
				data-symptom-id={s.id}
				aria-pressed={selectedSymptoms.includes(s.id)}
				onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
					const id = e.currentTarget.dataset.symptomId;
					if (!id) return;
					const updated = new Set(selectedSymptoms);
					if (updated.has(id)) updated.delete(id);
					else updated.add(id);
					setSelectedSymptoms([...updated]);
				}}
				size='sm'
			>
				{s.nurseLabel}
			</ToggleButton>
		);
	}
	if (!mounted) return null;
	if (mode === 'ambulance') {
		return (
			<div className='mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.5fr)]'>
				<Surface as='section' className={`${panelClass} flex min-h-[32rem] flex-col`} aria-labelledby='queue-heading'>
					<p className={MB_1_TEXT_XS_FONT_SEMIBOLD_UPPERCASE_TRACKING_0_16EM_TEXT_PRIMARY_9_CLASS}>Emergency services</p>
					<h1 id='queue-heading' className='mb-4 mt-0 text-2xl font-semibold'>
						Dispatch requests
					</h1>
					{patients.length === 0 ? (
						<p className='text-primary-9'>No patients in the queue.</p>
					) : (
						<div className='flex flex-col gap-2' role='list' aria-label='Patients awaiting dispatch'>
							{patients.map(renderPatientToggle)}
						</div>
					)}
				</Surface>
				<Surface as='section' className={`${panelClass} flex min-h-[32rem] flex-col`} aria-live='polite'>
					{selectedPatient ? (
						<DispatchDetails
							patient={selectedPatient}
							onDispatch={(p: Patient) => {
								const updated = patients.map(i => (i.id === p.id ? { ...i, status: 'dispatched' as const } : i));
								setPatients(updated);
								writePatients(updated);
							}}
						/>
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
	const action = score >= 75 ? 'Dispatch Ambulance' : score >= 40 ? 'See GP' : 'All Fine';
	return (
		<div className='mx-auto w-full max-w-6xl'>
			{step === 'intake' ? (
				<>
					<Surface as='header' className='mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl px-5 py-4 shadow-sm'>
						<div>
							<p className={MB_1_TEXT_XS_FONT_SEMIBOLD_UPPERCASE_TRACKING_0_16EM_TEXT_PRIMARY_9_CLASS}>Nurse intake · simulated case</p>
							<h1 className={M_0_TEXT_2XL_FONT_SEMIBOLD_CLASS}>Patient assessment</h1>
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
								<span className={TEXT_SM_TEXT_PRIMARY_9_CLASS}>Step 1 of 2</span>
							</div>
							<div className='grid gap-4 sm:grid-cols-2'>
								{intakeFields.map(renderIntakeField)}
								<label className='text-sm font-medium'>
									Gender
									<Select className='mt-1' name='gender' value={intake.gender} onChange={handleIntakeFieldChange}>
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
								<div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>{SYMPTOMS.map(renderIntakeSymptom)}</div>
							</fieldset>
							<div className='mt-6 flex flex-wrap items-center justify-between gap-4'>
								<span className={TEXT_SM_TEXT_PRIMARY_9_CLASS}>
									Current triage score: <strong className='text-primary-12'>{score} / 100</strong>
								</span>
								<Button onClick={() => setStep('result')}>Review assessment →</Button>
							</div>
						</Surface>
						<aside className='flex flex-col gap-5'>
							<Surface as='section' className={panelClass}>
								<h2 className='mb-3 mt-0 text-lg font-semibold'>Assessment progress</h2>
								<div className='space-y-3'>{progress.map(renderProgressBar)}</div>
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
							<p className={MB_1_TEXT_XS_FONT_SEMIBOLD_UPPERCASE_TRACKING_0_16EM_TEXT_PRIMARY_9_CLASS}>Nurse intake · assessment result</p>
							<h1 id='result-heading' className={M_0_TEXT_2XL_FONT_SEMIBOLD_CLASS}>
								Recommended next step
							</h1>
						</div>
						<span className='rounded-lg bg-primary-2 px-4 py-2 font-mono tabular-nums'>◷ {timeLabel(seconds)}</span>
					</div>
					<div className='grid gap-6 sm:grid-cols-[12rem_1fr] sm:items-center'>
						<ScoreGauge score={score} />
						<div>
							<p className={MB_1_TEXT_SM_TEXT_PRIMARY_9_CLASS}>Computed severity score</p>
							<p className='mb-4 mt-0 text-4xl font-bold'>
								{score}
								<span className='text-lg font-medium text-primary-9'> / 100</span>
							</p>
							<p className='mb-2 text-sm text-primary-9'>Recommended action</p>
							<p className={M_0_TEXT_2XL_FONT_SEMIBOLD_CLASS}>{action}</p>
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
						<div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>{progress.map(renderProgressCard)}</div>
					</Surface>
					<div className='mt-6 flex flex-col-reverse justify-between gap-3 sm:flex-row'>
						<Button variant='primary-outline' size='sm' onClick={() => setStep('intake')}>
							← Back to assessment
						</Button>
						<Button
							size='sm'
							onClick={() => {
								const updated = [...patients, createPatientRecord(crypto.randomUUID(), intake, score, seconds)];
								setPatients(updated);
								writePatients(updated);
								setStep('intake');
								setIntake(EMPTY_PATIENT_DETAILS);
								setSelectedSymptoms([]);
								setSeconds(0);
								window.alert('Patient added to the ambulance dispatch queue.');
							}}
						>
							Add to dispatch queue
						</Button>
					</div>
				</Surface>
			)}
		</div>
	);
}

// terra-quality-ignore single-use -- Keep a named gauge component in React's render tree and error stack.
/**
 * Shows the assessment score marker along a low-to-high severity scale.
 *
 * @param score - Severity score on the 0–100 scale.
 *
 * @return An accessible visual gauge for the assessment score.
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

// terra-quality-ignore single-use -- Keep dispatch details as a named React component boundary.
/**
 * Displays the selected request's priority, recommendation, and dispatch action.
 *
 * @param patient - Assessment record currently selected in the ambulance queue.
 * @param onDispatch - Marks the selected patient as dispatched when the action is available.
 *
 * @return Dispatch details and the status-aware action button for the selected request.
 */
function DispatchDetails({ patient, onDispatch }: { patient: Patient; onDispatch: (patient: Patient) => void }): React.JSX.Element {
	const level = patient.score >= 75 ? 'Critical' : patient.score >= 40 ? 'Medium' : 'Low';
	return (
		<>
			<p className={MB_1_TEXT_XS_FONT_SEMIBOLD_UPPERCASE_TRACKING_0_16EM_TEXT_PRIMARY_9_CLASS}>Selected request</p>
			<h2 className='mb-6 mt-0 text-2xl font-semibold'>
				{patient.firstName} {patient.lastName}
			</h2>
			{patient.details && (
				<dl className='mb-6 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2'>
					{patient.details.phone && (
						<div>
							<dt className='text-primary-9'>Phone</dt>
							<dd className={M_0_FONT_MEDIUM_CLASS}>{patient.details.phone}</dd>
						</div>
					)}
					{patient.details.location && (
						<div>
							<dt className='text-primary-9'>Location</dt>
							<dd className={M_0_FONT_MEDIUM_CLASS}>{patient.details.location}</dd>
						</div>
					)}
					{patient.details.age && (
						<div>
							<dt className='text-primary-9'>Age</dt>
							<dd className={M_0_FONT_MEDIUM_CLASS}>{patient.details.age}</dd>
						</div>
					)}
					{patient.details.gender && (
						<div>
							<dt className='text-primary-9'>Gender</dt>
							<dd className={M_0_FONT_MEDIUM_CLASS}>{patient.details.gender}</dd>
						</div>
					)}
				</dl>
			)}
			<div className='grid gap-4 sm:grid-cols-[0.7fr_1.3fr]'>
				<div>
					<p className={MB_1_TEXT_SM_TEXT_PRIMARY_9_CLASS}>Priority level</p>
					<p className={M_0_TEXT_2XL_FONT_SEMIBOLD_CLASS}>{level}</p>
				</div>
				<div>
					<p className={MB_1_TEXT_SM_TEXT_PRIMARY_9_CLASS}>Recommended action</p>
					<p className='m-0 font-semibold'>
						{level === 'Critical'
							? 'Dispatch emergency medical services immediately.'
							: level === 'Medium'
								? 'Advise patient to see a GP within 24 hours.'
								: 'Recommend a GP visit in the next 1–3 days if symptoms persist.'}
					</p>
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
