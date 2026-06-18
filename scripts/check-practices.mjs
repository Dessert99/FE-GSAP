import { existsSync, readFileSync } from 'node:fs'

const expectedPractices = [
  {
    slug: 'practice-hero-intro',
    page: 'src/lessons/practice-hero-intro/PracticeHeroIntroPage.tsx',
    example: 'src/lessons/practice-hero-intro/examples/HeroIntroSequenceExample.tsx',
    progress: 'Hero Intro Sequence',
  },
  {
    slug: 'practice-scroll-product',
    page: 'src/lessons/practice-scroll-product/PracticeScrollProductPage.tsx',
    example: 'src/lessons/practice-scroll-product/examples/ScrollProductStoryExample.tsx',
    progress: 'Scroll Product Story',
  },
  {
    slug: 'practice-interactive-gallery',
    page: 'src/lessons/practice-interactive-gallery/PracticeInteractiveGalleryPage.tsx',
    example: 'src/lessons/practice-interactive-gallery/examples/InteractiveGalleryExample.tsx',
    progress: 'Interactive Gallery',
  },
  {
    slug: 'practice-svg-text-motion',
    page: 'src/lessons/practice-svg-text-motion/PracticeSvgTextMotionPage.tsx',
    example: 'src/lessons/practice-svg-text-motion/examples/SvgTextMotionExample.tsx',
    progress: 'SVG / Text Motion Section',
  },
  {
    slug: 'practice-navigation-modal',
    page: 'src/lessons/practice-navigation-modal/PracticeNavigationModalPage.tsx',
    example: 'src/lessons/practice-navigation-modal/examples/NavigationModalExample.tsx',
    progress: 'Navigation / Modal Microinteractions',
  },
  {
    slug: 'practice-performance-debugging',
    page: 'src/lessons/practice-performance-debugging/PracticePerformanceDebuggingPage.tsx',
    example: 'src/lessons/practice-performance-debugging/examples/PerformanceDebuggingExample.tsx',
    progress: 'Performance & Debugging Clinic',
  },
]

const indexSource = readFileSync('src/lessons/index.ts', 'utf8')
const progressSource = readFileSync('docs/progress.md', 'utf8')
const failures = []

for (const practice of expectedPractices) {
  if (!indexSource.includes(`slug: '${practice.slug}'`)) {
    failures.push(`missing practiceLessons slug: ${practice.slug}`)
  }

  if (!existsSync(practice.page)) {
    failures.push(`missing page file: ${practice.page}`)
  }

  if (!existsSync(practice.example)) {
    failures.push(`missing example file: ${practice.example}`)
  }

  if (!progressSource.includes(`- [x] ${practice.progress}`)) {
    failures.push(`progress is not checked: ${practice.progress}`)
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Checked ${expectedPractices.length} practice lessons.`)
