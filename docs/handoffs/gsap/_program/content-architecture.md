# GSAP Official Docs Expansion — Content Architecture Report

## Executive recommendation

Adopt an **explicit, category-partitioned catalog with learning-page-local implementations and page-level handoffs**.

Keep each visible learning page as one folder under `src/content/gsap/<category>/<slug>/`, with one or more fully owned official source pages recorded in its handoff. Give each learning page an explicit lazy route definition, but register definitions through a small catalog per learning category and a single top-level catalog adapter consumed by `src/app/routes.ts`. Do not introduce automatic file discovery, a universal page template, or a generic GSAP runtime. Page agents own only their page folder and page handoff; a Wave Integrator alone owns shared catalogs, routes, and promoted shared UI.

This approach scales the current explicit routing without hiding behavior, reduces merge conflicts compared with one growing `routes.ts`, preserves lazy page loading, and leaves page format flexible enough for callable, class, plugin, utility, ease, and integration pages.

## Scope and evidence inspected

The recommendation is based on the complete project instructions and workflow set, the complete shared `src/components` tree, `package.json`, `src/app/routes.ts`, the app shell/navigation, the `gsap.to()` page metadata and property catalog, all `gsap.to()` section components, representative static and interactive examples, the existing design/implementation plans, and recent Git history through `6ee6153`.

Recent history matters here:

- `e586f9e` established the large `gsap.to()` page, page-local sections/examples, shared `InteractiveExample`, and current route registration.
- `f1f7796` and `e8ac131` subsequently strengthened the workflow around page formats, source coverage, handoffs, runtime ownership, and independent review.
- Therefore, `gsap.to()` demonstrates useful code boundaries but is not itself proof that the newer source-manifest and review contracts have been satisfied.

## Non-negotiable invariants

1. Every official technical source has exactly one owning learning page, while one cohesive learning page may own several related sources through one folder and canonical local route.
2. Source truth and local implementation status remain separate: `sourceStatus` is never inferred from a build or runtime demo, and `localStatus` is never inferred from a count alone.
3. Page composition is selected from the workflow's page modules. `gsap.to()`'s property catalog and animation-hook layout are not copied into unrelated page types.
4. A UI moves to `src/components` only after two real learning pages require the same contract. Similar appearance alone is insufficient.
5. Every page has a reproducible handoff and its own release decision. A blocked page does not block unrelated passing pages from the same wave.
6. No automated test runner or test files are added. Release evidence is TypeScript/Vite build, applicable browser behavior, accessibility/motion checks, and independent content review. Creating or modifying a shared `src/components` UI additionally requires its Storybook story and `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook`; `runtimeSource` or page-only work records `none: shared component unchanged` instead.
7. Official inventory facts come only from Source Curator catalogs. Wave assignments remain curator-filled slots rather than inferred page lists.

### Finalized catalog inputs

- [Official core/fundamentals source catalog](./official-core-source-catalog.md): **159 raw catalog rows**.
- [Official plugin documentation source catalog](./official-plugin-source-catalog.md): **220 raw catalog rows**.
- The catalogs overlap on 15 canonical sources, so their verified union is **364** unique technical sources.

## Current-state findings that affect scale

### What is already sound

- `src/content/gsap/<category>/<slug>/` is the visible learning-page boundary; `ownedSourcePages[]` preserves each official source identity inside it.
- `GsapToPage.tsx` only assembles the header and section components.
- Section, page-local component, example UI, and example runtime ownership are visibly separated.
- Representative examples derive displayed code from the same state/config used by GSAP rather than maintaining a second handwritten behavior model.
- Lazy imports in `routes.ts` keep page bundles independent.
- Navigation already groups lessons and preserves browser link behavior, history, focus transfer, canonical fallback, and small-screen layout.
- Shared UI includes Storybook stories, matching the repository's required shared-component package shape.

### What must not be scaled unchanged

- `routes.ts` is a single handwritten registry. Many page agents editing it in parallel would create predictable merge conflicts.
- Route identity is currently derived from `track + slug`. A full inventory may reveal category/slug collisions or a need for nested paths. The router should consume an explicit canonical `route` from the frozen handoff rather than inventing paths from segments.
- The brand link hard-codes `/fundamentals/gsap-to`; the app's default route should come from the registered catalog.
- `gsap-to.meta.ts` records section counts and a display-oriented section map, but not the new workflow's complete source-item IDs and coverage evidence.
- `PageCoverageSection` prints `완료` based on mapped rows and expected counts. It does not distinguish `verified`, `blocked-source`, `planned`, and `covered`; it must not become a generic coverage component in that form.
- `InteractiveExample` requires controls, code, property details, replay, and a string `sourcePath`. Those requirements do not fit static concept, pure utility, installation, or `runtimeSource: none` pages. It should remain an optional interactive module, not the page shell.
- `SectionHeading` is currently page-local, which correctly reflects the “two pages before sharing” rule. It should be promoted only when the second page proves the same API.
- No canonical page-handoff location exists in the repository yet.

## Architecture approaches

### Approach A — Keep all registrations in `src/app/routes.ts`

Each new page adds a lazy import and lesson entry directly to the existing file.

Advantages:

- Smallest initial diff and easiest to understand.
- Preserves the current runtime with almost no new concepts.
- Explicit ordering and lazy imports remain obvious.

Tradeoffs:

- Every page implementation contends for the same file.
- Page metadata, route metadata, and handoff identity are likely to drift through repeated transcription.
- The file becomes a catalog, router, navigation taxonomy, and loader registry at once.
- It relies heavily on process discipline to prevent parallel merge conflicts.

Use only for the first additional page or a very small final inventory.

### Approach B — Explicit category catalogs and a thin route adapter (recommended)

Each official category owns a small explicit catalog. A top-level GSAP catalog combines category arrays, and `routes.ts` adapts released definitions into the existing track/navigation model.

Conceptual shape, with category and page names filled only by Source Curators:

```text
src/content/gsap/
├── catalog.ts                         # combines category catalogs; Integrator-owned
├── <category>/
│   ├── catalog.ts                     # ordering + lazy loaders; Integrator-owned
│   └── <slug>/                        # one visible learning page; page-agent-owned
│       ├── <PageName>.tsx
│       ├── <slug>.meta.ts
│       ├── sections/
│       ├── components/
│       └── examples/
docs/handoffs/gsap/
└── <category>/<slug>/
    ├── handoff.md                     # canonical page contract; staged single-writer
    └── reviews/<gate>.md              # independent reviewer evidence
```

The page meta supplies stable runtime display fields such as title, category, local source path, canonical official URL, and reviewed date. The frozen handoff supplies the authoritative source manifest, coverage map, route, module selection, example contracts, blockers, findings, and release decision. Catalog entries use the frozen route/title/identity and a lazy page loader; they do not duplicate source coverage.

Advantages:

- Explicit and debuggable like the current router.
- Conflicts are partitioned by category and eliminated from page-agent work.
- Lazy loading, deterministic ordering, and navigation grouping stay intentional.
- Category catalogs can be created only when their first curated page exists.
- No build plugin, code generation, or new dependency is required.

Tradeoffs:

- One small registration step remains for the Wave Integrator.
- A category catalog can still conflict if multiple agents edit it; the ownership rule is therefore part of the architecture.
- Handoff/meta/catalog identity must be checked at integration time because TypeScript cannot validate Markdown fields.

### Approach C — Auto-discover page definitions with `import.meta.glob`

Each page exports a convention-based definition, and Vite discovers all definitions automatically.

Advantages:

- Page agents never edit a shared catalog.
- New folders can become routable with one local definition.
- Large inventories require less manual registration.

Tradeoffs:

- Ordering, grouping, duplicate-route handling, and release eligibility become implicit convention logic.
- It couples content architecture to Vite glob semantics and makes Storybook/build debugging less direct.
- Eager metadata plus lazy page loading is easy to implement incorrectly.
- A malformed or unreleased page may enter navigation automatically.
- The repository currently favors explicit, minimal code; this adds machinery before the inventory proves it is needed.

Do not adopt unless explicit category catalogs become a measured maintenance bottleneck after several waves.

## Recommended runtime and catalog boundary

### Definition contract

Evolve the lesson definition minimally so navigation does not infer identity:

- `id`: stable local identity derived from the frozen `<category>/<slug>` pair.
- `route`: explicit canonical local path from the handoff.
- `title`: user-facing title.
- `group`: navigation group chosen from curated official categorization.
- `Page`: lazy component.

Keep `track` as the app's learning perspective. Official-document learning pages remain in the official/API learning track; `patterns` and `showcases` remain non-official learning products and must not take ownership of an official source from its assigned learning page.

`getTrackHref`, route resolution, current-page state, progress, and the brand link should consume `route`/`id`, not reconstruct a path from a slug. Preserve `/fundamentals/gsap-to` as the existing canonical route. Do not decide the path shape for new pages until Source Curators complete the collision audit.

### Catalog rules

- Only pages with a page-level release `PASS` are merged into the released catalog.
- Catalog order is pedagogical/navigation order, not filesystem or alphabetic order.
- Adding a page to a category catalog is an Integrator action after all page blockers are resolved.
- Adding the first page in a new category also adds that category catalog to the top-level catalog; later pages do not touch the top-level file.
- No handoff parsing or official-site scraping occurs at runtime.
- Keep lazy page imports. Importing small page metadata eagerly is acceptable; importing the page implementation eagerly is not.
- Do not add React Router solely for catalog growth; the current history/focus behavior is small and comprehensible.

## Page-local architecture and handoff

### Page folder

Every page starts with the existing page boundary and selects only the files its format needs:

- `<PageName>.tsx`: header and section assembly only.
- `<PageName>.css`: page-wide layout only.
- `<slug>.meta.ts`: public official identity and display metadata.
- `<slug>.properties.ts`: only when an owned official source has a true property catalog.
- `sections/`: learner-flow units, which may reorder or combine official source items while preserving coverage.
- `components/`: UI reused only inside that page.
- `examples/`: independent executable learning units with the execution-source type selected by the workflow.

Do not add empty folders or placeholder files. A static page does not receive a runtime hook. A pure utility does not receive decorative animation. A plugin page gets registration, dependency, environment, failure, and cleanup treatment only when the official source establishes those needs.

### Handoff location and lifecycle

Use `docs/handoffs/gsap/<category>/<slug>/handoff.md` so the artifact mirrors the code boundary without entering the app bundle. Use the exact field names from `context-handoff.md`.

Ownership proceeds sequentially:

1. Source Curator creates `ownedSourcePages[]` and the separate top-level `sourceManifest[]`, `sourceBlockers[]`, revision, and related official boundaries.
2. Content Architect freezes `learningPage`, `primarySourcePageId`, ownership roles, `moduleSelection`, `learnerFlow`, planned `coverageMap`, and `exampleContracts`.
3. Implementer treats the handoff as read-only and changes only the declared page files.
4. Each independent reviewer records evidence in its own `reviews/<gate>.md`; reviewers never modify implementation.
5. Integrator alone updates implementation, resolution evidence, verification evidence, and catalog registration; only the owning independent reviewer changes a finding's status.
6. Independent Release Reviewer alone writes the final page decision.

This avoids several reviewers editing one Markdown file simultaneously while keeping `handoff.md` the canonical summary.

## Shared UI promotion policy

The default is page-local. Promotion is a refactor made by the Integrator after a second released or release-ready page demonstrates the same semantic contract.

Promotion checklist:

1. Name both consuming page paths.
2. Show that props express the same learning purpose, not merely similar styling.
3. Move implementation, CSS, and Storybook stories together into `src/components/<role>/<ComponentName>/`.
4. Keep page-specific copy, source data, serializers, and runtime ownership outside the shared component.
5. Re-run both consuming pages' affected gates.

Likely candidates to evaluate after the second page—not promises to build—are an official-page header and a section heading. The current `InteractiveExample` may be reused only when the second page naturally has the same interactive learning flow. It must not be expanded into a large optional-prop page builder. `PageCoverageSection` should stay local until its status semantics are redesigned around actual source/coverage states and used by two pages.

## What must be built first

### Gate 0 — Catalog reconciliation and route collision audit

Before application code changes, reconcile the two finalized raw catalogs while preserving their independent evidence. Source Curators confirm for every implementation slot:

- official page identity, canonical URL, reviewed date, category, slug;
- technical/nontechnical inclusion decision;
- prerequisite and related-page edges;
- likely page module(s);
- candidate route and any category/slug collision;
- source blockers.

The core/fundamentals catalog contributes 159 raw rows and the plugin catalog contributes 220 raw rows. Their 15 canonical overlaps produce a verified union of 364 unique technical sources. The master inventory assigns every source to one of the 86 curriculum learning pages before application implementation begins. A blocked source never enters an implementation wave.

### Foundation slice — catalog and handoff plumbing

Build only the infrastructure needed by the first curated page:

1. Explicit route/id support while preserving the current `gsap.to()` URL and fallback behavior.
2. One category catalog for the existing category, the top-level GSAP catalog, and a thin `routes.ts` adapter.
3. Default/brand navigation derived from the catalog instead of a hard-coded page path.
4. The mirrored page-handoff directory convention and review artifact convention.
5. Navigation verification with the existing page before adding new content.

Do not build a generator, schema library, universal page shell, search UI, or every possible category catalog in this slice.

### Golden second page

The Source Curator selects `[PILOT_PAGE]`: a source-complete, low-environment-risk learning page that exercises a page module not fully represented by the `gsap.to()` property catalog. Its purpose is to prove that the architecture supports a different learning-page shape and to reveal the first legitimate shared UI extraction.

The page is independently releasable and must pass all applicable gates before further bulk waves.

## Independently releasable waves

The following are capacity and risk boundaries, not the authoritative source or learning-page inventory.

| Wave | Curator-filled slots | Purpose | Release boundary |
| --- | --- | --- | --- |
| 0 | `[FOUNDATION]` | Explicit catalog/route identity and handoff plumbing; no new official inventory | Existing `gsap.to()` still builds, routes, and behaves as before |
| 1 | `[PILOT_PAGE]` | Prove a second page shape and first real cross-page contract | Pilot has its own handoff, reviews, browser evidence, and release decision |
| 2 | `[CORE_COHORT_1..N]` | Small cohort sharing verified prerequisites/terminology | Each page can merge alone; blocked slots are removed and cross-page review is rerun on the remaining set |
| 3 | `[SPECIALIZED_FORMAT_COHORT_1..N]` | Pages selected because class/instance, utility/overload, or ease/visualizer modules need dedicated patterns | Each page independently gated; shared UI promoted only after two consumers exist |
| 4 | `[PLUGIN_OR_INTEGRATION_COHORT_1..N]` | Higher-risk registration, dependency, environment, fallback, cleanup, or motion behavior | Each page requires its applicable browser/environment evidence before registration |
| N | `[REMAINING_CATEGORY_COHORT_1..N]` | Repeat bounded cohorts using the established patterns | No “complete category” claim until every curated source item/page is independently `PASS` |

Keep a cohort small enough that one Integrator can review and register it without overlapping shared-file edits; two to four implementation pages is a reasonable operating cap, not an inventory assertion. Prefer grouping pages with shared prerequisite vocabulary so Cross-page Consistency can resolve ownership and links once per wave. Do not group pages merely because their official URLs are adjacent.

## Parallel-agent conflict protocol

### File ownership

- Source Curator: only the assigned learning-page handoff's owned-source fields.
- Content Architect: only the assigned learning-page handoff's architecture fields.
- Page Implementer: only `src/content/gsap/<category>/<slug>/` files declared in `exactFiles`.
- Reviewer: no implementation edits; one unique review artifact.
- Wave Integrator: `src/content/gsap/**/catalog.ts`, `src/content/gsap/catalog.ts`, `src/app/routes.ts`, shared UI, and all finding fixes.
- Release Reviewer: page release decision only.

Page agents must not touch `routes.ts`, catalogs, shared components, global CSS, or another page folder. If a page needs shared behavior, it implements the smallest page-local version and raises a promotion candidate to the Integrator. The Integrator compares at least two consumers, performs one extraction, and reruns both pages' affected gates.

### Integration sequence

1. Freeze all selected learning-page handoffs before their implementation begins.
2. Implement pages in isolated branches/worktrees from the same baseline.
3. Review each page against its own manifest and diff.
4. Integrator accepts one passing page at a time, resolves shared candidates, and registers its route.
5. Run integration checks after every accepted page, not only after the whole cohort.
6. Run Cross-page Consistency on the accepted cohort and existing related pages.
7. Release only pages whose individual and integration decisions remain `PASS`.

This makes catalog changes serial and page work parallel, which is the simplest reliable way to avoid shared-file conflicts.

## Independent quality gates

### Pre-implementation

- **Source Curator:** all technical source items are verified or explicitly `blocked-source`; only nontechnical content is excluded.
- **Content Architect:** module selection, beginner vocabulary, mental model, learner order, examples, planned coverage evidence, non-goals, and preserve list are frozen.

### Per-page post-implementation

- **Official Coverage:** every source item maps to concrete section/reference/example/warning evidence.
- **Learning Transformation:** content is a staged explanation, not translation or summary.
- **Runtime/Display Sync:** required only for executable examples; controls, normalized config/descriptor, GSAP call, observation state, and displayed code share one runtime source.
- **Pedagogy:** terminology, one core question per example, observation instructions, reason, use case, and cautions are present.
- **Structure/Comment:** page/section/component/example boundaries and Korean one-line educational comments comply.
- **Accessibility/Motion:** required for interactive UI; keyboard, labels, status delivery, small viewport, reduced motion, and alternative state are checked.
- **Build/Integration:** TypeScript/Vite build, route, style, source path, and applicable browser behavior are evidenced. A created or modified shared `src/components` UI also has a Storybook story and `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook` evidence; otherwise record `none: shared component unchanged`.
- **Cross-page Consistency:** required for every N:1 learning page and whenever ownership moves, merges, splits, or related-page boundaries change.
- **Independent Release Review:** performed by a context that was not implementer, Integrator, or earlier reviewer.

Only the Integrator fixes implementation. A page returns to every gate affected by the fix. Unresolved `BLOCK`, unsupported `PASS`, missing evidence, or a `blocked-source` item prevents registration/release.

## Baseline and per-release verification

### Establish once on the clean baseline

Record commit SHA, dependency lock state, and current behavior before foundation changes:

```bash
npm run build
git diff --check
```

When this foundation creates or modifies a shared `src/components` UI, also add its Storybook story and run:

```bash
STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook
```

Otherwise record `none: shared component unchanged`.

Browser-check the existing `/fundamentals/gsap-to` route before and after catalog refactoring:

- direct load and hard refresh;
- unknown-path canonical fallback;
- header brand, track tabs, floating TOC, active lesson, and progress count;
- browser back/forward and main-content focus transfer;
- no console error or failed lazy chunk.

### Repeat for every accepted page/release branch

Build evidence:

```bash
npm run build
git diff --check
```

Run `STORYBOOK_DISABLE_TELEMETRY=1 npm run build-storybook` only when the change creates or modifies a shared `src/components` UI, with its story. Otherwise record `none: shared component unchanged`.

Browser evidence:

- canonical route direct load, reload, internal navigation, back/forward, active TOC item, progress, and lazy load;
- page header official URL, reviewed date, local source path, and handoff identity agree;
- all anchors and related official/local links resolve to their intended boundary;
- every interactive control works by keyboard, has a label, exposes changing status appropriately, and retains visible focus;
- replay/control state, actual runtime behavior, observation readout, and displayed code agree;
- every displayed `sourcePath` exists and points to the execution source selected in the handoff, or explicitly displays/records `none` with its reason;
- layout remains readable at the repository's 320px minimum width and at a representative desktop width, with no unintended horizontal page overflow;
- `prefers-reduced-motion: reduce` removes or shortens motion as declared while preserving a comprehensible final/alternative state;
- no console errors, React warnings, uncaught GSAP warnings, or missing assets.

Manual content evidence:

- source-manifest item count and IDs are independently compared with coverage-map entries;
- every item is `verified` and `covered`; a displayed count alone is not evidence;
- official examples that introduce additional behavior have their own source item;
- terminology and related-page ownership are compared with previously released connected pages.

Storybook is mandatory only when a shared `src/components` UI is created or modified, and that change carries a story. When a page has no shared UI change, do not run Storybook as an integration smoke check: verify page behavior in the app route and record `none: shared component unchanged` because page-local components do not require stories.

## Key blockers and decisions needed from Source Curators

1. **The source union is frozen, and the ownership inventory must exist before app changes.** The [core/fundamentals catalog](./official-core-source-catalog.md) and [plugin catalog](./official-plugin-source-catalog.md) reconcile to 364 unique sources; the master inventory must preserve that immutable set and assign every source exactly once.
2. **The proposed 86 curriculum routes have no collisions.** Keep the explicit `route` field so identity stays stable when pages are registered incrementally.
3. **`gsap.to()` lacks a workflow-complete handoff.** Before using it as a cross-page consistency baseline or claiming full-project coverage, backfill its source manifest, coverage statuses, review artifacts, and independent release decision.
4. **Current coverage UI overstates certainty.** Its `완료` label is count-based. It must remain page-local or be corrected against real status data before reuse.
5. **Current shared demo contracts are not universal.** `InteractiveExample` and `DemoPanel` are proven in code and Storybook, but not across two released official page types. New formats must not be forced into them.
6. **Navigation scale has not been browser-proven.** The current floating TOC scrolls a full lesson list in one panel. Do not add search/collapse yet, but establish a measured threshold during curated waves and revisit only when real catalog size or browser evidence shows a usability failure.

## Final decision

Proceed with Approach B after Gate 0. Build explicit route identity and category catalogs first, validate them against the unchanged `gsap.to()` page, then ship one curator-selected golden second page. Use that page—not speculation—to decide the first shared UI promotion. Continue in small, independently releasable cohorts with page-only parallel work and serial Integrator ownership of catalogs/shared files.
