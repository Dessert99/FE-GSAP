# Project Structure Documentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 현재 저장소 구조를 간결한 트리 문서로 만들고 필수 프로젝트 참조 문서에 연결한다.

**Architecture:** `docs/project-structure.md`를 구조 정보의 단일 문서로 둔다. `AGENTS.md`는 이 문서를 필수 참조 순서에 연결하고, `docs/progress.md`는 문서화 완료 사실만 기록한다.

**Tech Stack:** Markdown, Git

## Global Constraints

- 유지보수 대상 폴더와 파일만 기록한다.
- `node_modules`, `dist`, Git 내부 파일, 임시 파일은 제외한다.
- 설명은 각 경로의 역할을 구분하는 데 필요한 수준으로 제한한다.

---

### Task 1: 현재 프로젝트 구조 문서화

**Files:**
- Create: `docs/project-structure.md`
- Modify: `AGENTS.md`
- Modify: `docs/progress.md`

**Interfaces:**
- Consumes: 현재 Git 추적 대상 및 작업 트리의 프로젝트 파일 경로
- Produces: 코딩 전 읽는 프로젝트 구조 참조 문서

- [ ] **Step 1: 구조 문서 작성**

`docs/project-structure.md`에 루트부터 `src/fundamentals/gsap-to/examples`까지 현재 유지보수 대상 경로를 트리로 기록한다.

- [ ] **Step 2: 필수 참조 순서 연결**

`AGENTS.md`의 `프로젝트 참조 순서`에 `docs/project-structure.md`를 추가하고 기존 문서 순서를 조정한다.

- [ ] **Step 3: 진행 현황 갱신**

`docs/progress.md`의 완료 항목에 프로젝트 구조 문서와 필수 참조 연결을 기록한다.

- [ ] **Step 4: 문서 검증**

Run: `git diff --check`
Expected: 출력 없이 종료 코드 0

Run: `rg -n "project-structure.md|프로젝트 구조" AGENTS.md docs/progress.md docs/project-structure.md`
Expected: 세 문서에서 구조 문서 또는 완료 기록 확인

Run: `git status --short`
Expected: 계획된 문서 파일만 변경 또는 추가됨

- [ ] **Step 5: Commit**

```bash
git add AGENTS.md docs/project-structure.md docs/progress.md docs/superpowers/plans/2026-08-01-project-structure-documentation.md
git commit -m "docs: 프로젝트 구조 문서 추가"
```
