/**
 * tests/patients.test.mjs
 *
 * Patient-record tests for the details that assessment flows send to dispatch.
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import assert from 'node:assert/strict';
import test from 'node:test';
import { clearLegacyPatientQueue, createPatientRecord, EMPTY_PATIENT_DETAILS, INITIAL_PATIENTS, parsePatientQueue, persistPatient } from '../src/lib/patients.ts';

/*//////////////////////////////////////////////////
TESTS
//////////////////////////////////////////////////*/

/** Confirms a dispatch record keeps every value entered in an assessment. */
function queueRecordsRetainAssessmentDetails() {
	const details = { ...EMPTY_PATIENT_DETAILS, firstName: 'Ada', lastName: 'Lovelace', phone: '555-0100', location: 'North clinic', gender: 'Other', age: '36' };
	const patient = createPatientRecord('patient-4', details, 65, 9);

	assert.equal(patient.firstName, 'Ada');
	assert.equal(patient.lastName, 'Lovelace');
	assert.deepEqual(patient.details, details);
	assert.notEqual(patient.details, details);
	assert.equal(patient.score, 65);
	assert.equal(patient.timeSeconds, 9);
}

/** Confirms an unnamed referral receives the same display placeholders as before. */
function queueRecordsUsePlaceholderNamesForEmptyIntake() {
	const patient = createPatientRecord('patient-5', EMPTY_PATIENT_DETAILS, 10, 0);

	assert.equal(patient.firstName, 'Unknown');
	assert.equal(patient.lastName, 'Patient');
	assert.deepEqual(patient.details, EMPTY_PATIENT_DETAILS);
}

/** Confirms queue reads accept empty and valid saved data but reject malformed records. */
function patientQueueParsingValidatesStoredRecords() {
	assert.equal(parsePatientQueue(null), INITIAL_PATIENTS);
	assert.deepEqual(parsePatientQueue(JSON.stringify(INITIAL_PATIENTS)), INITIAL_PATIENTS);
	assert.equal(parsePatientQueue('{invalid'), null);
	assert.equal(parsePatientQueue(JSON.stringify([{ id: 'broken' }])), null);
}

/** Confirms records saved under the old persistent-storage behavior are removed. */
function legacyQueueCleanupRemovesPersistentRecords() {
	let removed;
	assert.equal(
		clearLegacyPatientQueue({
			/** Records the storage key requested by legacy-queue cleanup.
			 * @param key - Legacy queue key passed to the storage adapter.
			 */
			removeItem(key) {
				removed = key;
			},
		}),
		true,
	);
	assert.equal(removed, 'terra-patients');
	assert.equal(
		clearLegacyPatientQueue({
			/** Simulates a storage adapter that rejects legacy-queue cleanup. */
			removeItem() {
				throw new Error('storage disabled');
			},
		}),
		false,
	);
	assert.equal(
		clearLegacyPatientQueue(() => {
			throw new Error('storage getter disabled');
		}),
		false,
	);
}

/**
 * Confirms transfers append to a valid queue and report storage failures without claiming success.
 *
 * @returns Completes after checking the successful append and both rejected writes.
 */
function patientTransfersReportPersistenceOutcome() {
	let saved = JSON.stringify(INITIAL_PATIENTS);
	const storage = {
		/** Returns the queue serialized by the successful write stub.
		 * @returns Current serialized queue fixture.
		 */
		getItem() {
			return saved;
		},
		/** Replaces the saved queue fixture with the value written by the helper.
		 * @param _key - Storage key accepted by the API and ignored by this fixture.
		 * @param value - Serialized queue provided to the storage adapter.
		 */
		setItem(_key, value) {
			saved = value;
		},
	};
	const patient = createPatientRecord('patient-4', EMPTY_PATIENT_DETAILS, 65, 9);

	assert.equal(persistPatient(storage, patient), true);
	assert.equal(parsePatientQueue(saved)?.at(-1)?.id, patient.id);
	assert.equal(
		persistPatient(
			{
				/** Returns malformed persisted data for the failure-path check.
				 * @returns Invalid serialized queue text.
				 */
				getItem() {
					return '{broken';
				},
				/** No write should occur after malformed data is rejected. */
				setItem() {},
			},
			patient,
		),
		false,
	);
	assert.equal(
		persistPatient(
			{
				/** Reports an empty queue to exercise a rejected storage write.
				 * @returns No saved queue.
				 */
				getItem() {
					return null;
				},
				/** Simulates session storage rejecting the queue write. */
				setItem() {
					throw new Error('storage disabled');
				},
			},
			patient,
		),
		false,
	);
	assert.equal(
		persistPatient(() => {
			throw new Error('storage getter disabled');
		}, patient),
		false,
	);
}

test('queue records retain the caller and patient details entered during assessment', queueRecordsRetainAssessmentDetails);
test('queue records use the existing placeholder names when intake names are empty', queueRecordsUsePlaceholderNamesForEmptyIntake);
test('patient queue parsing validates persisted records', patientQueueParsingValidatesStoredRecords);
test('legacy patient queue cleanup removes persistent records', legacyQueueCleanupRemovesPersistentRecords);
test('patient transfers report whether persistence succeeded', patientTransfersReportPersistenceOutcome);
