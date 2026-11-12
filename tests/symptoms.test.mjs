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

/**
 * Confirms an empty assessment retains the baseline triage score.
 *
 */
function keepsTheBaselineScore() {
	assert.equal(symptomScore([]), 10);
}

/**
 * Confirms symptom identifiers add their configured catalog weight.
 *
 */
function addsSelectedSymptomWeights() {
	assert.equal(symptomScore(['chest_pain']), 65);
	assert.equal(symptomScore(['dizziness', 'headache']), 50);
}

/**
 * Confirms the displayed score never exceeds the maximum of 99.
 *
 */
function capsTheCombinedScore() {
	assert.equal(symptomScore(['chest_pain', 'unconscious']), 99);
}

/**
 * Confirms unknown symptom ids do not add weight to the assessment.
 *
 */
function ignoresUnknownSymptomIds() {
	assert.equal(symptomScore(['unknown']), 10);
}
test('keeps the baseline score', keepsTheBaselineScore);
test('adds selected symptom weights', addsSelectedSymptomWeights);
test('caps the combined score', capsTheCombinedScore);
test('ignores unknown symptom ids', ignoresUnknownSymptomIds);
