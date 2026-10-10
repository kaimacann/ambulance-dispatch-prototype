/** One simulated patient assessment as stored in the dispatch queue. */
/** Minimal local record used to show the emergency dispatch referral result. */
export type Patient = {
	id: string;
	firstName: string;
	lastName: string;
	score: number;
	eta: string;
	status: 'pending' | 'dispatched';
	timeSeconds: number;
};

export const PATIENTS_STORAGE_KEY = 'terra-patients';
export const INITIAL_PATIENTS: Patient[] = [
	{ id: 'patient-1', firstName: 'Sarah', lastName: 'Connor', score: 85, eta: '6-8', status: 'pending', timeSeconds: 45 },
	{ id: 'patient-2', firstName: 'Kyle', lastName: 'Reese', score: 42, eta: 'N/A', status: 'pending', timeSeconds: 112 },
	{ id: 'patient-3', firstName: 'Miles', lastName: 'Dyson', score: 92, eta: '3-5', status: 'dispatched', timeSeconds: 15 },
];
