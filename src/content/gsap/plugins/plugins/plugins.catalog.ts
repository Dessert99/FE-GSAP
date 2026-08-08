/** Plugins overview의 공식 기술 item을 section evidence로 고정한다. */

/** 한 공식 문장 또는 목록이 어느 로컬 학습 근거로 이어지는지 나타낸다. */
export type PluginSourceItem = {
  id: string;
  officialItem: string;
  sourceLocation: string;
  origin: "official";
  sectionId: string;
};

/** 공식 overview에서 확인한 기술 item 26개다. */
export const pluginSourceItems: PluginSourceItem[] = [
  {
    id: "PLUG-01",
    officialItem: "plugin은 GSAP core에 추가 capability를 더한다.",
    sourceLocation: "intro",
    origin: "official",
    sectionId: "plugin-mental-model",
  },
  {
    id: "PLUG-02",
    officialItem:
      "필요할 때만 기능을 더할 수 있도록 GSAP core는 비교적 작게 유지된다.",
    sourceLocation: "intro",
    origin: "official",
    sectionId: "plugin-mental-model",
  },
  {
    id: "PLUG-03",
    officialItem:
      "Included in GSAP's Core가 core-included capability의 시작 heading이다.",
    sourceLocation: "Included in GSAP's Core",
    origin: "official",
    sectionId: "plugin-mental-model",
  },
  {
    id: "PLUG-19",
    officialItem:
      "Animate anything은 CSS properties, Attributes, Array Values 등을 core capability로 나열한다.",
    sourceLocation: "Included in GSAP's Core > Animate anything",
    origin: "official",
    sectionId: "plugin-mental-model",
  },
  {
    id: "PLUG-20",
    officialItem:
      "core Eases는 none, power, back, bounce, circ, elastic, expo, sine, steps(n)을 나열한다.",
    sourceLocation: "Included in GSAP's Core > Eases",
    origin: "official",
    sectionId: "plugin-mental-model",
  },
  {
    id: "PLUG-21",
    officialItem:
      "Animate efficiently는 staggers, callbacks, snapping, modifiers, keyframes, ticker, cleanup, matchMedia를 나열한다.",
    sourceLocation: "Included in GSAP's Core > Animate efficiently",
    origin: "official",
    sectionId: "plugin-mental-model",
  },
  {
    id: "PLUG-22",
    officialItem:
      "Utility Methods는 checkPrefix부터 wrapYoyo까지의 utility group을 core 포함 기능으로 나열한다.",
    sourceLocation: "Included in GSAP's Core > Utility Methods",
    origin: "official",
    sectionId: "plugin-mental-model",
  },
  {
    id: "PLUG-04",
    officialItem:
      "plugin 파일은 core library처럼 JavaScript 파일이며 script tag, npm, yarn, tgz로 설치·load할 수 있다.",
    sourceLocation: "Installing/Loading a plugin",
    origin: "official",
    sectionId: "load-register",
  },
  {
    id: "PLUG-05",
    officialItem: "plugin 파일을 먼저 load해야 register할 수 있다.",
    sourceLocation: "Registering a plugin",
    origin: "official",
    sectionId: "load-register",
  },
  {
    id: "PLUG-06",
    officialItem: "gsap.registerPlugin()은 여러 plugin을 한 번에 받을 수 있다.",
    sourceLocation: "Registering a plugin code example",
    origin: "official",
    sectionId: "load-register",
  },
  {
    id: "PLUG-07",
    officialItem: "registering은 plugin과 GSAP core가 함께 동작하게 한다.",
    sourceLocation: "Registering a plugin",
    origin: "official",
    sectionId: "vars-extension",
  },
  {
    id: "PLUG-09",
    officialItem:
      "공식 register example은 gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, MorphSVGPlugin)이다.",
    sourceLocation: "Registering a plugin code example",
    origin: "official",
    sectionId: "vars-extension",
  },
  {
    id: "PLUG-10",
    officialItem:
      "Scroll Plugins는 ScrollTrigger, ScrollTo, ScrollSmoother를 나열한다.",
    sourceLocation: "Plugin Overview > Scroll Plugins",
    origin: "official",
    sectionId: "plugin-families",
  },
  {
    id: "PLUG-23",
    officialItem:
      "Text Plugins는 SplitText, ScrambleText, Text Replacement를 나열한다.",
    sourceLocation: "Plugin Overview > Text Plugins",
    origin: "official",
    sectionId: "plugin-families",
  },
  {
    id: "PLUG-24",
    officialItem:
      "SVG Plugins는 DrawSVG, MorphSVG, MotionPath, MotionPathHelper를 나열한다.",
    sourceLocation: "Plugin Overview > SVG Plugins",
    origin: "official",
    sectionId: "plugin-families",
  },
  {
    id: "PLUG-25",
    officialItem: "UI Plugins는 Flip, Draggable, Inertia, Observer를 나열한다.",
    sourceLocation: "Plugin Overview > UI Plugins",
    origin: "official",
    sectionId: "plugin-families",
  },
  {
    id: "PLUG-26",
    officialItem:
      "Other Plugins는 Physics2D, PhysicsProps, GSDevTools, Easel, Pixi를 나열한다.",
    sourceLocation: "Plugin Overview > Other Plugins",
    origin: "official",
    sectionId: "plugin-families",
  },
  {
    id: "PLUG-27",
    officialItem:
      "separate Eases는 CustomEase, EasePack, CustomWiggle, CustomBounce를 나열한다.",
    sourceLocation: "Plugin Overview > Eases",
    origin: "official",
    sectionId: "plugin-families",
  },
  {
    id: "PLUG-28",
    officialItem: "React는 useGSAP()을 npm availability와 함께 제시한다.",
    sourceLocation: "Plugin Overview > React",
    origin: "official",
    sectionId: "plugin-families",
  },
  {
    id: "PLUG-11",
    officialItem: "ScrollSmoother는 ScrollTrigger가 필요하다고 표시된다.",
    sourceLocation: "Scroll Plugins",
    origin: "official",
    sectionId: "plugin-families",
  },
  {
    id: "PLUG-12",
    officialItem:
      "CustomWiggle과 CustomBounce는 각각 CustomEase가 필요하다고 표시된다.",
    sourceLocation: "Eases",
    origin: "official",
    sectionId: "plugin-families",
  },
  {
    id: "PLUG-13",
    officialItem:
      "각 독립 plugin의 overview 항목에는 CDN 또는 npm availability badge가 표시된다.",
    sourceLocation: "Plugin Overview availability badges",
    origin: "official",
    sectionId: "plugin-families",
  },
  {
    id: "PLUG-14",
    officialItem:
      "registering은 build tool·bundler의 tree shaking 문제를 막는다.",
    sourceLocation: "Registering a plugin",
    origin: "official",
    sectionId: "plugin-boundaries",
  },
  {
    id: "PLUG-15",
    officialItem: "plugin은 사용 전에 한 번만 register하면 된다.",
    sourceLocation: "Registering a plugin",
    origin: "official",
    sectionId: "plugin-boundaries",
  },
  {
    id: "PLUG-16",
    officialItem:
      "같은 plugin을 여러 번 register해도 해롭지는 않지만 도움이 되지도 않는다.",
    sourceLocation: "Registering a plugin",
    origin: "official",
    sectionId: "plugin-boundaries",
  },
  {
    id: "PLUG-18",
    officialItem:
      "overview는 Installation helper로 연결하며 환경별 설치 상세는 그 경계에 둔다.",
    sourceLocation: "Installing/Loading a plugin",
    origin: "official",
    sectionId: "plugin-boundaries",
  },
];
