import { describe, expect, it } from 'vitest'

type StoryModule = {
  default: {
    title?: string
  }
  [exportName: string]: unknown
}

const storyModules = import.meta.glob('./**/*.stories.tsx', {
  eager: true,
}) as Record<string, StoryModule>

describe('Storybook component catalog', () => {
  it('contains every shared component and its representative states', () => {
    const catalog = Object.values(storyModules)
      .map(({ default: meta, ...stories }) => ({
        title: meta.title,
        stories: Object.keys(stories).sort(),
      }))
      .sort((first, second) => (first.title ?? '').localeCompare(second.title ?? ''))

    expect(catalog).toEqual([
      {
        title: 'Components/Demo/DemoPanel',
        stories: ['Default', 'WithOfficialReferences'],
      },
      {
        title: 'Components/Demo/OfficialDocsLink',
        stories: ['Default', 'LongLabel'],
      },
      {
        title: 'Components/Navigation/FloatingToc',
        stories: ['Closed', 'Open'],
      },
      {
        title: 'Components/Navigation/TrackTabs',
        stories: ['Fundamentals', 'Patterns', 'Showcases'],
      },
    ])
  })
})
