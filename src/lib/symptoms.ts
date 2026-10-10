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

/** Calculates the capped triage score for the selected symptom identifiers.
 * @param ids - Identifiers of symptoms selected during the assessment.
 * @returns The combined symptom weight plus baseline, capped at 99.
 */
export function symptomScore(ids: string[]): number {
	return Math.min(99, ids.reduce((scoreTotal, id) => scoreTotal + (SYMPTOMS.find(symptom => symptom.id === id)?.weight ?? 0), 10));
}
