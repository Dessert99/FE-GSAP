import { getActiveRouteByPath, getRoutePath } from '../src/app/routes.ts'
import { apiLessons, practiceLessons } from '../src/lessons/index.ts'

const cases = [
  {
    pathname: '/lessons/ease-pack',
    expected: { section: 'api', slug: 'ease-pack' },
  },
  {
    pathname: '/ease-pack',
    expected: { section: 'api', slug: 'ease-pack' },
  },
  {
    pathname: '/practices/practice-hero-intro',
    expected: { section: 'practice', slug: 'practice-hero-intro' },
  },
]

const failures = []

for (const testCase of cases) {
  const actual = getActiveRouteByPath(testCase.pathname, apiLessons, practiceLessons)

  if (actual.section !== testCase.expected.section || actual.slug !== testCase.expected.slug) {
    failures.push(
      `${testCase.pathname}: expected ${testCase.expected.section}/${testCase.expected.slug}, got ${actual.section}/${actual.slug}`,
    )
  }
}

const canonicalPath = getRoutePath('api', 'ease-pack')

if (canonicalPath !== '/lessons/ease-pack') {
  failures.push(`canonical path: expected /lessons/ease-pack, got ${canonicalPath}`)
}

if (failures.length > 0) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Checked ${cases.length} route cases.`)
