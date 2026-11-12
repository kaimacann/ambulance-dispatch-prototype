/**
 * src/components/GpDemo.tsx
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import { symptomScore } from '../lib/symptoms';
import { useEffect, useRef, useState } from 'react';

// COMPONENTS
import { Button, Input, Select, Surface, ToggleButton } from './ui/controls';

// DATA
import { clearLegacyPatientQueue, createPatientRecord, EMPTY_PATIENT_DETAILS, persistPatient } from '../lib/patients';
import { SYMPTOMS } from '../lib/symptoms';

// TYPES
import type { Patient, PatientDetails } from '../lib/patients';
const GRID_GAP_1_CLASS = 'grid gap-1';
const TEXT_SM_FONT_MEDIUM_LEADING_NONE_TEXT_PRIMARY_11_CLASS = 'text-sm font-medium leading-none text-primary-11';

/*//////////////////////////////////////////////////
HELPERS
//////////////////////////////////////////////////*/

/**
 * Renders the interactive GP triage form and its local referral timer demo.
 *
 * @return The triage interface after client hydration, or `null` during server rendering.
 */
export default function GpDemo(): React.JSX.Element | null {
	const [isMounted, setIsMounted] = useState(false);
	const [selSymptoms, setSelSymptoms] = useState<string[]>([]);
	const [seconds, setSeconds] = useState(0);
	const intervalRef = useRef<number | null>(null);
	const [formData, setFormData] = useState<PatientDetails>(EMPTY_PATIENT_DETAILS);
	/** Clears legacy local queue data and enables the hydrated form. */
	function mountDemo(): void {
		clearLegacyPatientQueue(() => window.localStorage);
		setIsMounted(true);
	}
	/** Advances the referral timer's functional state by one second.
	 * @param current - Elapsed seconds before this timer tick.
	 * @returns Elapsed seconds after the tick.
	 */
	function incrementSeconds(current: number): number {
		return current + 1;
	}
	/** Queues one elapsed-second update for the referral timer. */
	function advanceReferralTimer(): void {
		setSeconds(incrementSeconds);
	}
	/** Stops the referral timer and clears its stored interval id. */
	function clearReferralTimer(): void {
		if (intervalRef.current !== null) {
			window.clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}
	/** Starts the referral timer and returns its effect cleanup callback.
	 * @returns A callback that stops the timer when the demo unmounts.
	 */
	function startReferralTimer(): () => void {
		intervalRef.current = window.setInterval(advanceReferralTimer, 1000);
		return clearReferralTimer;
	}
	useEffect(mountDemo, []);
	useEffect(startReferralTimer, []);
	/**
	 * Update one patient detail while keeping the other form values intact.
	 *
	 * @param key - Field in the intake form to update.
	 * @param value - New text value for that field.
	 */
	function handleFormChange(key: keyof PatientDetails, value: string): void {
		/** Merges the selected intake field into the latest form state.
		 * @param previous - Form values before this field update.
		 * @returns Form values with the selected field replaced.
		 */
		function mergeChangedField(previous: PatientDetails): PatientDetails {
			return { ...previous, [key]: value };
		}
		setFormData(mergeChangedField);
	}
	/** Applies the changed value from an intake input or select.
	 * @param e - Form control event whose name and value identify the field update.
	 */
	function handleFormFieldChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
		handleFormChange(e.currentTarget.name as keyof PatientDetails, e.currentTarget.value);
	}
	/** Toggles the symptom identified by the clicked button.
	 * @param e - Click event carrying the symptom id in its data attribute.
	 */
	function handleSymptomSelection(e: React.MouseEvent<HTMLButtonElement>): void {
		const id = e.currentTarget.dataset.symptomId;
		if (typeof id !== 'string' || !id) return;
		const nSelection = new Set(selSymptoms);
		if (nSelection.has(id)) nSelection.delete(id);
		else nSelection.add(id);
		setSelSymptoms([...nSelection]);
	}
	/** Renders one catalog symptom as a pressed-state toggle.
	 * @param s - Symptom definition providing the GP label and stable id.
	 * @returns The accessible toggle button for this symptom.
	 */
	function renderSymptomButton(s: (typeof SYMPTOMS)[number]): React.JSX.Element {
		return (
			<ToggleButton
				key={s.id}
				data-symptom-id={s.id}
				aria-pressed={selSymptoms.includes(s.id)}
				onClick={handleSymptomSelection}
				variant='primary-tonal'
				size='sm'
				className='w-full flex-col items-start space-y-1'
			>
				<span className='font-medium'>{s.gpLabel}</span>
			</ToggleButton>
		);
	}
	/** Builds a patient record, stores it for dispatch, and reports the transfer result. */
	function transferPatient(): void {
		const patient: Patient = createPatientRecord(crypto.randomUUID(), formData, symptomScore(selSymptoms), seconds);
		const persisted = persistPatient(() => window.sessionStorage, patient);
		alert(persisted ? 'Patient information transferred to Emergency Dispatch.' : 'Patient information could not be transferred. Please try again.');
	}
	const patientFields = [
		['First Name', 'firstName', 'text', 'Jane'],
		['Last Name', 'lastName', 'text', 'Doe'],
		['Phone Number', 'phone', 'tel', '(555) 123-4567'],
		['Location', 'location', 'text', '123 Main St'],
	] as const;

	/** Renders a labeled input from one configured patient field.
	 * @param d - Visible label for the intake property.
	 * @param f - Property key whose patient value the input edits.
	 * @param v - HTML input type for the property.
	 * @param r - Example placeholder shown when the value is empty.
	 * @returns The labeled input bound to the matching form value.
	 */
	function renderPatientField([d, f, v, r]: (typeof patientFields)[number]): React.JSX.Element {
		return (
			<div key={f} className={GRID_GAP_1_CLASS}>
				<label className={TEXT_SM_FONT_MEDIUM_LEADING_NONE_TEXT_PRIMARY_11_CLASS} htmlFor={`field-${f}`}>
					{d}
				</label>
				<Input id={`field-${f}`} name={f} type={v} placeholder={r} value={formData[f]} onChange={handleFormFieldChange} />
			</div>
		);
	}
	if (!isMounted) return null;
	return (
		<div className='mx-auto flex w-full max-w-3xl flex-col'>
			<Surface variant='secondary-tonal' className='mb-6 flex items-start gap-3 rounded-lg p-4'>
				<svg className='mt-0.5 size-5 shrink-0' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' aria-hidden='true'>
					<circle cx='12' cy='12' r='9' />
					<path d='M12 11v5m0-8h.01' strokeLinecap='round' />
				</svg>
				<p className='text-sm font-medium'>For patients in critical condition, transfer the patient information to emergency services for prompt service.</p>
			</Surface>
			<Surface variant='primary-tonal' className='flex flex-col overflow-auto rounded-xl shadow-sm'>
				<div className='flex flex-col space-y-1.5 p-6 pb-0 pt-4'>
					<h1 className='m-0 text-base font-semibold leading-none tracking-tight'>Patient Info</h1>
				</div>
				<div className='space-y-8 p-6 text-base'>
					<div className='grid grid-cols-2 gap-2'>
						{patientFields.map(renderPatientField)}
						<div className={GRID_GAP_1_CLASS}>
							<label className={TEXT_SM_FONT_MEDIUM_LEADING_NONE_TEXT_PRIMARY_11_CLASS} htmlFor='field-gender'>
								Gender
							</label>
							<Select id='field-gender' name='gender' value={formData.gender} onChange={handleFormFieldChange}>
								<option value=''>Select...</option>
								<option value='Male'>Male</option>
								<option value='Female'>Female</option>
								<option value='Other'>Other</option>
								<option value='Prefer not to specify'>Prefer not to specify</option>
							</Select>
						</div>
						<div className={GRID_GAP_1_CLASS}>
							<label className={TEXT_SM_FONT_MEDIUM_LEADING_NONE_TEXT_PRIMARY_11_CLASS} htmlFor='field-age'>
								Age
							</label>
							<Input id='field-age' name='age' type='number' placeholder='52' value={formData.age} onChange={handleFormFieldChange} />
						</div>
					</div>
					<div className='space-y-3 pt-2'>
						<p className='text-sm font-medium text-current/80'>Reported Symptoms (Select 1 or more)</p>
						<div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>{SYMPTOMS.map(renderSymptomButton)}</div>
					</div>
					<div className='pt-2'>
						<Button onClick={transferPatient} variant='destructive' size='lg' className='w-full'>
							Refer to Ambulance Dispatch
						</Button>
					</div>
				</div>
			</Surface>
		</div>
	);
}
