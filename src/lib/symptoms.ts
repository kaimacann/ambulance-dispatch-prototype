export const SYMPTOMS = [
	{ id: 'chest_pain', gpLabel: 'Chest Pain', nurseLabel: 'Chest pain', weight: 55 },
	{ id: 'breathing', gpLabel: 'Difficulty Breathing', nurseLabel: 'Difficulty breathing', weight: 45 },
	{ id: 'unconscious', gpLabel: 'Unconscious', nurseLabel: 'Unconscious', weight: 80 },
	{ id: 'dizziness', gpLabel: 'Dizziness', nurseLabel: 'Dizziness', weight: 25 },
	{ id: 'headache', gpLabel: 'Headache', nurseLabel: 'Headache', weight: 15 },
	{ id: 'nausea', gpLabel: 'Nausea', nurseLabel: 'Nausea', weight: 10 },
	{ id: 'fever', gpLabel: 'High Fever', nurseLabel: 'High fever', weight: 20 },
	{ id: 'bleeding', gpLabel: 'Severe Bleeding', nurseLabel: 'Severe bleeding', weight: 50 },
];

/** Returns the capped triage score for selected symptom IDs. */
export function symptomScore(ids: string[]): number {
	return Math.min(99, ids.reduce((total, id) => total + (SYMPTOMS.find(symptom => symptom.id === id)?.weight ?? 0), 10));
}
