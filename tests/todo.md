# Complete repository test plan: ambulance-dispatch-prototype

This checklist inventories repository-owned functions, documents, and configuration as of the current working tree. It is a plan, not a claim that every item is already tested. Update it when an owned source or document changes.

## Scope and method

- Function entries identify the source path and line. Exercise the stated normal, edge, and failure scenarios; link or add assertions as each entry is completed.
- Document entries require rendering, link checking, and content review. Execute documented commands against the current repository.
- Generated output, dependencies, vendored trees, bundled course viewers, and Portfolio pinned `projects/` snapshots are covered through build, package, and integration checks rather than individual upstream functions. Keep those boundaries under review when their inputs change.
- Put produced reports, screenshots, traces, and coverage under `tests/results/`.

## Function and executable source inventory

### `config/.prettierrc.mjs`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `config/astro.config.mjs`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `config/eslint.config.mjs`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `config/postcss.config.mjs`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `config/prettier.config.cjs`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `config/scripts/quality.mjs`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `config/tailwind.config.mjs`

- [ ] `toPaletteEntry` (line 30): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.

### `scripts/quality-runner.mjs`

- [ ] `callback@18` (line 18): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `callback@45` (line 45): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `isBuildOrTest` (line 50): Run on clean input; verify deterministic output and a useful failure on invalid input. No direct test file is linked yet.
- [ ] `callback@53` (line 53): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `callback@55` (line 55): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.

### `src/components/GpDemo.tsx`

- [ ] `GpDemo` (line 34): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `mountDemo` (line 41): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `callback@42` (line 42): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `incrementSeconds` (line 49): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `advanceReferralTimer` (line 53): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `clearReferralTimer` (line 57): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `startReferralTimer` (line 66): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `handleFormChange` (line 78): Render each state; check interactions, accessibility, loading, and error behavior. No direct test file is linked yet.
- [ ] `mergeChangedField` (line 83): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `handleFormFieldChange` (line 91): Render each state; check interactions, accessibility, loading, and error behavior. No direct test file is linked yet.
- [ ] `handleSymptomSelection` (line 97): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `renderSymptomButton` (line 109): Render each state; check interactions, accessibility, loading, and error behavior. No direct test file is linked yet.
- [ ] `transferPatient` (line 125): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `callback@127` (line 127): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `renderPatientField` (line 144): Render each state; check interactions, accessibility, loading, and error behavior. No direct test file is linked yet.

### `src/components/TriageWorkflow.tsx`

- [ ] `readPatients` (line 43): Test found, missing, unauthorized, and upstream-failure results. No direct test file is linked yet.
- [ ] `callback@45` (line 45): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `writePatients` (line 57): Test successful mutation, duplicate/conflict, validation, and failed-write behavior. No direct test file is linked yet.
- [ ] `timeLabel` (line 72): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `priority` (line 83): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `TriageWorkflow` (line 94): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `mountWorkflow` (line 105): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `advanceClock` (line 113): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `updateClock` (line 117): Test successful mutation, duplicate/conflict, validation, and failed-write behavior. No direct test file is linked yet.
- [ ] `stopClock` (line 121): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `startNurseClock` (line 130): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `isSelectedPatient` (line 139): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `selectPatient` (line 145): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `renderPatientToggle` (line 153): Render each state; check interactions, accessibility, loading, and error behavior. No direct test file is linked yet.
- [ ] `markDispatched` (line 171): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `updateMatchingPatient` (line 176): Test successful mutation, duplicate/conflict, validation, and failed-write behavior. No direct test file is linked yet.
- [ ] `renderProgressBar` (line 196): Render each state; check interactions, accessibility, loading, and error behavior. No direct test file is linked yet.
- [ ] `renderProgressCard` (line 213): Render each state; check interactions, accessibility, loading, and error behavior. No direct test file is linked yet.
- [ ] `handleIntakeFieldChange` (line 224): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `mergeIntakeField` (line 231): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `renderIntakeField` (line 247): Render each state; check interactions, accessibility, loading, and error behavior. No direct test file is linked yet.
- [ ] `toggleIntakeSymptom` (line 258): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `renderIntakeSymptom` (line 270): Render each state; check interactions, accessibility, loading, and error behavior. No direct test file is linked yet.
- [ ] `showAssessmentResult` (line 278): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `returnToIntake` (line 282): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `addPatientToQueue` (line 286): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `ScoreGauge` (line 452): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `DispatchDetails` (line 475): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `dispatchSelectedPatient` (line 477): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.

### `src/components/ui/ActionLink.astro`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `src/components/ui/controls.tsx`

- [ ] `renderButton` (line 165): Render each state; check interactions, accessibility, loading, and error behavior. No direct test file is linked yet.
- [ ] `renderToggleButton` (line 196): Render each state; check interactions, accessibility, loading, and error behavior. No direct test file is linked yet.
- [ ] `renderInput` (line 233): Render each state; check interactions, accessibility, loading, and error behavior. No direct test file is linked yet.
- [ ] `renderSelect` (line 252): Render each state; check interactions, accessibility, loading, and error behavior. No direct test file is linked yet.
- [ ] `renderTextarea` (line 271): Render each state; check interactions, accessibility, loading, and error behavior. No direct test file is linked yet.
- [ ] `classes` (line 306): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `Surface` (line 320): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `actionClass` (line 340): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `surfaceClass` (line 352): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `controlClass` (line 364): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `selectedToggleClass` (line 376): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.

### `src/layouts/BaseLayout.astro`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `src/lib/patients.ts`

- [ ] `createPatientRecord` (line 19): Test successful mutation, duplicate/conflict, validation, and failed-write behavior. Candidate coverage: [`tests/patients.test.mjs`](../tests/patients.test.mjs).
- [ ] `isPatientRecord` (line 29): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/patients.test.mjs`](../tests/patients.test.mjs).
- [ ] `parsePatientQueue` (line 59): Test valid, malformed, empty, and boundary input; assert exact output or error. Candidate coverage: [`tests/patients.test.mjs`](../tests/patients.test.mjs).
- [ ] `clearLegacyPatientQueue` (line 76): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/patients.test.mjs`](../tests/patients.test.mjs).
- [ ] `persistPatient` (line 92): Test successful mutation, duplicate/conflict, validation, and failed-write behavior. Candidate coverage: [`tests/patients.test.mjs`](../tests/patients.test.mjs).

### `src/lib/symptoms.ts`

- [ ] `symptomWeight` (line 24): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/symptoms.test.mjs`](../tests/symptoms.test.mjs).
- [ ] `hasSelectedId` (line 29): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/symptoms.test.mjs`](../tests/symptoms.test.mjs).
- [ ] `addSymptomWeight` (line 43): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/symptoms.test.mjs`](../tests/symptoms.test.mjs).
- [ ] `symptomScore` (line 54): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/symptoms.test.mjs`](../tests/symptoms.test.mjs).

### `src/pages/ambulance.astro`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `src/pages/index.astro`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `src/pages/nurse.astro`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `src/pages/wireframes.astro`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `tests/patients.test.mjs`

- [ ] `queueRecordsRetainAssessmentDetails` (line 21): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `queueRecordsUsePlaceholderNamesForEmptyIntake` (line 34): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `patientQueueParsingValidatesStoredRecords` (line 43): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `legacyQueueCleanupRemovesPersistentRecords` (line 51): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `removeItem` (line 58): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `removeItem` (line 68): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `callback@75` (line 75): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `patientTransfersReportPersistenceOutcome` (line 87): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `getItem` (line 93): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `setItem` (line 100): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `getItem` (line 114): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `setItem` (line 118): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `getItem` (line 130): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `setItem` (line 134): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `callback@143` (line 143): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.

### `tests/symptoms.test.mjs`

- [ ] `keepsTheBaselineScore` (line 22): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `addsSelectedSymptomWeights` (line 30): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `capsTheCombinedScore` (line 39): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `ignoresUnknownSymptomIds` (line 47): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.

## Document inventory

- [ ] [`.changeset/repository-structure.md`](../.changeset/repository-structure.md): Render, check links and examples, then review each factual claim and instruction against the current implementation.
- [ ] [`CHANGELOG.md`](../CHANGELOG.md): Render, check links and examples, then review each factual claim and instruction against the current implementation.
- [ ] [`README.md`](../README.md): Render, check links and examples, then review each factual claim and instruction against the current implementation.
- [ ] [`docs/README.md`](../docs/README.md): Render, check links and examples, then review each factual claim and instruction against the current implementation.

## Configuration and other owned files

- [ ] `.changeset/config.json`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `.github/workflows/repository-check.yml`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `.gitignore`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `LICENSE`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `config/.prettierignore`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `config/config/pnpm-lock.yaml`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `config/husky/pre-commit`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `config/knip.json`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `config/netlify.toml`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `config/package.json`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `config/pnpm-lock.yaml`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `config/quality.json`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `config/tsconfig.json`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `package.json`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `pnpm-workspace.yaml`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `src/styles/global.css`: validate syntax or schema, exercise its owning tool, and check references to this file.

Inventory: 89 function-like declarations, 4 documents, 16 other owned files, and 21 executable source files.
