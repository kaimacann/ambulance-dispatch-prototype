/**
 * tests/symptoms.test.mjs
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import assert from 'node:assert/strict';
import test from 'node:test';
import { symptomScore } from '../src/lib/symptoms.ts';

/*//////////////////////////////////////////////////
HELPERS
//////////////////////////////////////////////////*/

// Confirms an empty assessment retains the baseline triage score.
test('keeps the baseline score', () => {
	assert.equal(symptomScore([]), 10);
});
// Confirms symptom identifiers add their configured catalog weight.
test('adds selected symptom weights', () => {
	assert.equal(symptomScore(['chest_pain']), 65);
	assert.equal(symptomScore(['dizziness', 'headache']), 50);
});
// Confirms the displayed score never exceeds the maximum of 99.
test('caps the combined score', () => {
	assert.equal(symptomScore(['chest_pain', 'unconscious']), 99);
});
// Confirms unknown symptom ids do not add weight to the assessment.
test('ignores unknown symptom ids', () => {
	assert.equal(symptomScore(['unknown']), 10);
});
