# GSAP N:1 Learning-Page Workflow Design

## Decision summary

Replace the repository's visible-page 1:1 rule with a minimal two-layer contract:

1. **Official source layer:** every canonical official technical page remains a separate `sourcePage` with its own stable ID, manifest items, source revision, blockers, and coverage status.
2. **Learning-page layer:** one visible local learning page may own one or more related source pages, but every owned source item must still map to concrete local evidence and pass the same beginner-learning and runtime/display quality bar demonstrated by `gsap.to()`.

The recommended implementation is **Approach A: extend the existing handoff and workflow schemas without adding a generated source database or generic page runtime**. A learning-page folder remains the code and route boundary. The master inventory remains the authoritative list of official source pages. The handoff is the authoritative N:1 ownership and coverage boundary.

This is the smallest change that honors the user's new N:1 decision while preserving exhaustive source coverage, independent review, explicit routing, and page-local implementation ownership.

## Current verified program facts

- The core/fundamentals catalog contains 159 raw official page rows.
- The plugin-side catalog contains 220 raw official page rows.
- Fifteen canonical pages overlap between those catalogs.
- The canonical union is 364 unique official technical source pages.
- There are zero collisions between different canonical pages in the normalized source slug, proposed local path, or proposed route fields.
- Two upstream non-page defects remain tracked: the unpublished standalone `Animation` documentation and the broken `CustomEasee` alias.
- The canonical normalized inventory path is `docs/handoffs/gsap/_program/master-page-inventory.md`.
- The previous one-route-per-source proposals in the catalogs are source-curation inputs, not binding visible-route decisions after this N:1 design is adopted.

The 364 denominator never becomes “number of visible learning pages.” It is the fixed official-source-page coverage denominator until a later verified source-catalog revision changes it.

## Goals

- Keep all 364 official technical pages individually identifiable, reviewable, and coverage-mapped.
- Permit closely related source pages to become one clearer visible learning page.
- Keep one accountable local owner for every source page and source item.
- Preserve official provenance even when local learner order differs from official navigation.
- Make every visible page at least as beginner-friendly and example-rich as the current `gsap.to()` page.
- Keep animation, utility, plugin, and static explanation runtimes appropriate to their actual page type.
- Make source changes and ownership moves invalidate stale release evidence deterministically.
- Prevent N:1 from becoming permission to create unreviewable mega-pages.

## Non-goals

- No runtime scraping of official GSAP pages.
- No build-time page generation from the official site.
- No generic learning-page template that forces every page into the `gsap.to()` layout.
- No generic GSAP runtime shared across unrelated examples.
- No decorative Tween or animation hook on non-animation concepts or utilities.
- No automated test files, test runner, or test-only dependencies.
- No route/catalog registration before the visible learning page receives an independent `PASS`.
- No deletion, folding, or deduplication of official source-page identities merely because their content overlaps.

## Approaches considered

### Approach A — Extend the current handoff with N:1 ownership (recommended)

Keep the master inventory as the source-page registry. Change each visible-page handoff from one `officialPage` to one `learningPage` plus `ownedSourcePages[]`, namespaced source items, ownership roles, revisions, and completeness calculations.

Advantages:

- Changes only the existing governing documents and future handoff shape.
- Preserves current page folders, lazy routing, sections, examples, and review roles.
- Official coverage stays explicit and auditable without adding runtime machinery.
- A 1:1 page is simply an N:1 page whose `ownedSourcePages[]` has one entry.
- Existing `gsap.to()` can migrate without changing its route or component structure.

Tradeoffs:

- Uniqueness and revision matching are reviewer/Integrator responsibilities rather than generated guarantees.
- Large handoffs require disciplined source-page grouping and clear IDs.
- Reassigning a source page requires coordinated updates to two handoffs and their release decisions.

### Approach B — Separate source-page manifests from learning-page composition manifests

Create one repository artifact for each of the 364 source pages, then create a second composition artifact for each visible learning page that references those manifests.

Advantages:

- Source manifests are reusable when ownership changes.
- Official changes can be updated without initially editing the learning-page handoff.
- Source-page and learning-page lifecycles are physically distinct.

Tradeoffs:

- Introduces at least 364 additional artifacts before page implementation.
- Requires a second synchronization contract between source manifests and page handoffs.
- Increases navigation, file ownership, and change-review overhead substantially.
- Solves a future reassignment problem at high immediate cost.

This becomes reasonable only if repeated ownership moves demonstrate that the handoff-first model is inadequate.

### Approach C — Generated normalized database and build-time validation

Represent inventory, manifests, mappings, and coverage in machine-readable data and generate page definitions or validation reports.

Advantages:

- Can enforce unique ownership, referential integrity, and completeness math automatically.
- Enables program dashboards and stale-revision detection at scale.

Tradeoffs:

- Adds schema tooling, generation steps, and failure modes before the N:1 grouping is proven.
- Risks conflating source inventory with runtime routing.
- Conflicts with the repository's preference for minimal, explicit code and its prohibition on adding a test environment.
- Encourages premature generic page/runtime abstractions.

Do not adopt during the workflow migration. A later read-only reporting tool may be considered if manual evidence becomes a measured bottleneck; it must not scrape official pages at runtime or register pages automatically.

## Recommended identity model

### `sourcePageId`

A `sourcePageId` identifies one canonical official technical page in the 364-page union.

Format:

```text
source:<canonical-key>
```

Examples:

```text
source:gsap-to
source:utils-clamp
source:scroll-trigger-static-refresh
```

Rules:

- The master inventory assigns the canonical key once.
- The ID survives title, category, local owner, route, and canonical-URL alias changes.
- Both raw catalogs point to the same ID for each of the 15 canonical overlaps.
- The ID never contains the learning-page ID or ownership role.
- An upstream alias is evidence on the canonical source record, not a second `sourcePageId`.
- Removed or superseded IDs are not reused.

### `sourceItemId`

A `sourceItemId` identifies one technical claim, signature, parameter, return value, property, method, default, special value, warning, edge case, dependency, or uniquely informative official example inside one source page.

Format:

```text
<sourcePageId>#<semantic-item-key>
```

Examples:

```text
source:gsap-to#signature
source:gsap-to#parameter.targets
source:gsap-to#special-property.repeat-refresh
source:utils-clamp#overload.reusable-function
```

Rules:

- Item keys are semantic and stable, not array indexes or copied heading text.
- The same concept on two canonical source pages receives two different item IDs because its source provenance differs.
- An item ID is never moved to a different source page and never reused after removal.
- Official examples that reveal behavior not captured elsewhere receive their own item IDs.
- Local sections and examples may cover multiple item IDs, but every mapping names each ID explicitly.

### `learningPageId`

A `learningPageId` identifies one visible local learning page, its folder, handoff, and eventual route registration. It is independent of the number of owned source pages.

The route slug is normally a readable derivative of the learning-page ID, but route changes do not change the ID. Existing `gsap-to` keeps `learningPageId: gsap-to` and `/fundamentals/gsap-to`.

## Primary, related, and reference semantics

Each learning page declares `ownedSourcePages[]`. Every entry has one ownership role:

- `primary`: the single source page that anchors the visible page's title, route intent, and central learner question.
- `related`: an additional source page merged into that visible page and fully owned there.

Both roles require complete manifests and 100% local coverage. “Related” is not reduced coverage.

A separate `referenceSourcePageIds[]` field records non-owned prerequisites, comparisons, and next-reading links. References may appear on any number of learning pages, do not include their full manifest in the referencing handoff, and never earn coverage credit.

Ownership invariants:

1. Every one of the 364 source pages has exactly one `ownerLearningPageId` in the master inventory.
2. Every learning page has exactly one `primary` source page.
3. A source page is `primary` or `related` in exactly one learning-page handoff.
4. A source page may be a non-owning reference from any number of other pages.
5. A local explanation duplicated for reinforcement does not transfer ownership or coverage.
6. The 15 raw-catalog overlaps keep both catalog references but one source ID and one learning-page owner.

## N:1 handoff contract

The handoff is stored by visible learning-page identity, not by source-page identity.

### Input contract

```text
objective
learningPage: id, title, category, slug, localPath, route
primarySourcePageId
ownedSourcePages[]: sourcePageId, ownershipRole: primary | related,
  officialTitle, canonicalUrl, reviewedAt, sourceRevision,
  mappedSourceRevision, officialCategory, catalogReferences[]
referenceSourcePageIds[]
mergeRationale: learnerQuestion, sharedPrerequisites, sharedMentalModel,
  sharedLifecycle, whyOneVisiblePage, rejectedSplits[]
sourceManifest[]: sourcePageId, sourceItemId, officialItem,
  sourceLocation, sourceStatus: verified | blocked-source
sourceBlockers[]: sourcePageId, blockerId, evidence, impact, requiredDecision
moduleSelection[]
learnerFlow[]: id, learnerQuestion, sourceItemIds[], plannedEvidence[]
coverageMap[]: sourcePageId, sourceItemId, localEvidence[],
  localStatus: planned | covered
sourceChangeLog[]: sourcePageId, fromRevision, toRevision,
  addedItemIds[], changedItemIds[], removedItemIds[], impact
relatedLearningPages[]
splitSignals[]
```

### Implementation contract

```text
exactFiles: create[], modify[]
exampleContracts[]: name, goal, question, representation, controls,
  runtimeSource, sourcePath, runtimeOwnership, displayOwnership,
  coveredSourceItemIds[], accessibility, motion
nonGoals[]
preserve[]
```

### Review and release contract

```text
reviewAssignments[]
findings[]: ID, status, evidence, impact, requiredAction
verificationEvidence[]
completeness: ownedSourcePageCount, completeSourcePageCount,
  sourceItemCount, coveredSourceItemCount,
  sourcePageCoverage, sourceItemCoverage
releasedSourceRevisions: sourcePageId -> sourceRevision
releaseDecision: PASS | BLOCK
```

Static content keeps `controls`, `runtimeSource`, `sourcePath`, and `motion` as `none` with reasons, as the current workflow requires.

## Completeness math

Let `Owned(L)` be the source pages owned by learning page `L`, and `Items(P)` be the active technical source items of source page `P`.

For one source page:

```text
sourceItemCoverage(P) = covered items in Items(P) / all items in Items(P)
```

`sourcePageReady(P)` is true before release only when:

- `P` has one owner learning page;
- every active item is `verified` and `covered`;
- `mappedSourceRevision === sourceRevision`;
- no applicable source blocker or review `BLOCK` is unresolved;

The owner learning page's release result is deliberately excluded from `sourcePageReady(P)` so the learning-page decision does not depend on itself.

For one learning page:

```text
learningSourceCoverage(L) = ready source pages in Owned(L) / all source pages in Owned(L)
learningItemCoverage(L) = covered items across Owned(L) / all items across Owned(L)
```

A learning page can pass only when both ratios are exactly 100%, every applicable specialist gate passes, and every source revision in the handoff's pre-recorded `releasedSourceRevisions` candidate matches. The reviewer confirms that map and records independent `PASS` in one decision; the map then becomes final release evidence and each ready source owned by the page becomes `sourcePageComplete(P)`. Rounded percentages and displayed counts are not release evidence.

For the program:

```text
programSourceCoverage = sourcePageComplete pages / 364
programItemCoverage = covered active source items / all active source items
```

The source-page ratio is the authoritative program progress measure. Item coverage is a diagnostic measure; many small items on one page must not hide a wholly uncovered source page.

The two upstream non-page defects are excluded from the 364 denominator and all item denominators. They still propagate a `BLOCK` to any learning page that relies on the missing `Animation` source or the broken alias without applying the approved ownership resolution.

## Source change tracking and release invalidation

Each master source-page record has an integer `sourceRevision`, beginning at 1.

- A review that finds no technical change updates `reviewedAt` but does not increment `sourceRevision`.
- Adding, changing, or removing a technical source item increments `sourceRevision` and records stable item IDs in `sourceChangeLog`.
- Removed item IDs remain in history and are never reused.
- A release-candidate learning handoff records `mappedSourceRevision` for every owned source page and pre-records the same values under `releasedSourceRevisions`; independent `PASS` finalizes that map as release evidence.
- Any revision mismatch changes the learning-page release decision to `BLOCK` until the affected manifest, coverage, learner flow, examples, and reviews are updated.
- A source-page ownership move updates the master inventory and both old and new learning-page handoffs. Both release decisions become `BLOCK` until coverage and Cross-page Consistency are rerun.
- A changed source fact reused on referencing pages adds those pages to the change-log impact list. Their relevant content review must be rerun even though source ownership stays elsewhere.
- Updating only a reviewed date never restores a stale release.

There is no runtime fetch or scrape. Source Curators perform source comparison before implementation, and the repository stores their evidence.

## Learning-page quality contract

`gsap.to()` is the clarity floor, not a universal visual template.

Every visible learning page must:

- define unfamiliar terms before they are used;
- state the learner's goal, what they will change, what they should observe, and why the result occurs;
- build from the simplest state to variants, relationships, real use cases, and cautions;
- show signatures, overloads, types, defaults, accepted/special values, lifecycle, cleanup, or environment boundaries whenever its owned source items require them;
- provide detailed executable examples when execution materially improves understanding;
- derive controls, actual runtime inputs, observation output, and displayed code from the same state and normalized config or descriptor;
- keep each example focused on one central question;
- use static code, diagrams, tables, or timelines when those teach more directly than interaction;
- record every example's covered source-item IDs in the handoff.

N:1 does not permit shallow coverage. Merging three source pages means the visible page must satisfy the complete beginner-learning contract for all three.

## Mega-page guardrails

There is no arbitrary numeric source-page cap because official API families vary greatly in size. Instead, every N:1 page must pass a dedicated **Scope Cohesion** decision before implementation and again during Cross-page Consistency review.

An N:1 merge is allowed only when all are true:

1. The owned sources share one official family/parent or an inseparable task/lifecycle.
2. They answer one central learner question through a progressive prerequisite order.
3. They share a mental model, setup, runtime object, or cleanup boundary that would otherwise be repeated.
4. The learner can navigate the page through a coherent local table of contents and source index.
5. Every source page and item still has unambiguous local evidence.
6. Combining them improves comprehension rather than merely reducing route count.

The page must split when any is true:

- It contains multiple independent learner questions with no prerequisite progression.
- Sources require unrelated registration, environment, target, or cleanup models.
- A major section can be learned and released independently and shares only a product/family name with the rest.
- Coverage evidence repeatedly points to broad page ranges instead of specific sections, references, examples, or warnings.
- One example is forced to answer several unrelated questions or a generic runtime begins switching between unrelated APIs.
- The local table of contents, keyboard flow, small-screen reading order, or lazy-page performance fails browser review.
- A learner must understand a later source before the page explains its prerequisite.

Every handoff records `rejectedSplits[]` and `splitSignals[]`. Content Architect or Cross-page Consistency can issue `BLOCK: OVERSIZED_PAGE`; only a revised grouping and rerun reviews can clear it.

## Folder and runtime architecture

One folder now represents one visible learning page:

```text
src/content/gsap/<learning-category>/<learning-slug>/
├── <PageName>.tsx
├── <PageName>.css
├── <learning-slug>.meta.ts
├── <learning-slug>.properties.ts   # only for a real property catalog
├── components/
├── sections/
└── examples/
```

- The page TSX still assembles the header and learner-flow sections only.
- Metadata lists the learning-page identity and every owned official source link/review date; it does not replace the handoff manifest.
- Sections follow learner questions, not one-to-one official headings.
- Page-local components stay local until a second learning page proves the same semantic contract.
- Animation examples use `use<ExampleName>Animation.ts`.
- Stateful non-animation utilities use `use<ExampleName>Runtime.ts`.
- Stateless calls use `<ExampleName>.example.ts`.
- Static explanations use no runtime source.
- Related source pages may share one example only when the example explicitly lists all covered item IDs and one coherent runtime actually demonstrates them.
- Several unrelated examples are never combined behind a generic switch-driven runtime.

## Cross-page consistency under N:1

Cross-page Consistency becomes mandatory for every N:1 page and every ownership change. It verifies:

- unique source-page ownership against the master inventory;
- one primary source per learning page;
- owned-related sources are not also claimed elsewhere;
- references point to the actual owner learning page;
- terminology, prerequisite order, source boundaries, and official links agree across connected pages;
- repeated local explanations identify which page owns complete coverage;
- source-revision changes have been propagated to affected owners and references;
- splitting or merging does not orphan source items, redirects, navigation entries, or review evidence;
- large API families remain a coherent learning flow rather than a catalog dump.

A reviewer cannot waive an ownership conflict as advisory. Duplicate ownership, missing ownership, stale source revision, or ambiguous item evidence is `BLOCK`.

## Existing `gsap.to()` migration

The current folder and route remain:

```text
src/content/gsap/methods/gsap-to/
/fundamentals/gsap-to
```

Migration steps and rules:

1. Create its learning-page handoff with `learningPageId: gsap-to`.
2. Assign the canonical `gsap.to()` page as the initial primary owned source.
3. Give every official section, special property, warning, and uniquely informative official example stable namespaced item IDs.
4. Audit current plugin, Timeline, easing, keyframe, callback, and stagger links. They remain non-owning references unless Source Curator explicitly assigns their entire canonical source pages to this learning page and adds every item from those pages.
5. Do not infer ownership from an outbound official link, a related explanation, or an example that happens to use another API.
6. Backfill `sourceRevision`, item-level coverage, example `coveredSourceItemIds`, findings, and release evidence.
7. Replace or reinterpret the count-only `PageCoverageSection`: `11/11`, `34/34`, and the word `완료` cannot serve as release evidence without verified item statuses and exact mappings.
8. Preserve its detailed examples and runtime/display synchronization as the quality floor.
9. Run Official Coverage, Learning Transformation, Runtime/Display Sync, Pedagogy, Structure/Comment, Accessibility/Motion, Build/Integration, and Independent Release review.
10. Treat `gsap.to()` as a released cross-page baseline only after this remediation receives `PASS`.

The migration does not force `gsap.to()` to become N:1. A single-source learning page is valid. Additional source ownership is accepted only when the N:1 cohesion and completeness contracts pass.

## Exact governing-document changes

### 1. `AGENTS.md`

Make three minimal rule changes:

- Add an N:1 invariant near the project-reference section: official source pages/items are individually cataloged and coverage-mapped, while one visible learning page may own multiple related source pages through a frozen handoff.
- Require implementers to read the learning-page handoff and master inventory mapping before coding; they may not change source ownership or shrink the manifest.
- Expand the educational-comment scope from example components and `use*Animation.ts` to every example execution source, including `use*Runtime.ts` and `*.example.ts`; retain the one-line Korean comment rule appropriate to the actual GSAP role.

Do not add implementation-specific inventory, route, or component instructions to `AGENTS.md`.

### 2. `docs/project-structure.md`

- Rename “공식 문서 1:1 원칙” to an official-source/N:1 learning-page rule.
- Change the folder comment from “official page boundary” to “visible learning-page boundary.”
- State that one folder has one route and one handoff, but may own multiple source pages.
- Require page metadata/header to enumerate owned official source pages and their review dates.
- State that sections follow learner units and may combine source items from several source pages.
- Replace the final count check with per-source-page and per-item completeness checks.
- Preserve current page/section/component/example/runtime boundaries and the two-page shared-UI threshold.

### 3. `docs/workflows/source-coverage.md`

Replace the singular official-page schema with the identity, ownership, manifest, revision, and completeness contracts defined in this design:

- `sourcePageId`, `sourceItemId`, and `learningPageId` definitions;
- `primary`, `related`, and non-owning reference semantics;
- unique ownership invariant;
- namespaced manifest and coverage-map fields;
- source revision and change log;
- per-source, per-learning-page, and 364-source program math;
- blocker propagation and non-page blocker denominator rules;
- prohibition on count-only or cross-page borrowed coverage.

This file becomes the authoritative schema and math source. Other documents link to it rather than restating all formulas.

### 4. `docs/workflows/context-handoff.md`

Replace `officialPage` and singular `localPage` assumptions with the complete N:1 handoff contract in this design:

- `learningPage`, `primarySourcePageId`, `ownedSourcePages[]`, and `referenceSourcePageIds[]`;
- `mergeRationale`, `rejectedSplits`, and `splitSignals`;
- namespaced manifest, coverage, revisions, and change log;
- example `coveredSourceItemIds`;
- completeness and released revision evidence.

Keep the same staged ownership: Source Curator freezes sources, Content Architect freezes composition, reviewers write findings, Integrator fixes, and Independent Release Reviewer decides.

### 5. `docs/workflows/quality-gates.md`

- Add **Scope Cohesion** to the pre-implementation Content Architect gate for every N:1 page.
- Make Official Coverage report per-source-page item coverage before the aggregate learning-page result.
- Make Cross-page Consistency mandatory for N:1 pages, ownership moves, merges, and splits.
- Add `OVERSIZED_PAGE`, duplicate/missing ownership, ambiguous evidence, and stale source revision as explicit `BLOCK` reasons.
- Require reviewers to compare ownership with `master-page-inventory.md`.
- Preserve independent roles and the Integrator-only fix loop.
- State that a failed owned source page blocks the entire visible learning page; unrelated passing learning pages remain releasable.

### 6. `docs/workflows/page-format.md`

- Change the folder contract from one official page to one visible learning page with one-or-more owned source pages.
- Require an owned-source index and local evidence for every source page.
- State that module selection is the union of actual source-item needs, not a template chosen from the primary source alone.
- Add the Scope Cohesion and split guardrails.
- Strengthen the `gsap.to()` clarity floor while explicitly forbidding layout replication across unrelated formats.
- Preserve the execution-source table and forbid decorative animation or generic runtimes.

### 7. `docs/workflows/README.md`

Change the workflow order to:

1. Read the master inventory and official sources.
2. Verify or revise source-page manifests and revisions.
3. Assign unique learning-page ownership and primary/related roles.
4. Pass Scope Cohesion and freeze the N:1 handoff.
5. Design learner flow and item-level coverage.
6. Implement with the correct execution-source type.
7. Run independent per-source coverage, learning, runtime, accessibility, structure, and integration reviews.
8. Run mandatory N:1 Cross-page Consistency.
9. Integrator fixes and reruns affected gates.
10. Independent Release Reviewer approves.
11. Integrator registers the route/catalog entry only after `PASS`.

Keep the no-automated-tests rule.

### 8. `.agents/skills/creating-gsap-learning-pages/SKILL.md`

Synchronize the skill with all above contracts:

- change the top-level model from official page 1:1 to source-exhaustive/N:1 visible learning pages;
- teach source-page/item IDs, ownership roles, revisions, completeness, and N:1 handoffs;
- require Scope Cohesion before implementation;
- state that every owned source receives the complete beginner transformation, not a translated summary;
- keep page-type selection and execution-source ownership;
- add duplicate ownership, stale revision, missing item, ambiguous evidence, decorative animation, generic runtime, and oversized page to immediate `BLOCK` conditions;
- require per-source evidence, Cross-page Consistency, build/browser evidence, and independent release;
- prohibit route/catalog registration before `PASS`.

## Files affected

Only these eight governing files require the workflow migration:

1. `AGENTS.md`
2. `docs/project-structure.md`
3. `docs/workflows/README.md`
4. `docs/workflows/source-coverage.md`
5. `docs/workflows/context-handoff.md`
6. `docs/workflows/quality-gates.md`
7. `docs/workflows/page-format.md`
8. `.agents/skills/creating-gsap-learning-pages/SKILL.md`

`docs/workflows/learning-design.md` already expresses the required beginner transformation and does not need a semantic change for N:1. It remains authoritative and is referenced more strongly from `page-format.md`, `quality-gates.md`, and the skill.

The master inventory and `gsap.to()` handoff/content require later migration work, but they are artifacts governed by these rules rather than additional workflow-rule files in this design task.

## Release process

1. Gate 0 freezes the 364-source master inventory, canonical overlap ownership, source IDs, upstream blocker handling, and initial learning-page ownership map.
2. A Source Curator prepares all owned source manifests and revisions for one learning page.
3. A Content Architect approves the N:1 grouping, primary/related roles, learner flow, split analysis, modules, and planned evidence.
4. A page Implementer changes only declared files in that learning-page folder.
5. Independent reviewers issue evidence-backed findings without editing implementation.
6. The Integrator fixes findings and requests reruns from every affected gate.
7. Cross-page Consistency confirms unique ownership, references, revisions, and grouping coherence.
8. Independent Release Reviewer confirms 100% source-page coverage, 100% item coverage, Learning Transformation, applicable runtime/accessibility/build evidence, and zero unresolved blockers.
9. Only after `releaseDecision: PASS` may the Integrator add the page to the category catalog and application route registry.
10. Source changes or ownership moves invalidate the affected release and repeat the relevant sequence.

N:1 releases are all-or-nothing per visible page. If one related owned source is incomplete, the whole learning page is `BLOCK`. Other learning pages with independent `PASS` decisions remain releasable.

## Verification baseline

No automation tests are added. Each changed workflow document is reviewed for schema consistency, and every implemented learning page supplies:

```bash
npm run build
git diff --check
```

When a change creates or modifies a shared `src/components` UI, it also supplies that component's Storybook story and:

```bash
STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook
```

For `runtimeSource` or page-only changes, do not run Storybook; record `none: shared component unchanged`.

Browser verification covers:

- canonical route load, reload, internal navigation, back/forward, focus transfer, active TOC state, and lazy loading;
- every owned official source link, reviewed revision, and local source index;
- keyboard control, labels, focus visibility, status announcements, and meaningful reduced-motion behavior;
- 320px minimum width and representative desktop layout without unintended page overflow;
- controls, runtime input, output/readout, displayed code, and `sourcePath` synchronization;
- plugin registration, environment, cleanup, SSR, browser, or dependency boundaries where applicable;
- N:1 local TOC usability and source provenance on long pages;
- no console errors, React warnings, GSAP warnings, or missing assets.

Manual verification covers:

- every owned `sourcePageId` appears exactly once in the program ownership map;
- every active `sourceItemId` appears exactly once in the owner handoff's coverage map;
- all source and mapped revisions match;
- every page-level ratio is exactly 100%;
- references receive no coverage credit;
- every merged page passes Scope Cohesion and Cross-page Consistency;
- current `gsap.to()` does not become a released baseline until its N:1-compatible remediation passes.

## Blockers and required follow-up

1. The current master inventory was normalized from one-route-per-source proposals; it must add stable source IDs and an explicit `ownerLearningPageId` mapping before N:1 implementation begins.
2. The initial visible learning-page grouping for all 364 sources is not yet approved. Curriculum agents may propose groups, but Source Curator and Content Architect must freeze ownership and Scope Cohesion page by page.
3. The two upstream defects remain active evidence constraints: no invented `Animation` page, and no `CustomEasee` alias page.
4. `gsap.to()` lacks an N:1-compatible handoff, revision record, item-level evidence, and independent release decision.
5. The current count-driven coverage UI can overstate completion and cannot be reused as release evidence.
6. The navigation capacity of the eventual visible-page catalog must be browser-verified after grouping; N:1 reduces route count but does not justify speculative search or navigation abstractions.

## Final recommendation

Adopt Approach A. Change only the eight governing documents, keep the 364 canonical source pages intact in the master inventory, and make each visible learning-page handoff the explicit N:1 ownership and coverage contract. Use one primary and zero-or-more fully owned related source pages, keep ordinary cross-links as non-owning references, require exact item-level completeness and revision matching, and add Scope Cohesion as the guard against mega-pages. Migrate `gsap.to()` into this model before treating it as the released quality baseline.
