/**
 * src/lib/patients.ts
 * Minimal simulated patient assessment stored in the dispatch queue and shown as a referral result.
 */

/** Caller and patient details collected during either assessment form. */
export type PatientDetails = { firstName: string; lastName: string; phone: string; location: string; gender: string; age: string };

/** Simulated patient record retained in the current browser session's dispatch queue. */
export type Patient = { id: string; firstName: string; lastName: string; details?: PatientDetails; score: number; eta: string; status: 'pending' | 'dispatched'; timeSeconds: number };

/** Builds a queue record while retaining the details entered during assessment.
 * @param id Stable identity assigned to the assessment.
 * @param details Caller and patient values collected by the form.
 * @param score Calculated severity score for the selected symptoms.
 * @param timeSeconds Elapsed time recorded for the assessment.
 * @returns A pending queue record containing a copy of the submitted details.
 */
export function createPatientRecord(id: string, details: PatientDetails, score: number, timeSeconds: number): Patient {
	return { id, firstName: details.firstName || 'Unknown', lastName: details.lastName || 'Patient', details: { ...details }, score, eta: '6-8', status: 'pending', timeSeconds };
}

/**
 * Validates decoded storage data before treating it as a dispatch-queue record.
 *
 * @param v Candidate value produced by parsing the saved queue.
 * @returns Whether the identity, numeric fields, status, and optional intake details match a patient record.
 */
function isPatientRecord(v: unknown): v is Patient {
	if (!v || typeof v !== 'object' || Array.isArray(v)) return false;
	const patient = v as Record<string, unknown>;
	const details = patient.details;
	if (details !== undefined) {
		if (!details || typeof details !== 'object' || Array.isArray(details)) return false;
		const patientDetails = details as Record<string, unknown>;
		for (const field of ['firstName', 'lastName', 'phone', 'location', 'gender', 'age'] as const) {
			if (typeof patientDetails[field] !== 'string') return false;
		}
	}
	return (
		typeof patient.id === 'string' &&
		typeof patient.firstName === 'string' &&
		typeof patient.lastName === 'string' &&
		typeof patient.score === 'number' &&
		Number.isFinite(patient.score) &&
		typeof patient.eta === 'string' &&
		(patient.status === 'pending' || patient.status === 'dispatched') &&
		typeof patient.timeSeconds === 'number' &&
		Number.isFinite(patient.timeSeconds)
	);
}

/**
 * Parses saved patient records without trusting browser storage's untyped contents.
 *
 * @param serialized JSON text read from storage, or `null` when no queue exists.
 * @returns The fixture queue for empty storage, validated records, or `null` for malformed data.
 */
export function parsePatientQueue(serialized: string | null): Patient[] | null {
	if (serialized === null) return INITIAL_PATIENTS;
	try {
		const patients: unknown = JSON.parse(serialized);
		return Array.isArray(patients) && patients.every(isPatientRecord) ? patients : null;
	} catch {
		return null;
	}
}

/**
 * Removes patient records written by the demo's previous persistent-storage behavior.
 *
 * @param storage Browser storage adapter that may contain records from an earlier demo visit.
 *
 * @return `true` when the legacy key was removed or was already absent.
 */
export function clearLegacyPatientQueue(storage: Pick<Storage, 'removeItem'> | (() => Pick<Storage, 'removeItem'>)): boolean {
	try {
		(typeof storage === 'function' ? storage() : storage).removeItem(PATIENTS_STORAGE_KEY);
		return true;
	} catch {
		return false;
	}
}

/**
 * Adds an assessment to storage and reports whether persistence succeeded.
 *
 * @param storage Browser storage adapter used by the assessment demo.
 * @param patient Valid assessment record to append to the dispatch queue.
 * @returns `true` only after the updated queue has been written successfully.
 */
export function persistPatient(storage: Pick<Storage, 'getItem' | 'setItem'> | (() => Pick<Storage, 'getItem' | 'setItem'>), patient: Patient): boolean {
	try {
		const resolvedStorage = typeof storage === 'function' ? storage() : storage;
		const existing = parsePatientQueue(resolvedStorage.getItem(PATIENTS_STORAGE_KEY));
		if (!existing) return false;
		resolvedStorage.setItem(PATIENTS_STORAGE_KEY, JSON.stringify([...existing, patient]));
		return true;
	} catch {
		return false;
	}
}

export const EMPTY_PATIENT_DETAILS: PatientDetails = { firstName: '', lastName: '', phone: '', location: '', gender: '', age: '' };
export const PATIENTS_STORAGE_KEY = 'terra-patients';
export const INITIAL_PATIENTS: Patient[] = [
	{ id: 'patient-1', firstName: 'Sarah', lastName: 'Connor', score: 85, eta: '6-8', status: 'pending', timeSeconds: 45 },
	{ id: 'patient-2', firstName: 'Kyle', lastName: 'Reese', score: 42, eta: 'N/A', status: 'pending', timeSeconds: 112 },
	{ id: 'patient-3', firstName: 'Miles', lastName: 'Dyson', score: 92, eta: '3-5', status: 'dispatched', timeSeconds: 15 },
];
