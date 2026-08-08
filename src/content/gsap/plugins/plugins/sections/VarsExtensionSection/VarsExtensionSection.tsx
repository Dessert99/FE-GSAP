/** 등록된 plugin capability가 Tween vars에 닿는 순간을 진단 예제로 보여 준다. */
import { RegistrationDiagnostic } from "../../examples/RegistrationDiagnostic/RegistrationDiagnostic";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";

/** plugin의 registry key와 vars key 관계를 실행 전후로 설명한다. */
export function VarsExtensionSection() {
  return (
    <section
      id="vars-extension"
      className="plugins-page__section"
      aria-labelledby="vars-extension-title"
    >
      <SectionHeading
        number="03"
        id="vars-extension"
        title="등록된 plugin이 vars key를 읽는다"
        description="Tween vars는 한 객체지만, 등록된 plugin은 자신이 맡은 key를 해석해 target에 변화를 적용합니다."
      />
      <div className="plugins-page__prose">
        <p>
          <code>gsap.to(target, vars)</code>는 core의 Tween 생성 API입니다.
          여기서는 <code>text</code>가 TextPlugin의 등록 진단용 key라는 사실만
          봅니다. 문자 교체 규칙과 option 의미는 TextPlugin page의 소유권으로
          남깁니다.
        </p>
        <p>
          아래에서 먼저 registry state를 읽고, <strong>명시적인 버튼</strong>을
          눌렀을 때만 register합니다. 예제에 표시되는 import·registration·vars
          code는 모두 같은 runtime descriptor와 snapshot에서 나옵니다.
        </p>
      </div>
      <RegistrationDiagnostic />
    </section>
  );
}
