/**
 * src/lib/symptoms.ts
 */

/** Symptom labels and score weights shared by GP intake and nurse triage. */
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

/**
 * Returns the configured score weight for one selected symptom id.
 *
 * @param id Symptom identifier from a triage assessment.
 *
 * @return Configured weight, or zero when the identifier is not in the catalog.
 */
function symptomWeight(id: string): number {
	/** Matches a catalog record to the selected symptom id.
	 * @param s - Symptom definition being checked.
	 * @returns Whether the record has the requested identifier.
	 */
	function hasSelectedId(s: (typeof SYMPTOMS)[number]): boolean {
		return s.id === id;
	}
	return SYMPTOMS.find(hasSelectedId)?.weight ?? 0;
}

/**
 * Adds one symptom's configured weight to an accumulated triage score.
 *
 * @param s Weight accumulated from prior selected symptoms.
 * @param i Symptom identifier whose configured weight is added.
 *
 * @return Updated accumulated weight.
 */
function addSymptomWeight(s: number, i: string): number {
	return s + symptomWeight(i);
}

/**
 * Calculates the capped triage score for the selected symptom identifiers.
 *
 * @param ids - Identifiers of symptoms selected during the assessment.
 *
 * @return The combined symptom weight plus baseline, capped at 99.
 */
export function symptomScore(ids: string[]): number {
	return Math.min(99, ids.reduce(addSymptomWeight, 10));
}
