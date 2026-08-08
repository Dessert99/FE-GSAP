/** TextPlugin의 registry state와 replayable Tween을 한 runtime descriptor에서 관리한다. */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useRef, useState } from "react";
import { useReducedMotion } from "../../../../../../components/demo/InteractiveExample/useReducedMotion";

/** import·registry·vars code가 공유하는 TextPlugin 진단 descriptor다. */
export type RegistrationDescriptor = {
  modulePath: "gsap/TextPlugin";
  registryName: "TextPlugin";
  varsKey: "text";
  sampleValue: string;
};
/** 화면이 실제 registry와 마지막 요청을 같은 snapshot으로 표시한다. */
export type RegistrationSnapshot = {
  registered: boolean;
  action: "waiting" | "registered" | "replayed";
};

// P01에서 등록 흐름만 확인할 실제 plugin과 Tween vars key를 고정한다
const registrationDescriptor: RegistrationDescriptor = {
  modulePath: "gsap/TextPlugin",
  registryName: "TextPlugin",
  varsKey: "text",
  sampleValue: "등록된 plugin이 이 vars 값을 읽었습니다.",
};

/** 명시적 등록 뒤에만 TextPlugin Tween을 만들고 cleanup에서 되돌린다. */
export function useRegistrationDiagnosticAnimation() {
  // GSAP selector와 context cleanup을 이 예제 DOM 안으로 한정한다
  const scope = useRef<HTMLDivElement>(null);
  // TextPlugin이 실제로 변경할 문장 DOM을 보존한다
  const previewRef = useRef<HTMLParagraphElement>(null);
  // 명시적 등록 또는 replay 요청마다 새 Tween을 만들 trigger다
  const [runKey, setRunKey] = useState(0);
  // registry와 마지막 사용자 action을 이산 상태로만 알린다
  const [snapshot, setSnapshot] = useState<RegistrationSnapshot>(() => ({
    registered: Boolean(gsap.plugins[registrationDescriptor.varsKey]),
    action: "waiting",
  }));
  // 모션 감소 환경에서는 같은 최종 text를 duration 0으로 적용한다
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      // 현재 GSAP registry를 다시 읽어 import side effect 여부도 숨기지 않는다
      const registered = Boolean(gsap.plugins[registrationDescriptor.varsKey]);
      // 등록되지 않았으면 TextPlugin vars를 실행하지 않고 상태만 남긴다
      if (!registered || !previewRef.current) return;
      // 새 replay 전에 이전 Tween이 남긴 값을 context가 되돌릴 수 있게 시작 문장을 정한다
      gsap.set(previewRef.current, {
        text: "등록이 확인되어 replay를 준비했습니다.",
      });
      // descriptor의 sampleValue를 TextPlugin vars로 넘겨 실제 plugin capability를 실행한다
      const tween = gsap.to(previewRef.current, {
        text: registrationDescriptor.sampleValue,
        duration: reducedMotion ? 0 : 0.8,
        ease: "power1.out",
      });
      // context 정리 때 Tween이 기록한 시작 DOM 상태로 되돌린다
      return () => {
        tween.revert();
      };
    },
    // 명시적 action이나 모션 설정 변경 때만 이전 context를 되돌리고 새 Tween을 만든다
    { scope, dependencies: [runKey, reducedMotion], revertOnUpdate: true },
  );

  // button을 누르기 전에는 registerPlugin을 호출하지 않는다
  function register() {
    // 현재 registry를 읽어 이미 등록된 module을 다시 만들지 않는다
    const alreadyRegistered = Boolean(
      gsap.plugins[registrationDescriptor.varsKey],
    );
    // 아직 없을 때만 imported TextPlugin을 GSAP core에 명시적으로 연결한다
    if (!alreadyRegistered) gsap.registerPlugin(TextPlugin);
    // register 결과를 실제 registry에서 다시 읽어 status와 code snapshot을 맞춘다
    const registered = Boolean(gsap.plugins[registrationDescriptor.varsKey]);
    // registry state를 이산 status로 전달해 screen reader가 frame 값을 읽지 않게 한다
    setSnapshot({ registered, action: "registered" });
    // 등록이 확인된 경우에만 Tween 생성 effect를 다시 실행한다
    if (registered) setRunKey((key) => key + 1);
  }

  // 등록된 capability만 다시 재생하고 그렇지 않으면 register 버튼으로 유도한다
  function replay() {
    // 아직 registry에 없는 vars key는 Tween으로 보내지 않는다
    if (!snapshot.registered) return;
    // code panel과 status가 실제 replay 요청을 함께 표시한다
    setSnapshot({ registered: true, action: "replayed" });
    // cleanup 뒤 새 Tween을 만들도록 replay key를 증가시킨다
    setRunKey((key) => key + 1);
  }

  // TSX가 descriptor·registry snapshot·native control handler만 소비하도록 반환한다
  return {
    scope,
    previewRef,
    descriptor: registrationDescriptor,
    snapshot,
    reducedMotion,
    register,
    replay,
  };
}
