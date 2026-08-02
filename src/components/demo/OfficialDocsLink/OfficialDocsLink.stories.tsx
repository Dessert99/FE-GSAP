/** OfficialDocsLink의 기본 길이와 긴 학습 주제 라벨을 비교한다. */
import type { Meta, StoryObj } from '@storybook/react-vite'
import { OfficialDocsLink } from './OfficialDocsLink'

const meta = {
  title: 'Components/Demo/OfficialDocsLink',
  component: OfficialDocsLink,
  args: {
    label: 'gsap.to()',
    href: 'https://gsap.com/docs/v3/GSAP/gsap.to()/',
  },
} satisfies Meta<typeof OfficialDocsLink>

/** OfficialDocsLink 스토리를 데모 컴포넌트 분류에 등록한다. */
export default meta
type Story = StoryObj<typeof meta>

/** 짧은 API 이름을 사용하는 기본 링크를 보여준다. */
export const Default: Story = {}

/** 긴 한국어 라벨에서도 링크 형태가 유지되는지 보여준다. */
export const LongLabel: Story = {
  args: {
    label: '상대값과 랜덤 값 표현',
  },
}
