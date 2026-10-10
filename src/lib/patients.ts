/** Minimal simulated patient assessment stored in the dispatch queue and shown as a referral result. */
export type Patient = {
	id: string;
	firstName: string;
	lastName: string;
	score: number;
	eta: string;
	status: 'pending' | 'dispatched';
	timeSeconds: number;
};

/** Caller and patient details collected during either assessment form. */
export type PatientDetails = { firstName: string; lastName: string; phone: string; location: string; gender: string; age: string };
export const EMPTY_PATIENT_DETAILS: PatientDetails = { firstName: '', lastName: '', phone: '', location: '', gender: '', age: '' };

export const PATIENTS_STORAGE_KEY = 'terra-patients';
export const INITIAL_PATIENTS: Patient[] = [
	{ id: 'patient-1', firstName: 'Sarah', lastName: 'Connor', score: 85, eta: '6-8', status: 'pending', timeSeconds: 45 },
	{ id: 'patient-2', firstName: 'Kyle', lastName: 'Reese', score: 42, eta: 'N/A', status: 'pending', timeSeconds: 112 },
	{ id: 'patient-3', firstName: 'Miles', lastName: 'Dyson', score: 92, eta: '3-5', status: 'dispatched', timeSeconds: 15 },
];
