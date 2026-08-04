# CLAUDE.md

Claude Code 전용 진입점. 지침 원본은 `AGENTS.md`이고 여기서는 참조만 한다 — 규칙을 여기에 복사하지 않는다.

## 항상 적용되는 지침

@AGENTS.md

## 코드 배치 기준

@docs/project-structure.md

## 상황이 되면 직접 읽을 문서

- **GSAP 공식 문서 기반 학습 페이지·예제를 추가/수정하거나, coverage와 코드 패널 동기화를 검토할 때** — `docs/workflows/README.md`와 거기서 연결된 5개 계약 문서(`source-coverage`, `learning-design`, `page-format`, `context-handoff`, `quality-gates`)
- **위 작업의 전체 workflow** — `.agents/skills/creating-gsap-learning-pages/SKILL.md`. Codex project skill 경로라 Claude Code 스킬 목록에는 뜨지 않으므로 필요하면 직접 읽는다.
- **페이지별 담당 source와 진행 상태** — `docs/handoffs/gsap/_program/master-page-inventory.md` (학습 페이지 86개의 소유권 authority)
- **개별 페이지 handoff** — `docs/handoffs/gsap/<분류>/<slug>.md`
