/** Plugins 개요의 출처·학습 단계·coverage 분모를 한곳에서 고정한다. */
export const pluginsMeta = {
  title: "Plugins: loading, registration, and ownership",
  category: "GSAP · Plugins",
  summary:
    "Plugin은 GSAP core에 필요한 능력만 덧붙입니다. 먼저 파일을 load하고, 한 번 register한 뒤, 그 plugin이 읽는 vars key를 Tween에 넘기는 순서를 확인합니다.",
  sourcePath: "src/content/gsap/plugins/plugins/",
  reviewedAt: "2026-08-08",
  officialSources: [
    { label: "Plugins overview", href: "https://gsap.com/docs/v3/Plugins/" },
  ],
} as const;

/** 공식 item을 초보자의 선택 순서에 맞춘 다섯 섹션으로 묶는다. */
export const pluginsSections = [
  {
    number: "01",
    id: "plugin-mental-model",
    title: "plugin은 core에 능력을 더한다",
    sourceItems: 7,
  },
  {
    number: "02",
    id: "load-register",
    title: "load와 register는 다른 단계다",
    sourceItems: 3,
  },
  {
    number: "03",
    id: "vars-extension",
    title: "등록된 plugin이 vars key를 읽는다",
    sourceItems: 2,
  },
  {
    number: "04",
    id: "plugin-families",
    title: "어떤 종류의 plugin을 고를까?",
    sourceItems: 10,
  },
  {
    number: "05",
    id: "plugin-boundaries",
    title: "번들·서버·정리의 경계",
    sourceItems: 4,
  },
] as const;

/** source 한 페이지와 공식 기술 item 26개를 표시하는 coverage 기준이다. */
export const pluginsCoverage = {
  officialSources: 1,
  officialSourceItems: 26,
  localSections: 5,
} as const;
