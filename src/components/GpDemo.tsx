import { useEffect, useState } from 'react';
import { EMPTY_PATIENT_DETAILS, INITIAL_PATIENTS, PATIENTS_STORAGE_KEY, type Patient, type PatientDetails } from '../lib/patients';
import { SYMPTOMS, symptomScore } from '../lib/symptoms';
import { Button, Input, Select, Surface, ToggleButton } from './ui/controls';

/** Renders the interactive GP triage form and its local referral timer demo.
 * @returns The triage interface after client hydration, or `null` during server rendering.
 */
export default function GpDemo(): React.JSX.Element | null {
	const [isMounted, setIsMounted] = useState(false);
	const [selSymptoms, setSelSymptoms] = useState<string[]>([]);
	const [seconds, setSeconds] = useState(0);
	const [formData, setFormData] = useState<PatientDetails>(EMPTY_PATIENT_DETAILS);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			setSeconds(current => current + 1);
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const handleFormChange = (key: keyof PatientDetails, value: string) => {
		setFormData(previous => ({ ...previous, [key]: value }));
	};

	const toggleSymptom = (id: string) => {
		setSelSymptoms(previous => (previous.includes(id) ? previous.filter(symptom => symptom !== id) : [...previous, id]));
	};

	const calcdScore = symptomScore(selSymptoms);

	const savePatient = () => {
		const patient: Patient = {
			id: crypto.randomUUID(),
			firstName: formData.firstName || 'Unknown',
			lastName: formData.lastName || 'Patient',
			score: calcdScore,
			eta: '6-8',
			status: 'pending',
			timeSeconds: seconds,
		};
		try {
			const existing = window.localStorage.getItem(PATIENTS_STORAGE_KEY);
			const patients = existing ? (JSON.parse(existing) as Patient[]) : INITIAL_PATIENTS;
			window.localStorage.setItem(PATIENTS_STORAGE_KEY, JSON.stringify([...patients, patient]));
		} catch {
			// Keep the visible demo confirmation available if browser storage is disabled.
		}
	};

	if (!isMounted) return null;

	const handleGpReferral = () => {
		savePatient();
		alert('Patient information transferred to Emergency Dispatch.');
	};

	return (
		<div className='mx-auto flex w-full max-w-3xl flex-col'>
			<Surface variant='secondary-tonal' className='mb-6 flex items-start gap-3 rounded-lg border p-4'>
				<svg className='mt-0.5 size-5 shrink-0' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' aria-hidden='true'>
					<circle cx='12' cy='12' r='9' />
					<path d='M12 11v5m0-8h.01' strokeLinecap='round' />
				</svg>
				<p className='text-sm font-medium'>For patients in critical condition, transfer the patient information to emergency services for prompt service.</p>
			</Surface>
			<Surface variant='primary-tonal' className='flex flex-col overflow-auto rounded-xl border shadow-sm'>
				<div className='flex flex-col space-y-1.5 p-6 pb-0 pt-4'>
					<h1 className='m-0 text-base font-semibold leading-none tracking-tight'>Patient Info</h1>
				</div>
				<div className='space-y-8 p-6 text-base'>
					<div className='grid grid-cols-2 gap-2'>
						{(
							[
								['First Name', 'firstName', 'text', 'Jane'],
								['Last Name', 'lastName', 'text', 'Doe'],
								['Phone Number', 'phone', 'tel', '(555) 123-4567'],
								['Location', 'location', 'text', '123 Main St'],
							] as const
						).map(([label, key, type, placeholder]) => (
							<div key={key} className='grid gap-1'>
								<label className='text-sm font-medium leading-none text-primary-11' htmlFor={`field-${key}`}>
									{label}
								</label>
								<Input
									id={`field-${key}`}
									variant='primary'
									size='md'
									type={type}
									placeholder={placeholder}
									value={formData[key]}
									onChange={event => handleFormChange(key, event.currentTarget.value)}
								/>
							</div>
						))}
						<div className='grid gap-1'>
							<label className='text-sm font-medium leading-none text-primary-11' htmlFor='field-gender'>
								Gender
							</label>
							<Select id='field-gender' aria-label='Select...' variant='primary' size='md' value={formData.gender} onChange={event => handleFormChange('gender', event.currentTarget.value)}>
								<option value=''>Select...</option>
								<option value='Male'>Male</option>
								<option value='Female'>Female</option>
								<option value='Other'>Other</option>
								<option value='Prefer not to specify'>Prefer not to specify</option>
							</Select>
						</div>
						<div className='grid gap-1'>
							<label className='text-sm font-medium leading-none text-primary-11' htmlFor='field-age'>
								Age
							</label>
							<Input id='field-age' type='number' placeholder='52' variant='primary' size='md' value={formData.age} onChange={event => handleFormChange('age', event.currentTarget.value)} />
						</div>
					</div>

					<div className='space-y-3 pt-2'>
						<p className='text-sm font-medium text-current/80'>Reported Symptoms (Select 1 or more)</p>
						<div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
							{SYMPTOMS.map(symptom => {
								const selected = selSymptoms.includes(symptom.id);
								return (
									<ToggleButton
										key={symptom.id}
										aria-pressed={selected}
										data-state={selected ? 'checked' : 'unchecked'}
										onClick={() => toggleSymptom(symptom.id)}
										variant='primary-tonal'
										size='sm'
										className='w-full flex-col items-start space-y-1'
									>
										<span className='font-medium'>{symptom.gpLabel}</span>
									</ToggleButton>
								);
							})}
						</div>
					</div>

					<div className='pt-2'>
						<Button onClick={handleGpReferral} variant='destructive' size='lg' className='w-full'>
							Refer to Ambulance Dispatch
						</Button>
					</div>
				</div>
			</Surface>
		</div>
	);
}
