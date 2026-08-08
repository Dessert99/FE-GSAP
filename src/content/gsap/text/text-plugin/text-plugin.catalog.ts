/** P34가 소유한 #217의 complete technical item을 rendered/source 순서로 고정한다. */
export const textPluginCatalog = [
  {
    id: 'TEXT-217-01',
    officialItem: 'Register TextPlugin before using the text tween property.',
    sectionId: 'setup',
  },
  {
    id: 'TEXT-217-02',
    officialItem: 'A string text value replaces element text over a tween.',
    sectionId: 'setup',
  },
  {
    id: 'TEXT-217-03',
    officialItem:
      'Text replaces character-by-character or delimiter units; final content is replaced and rewind/restart reverts it.',
    sectionId: 'mental-model',
  },
  {
    id: 'TEXT-217-04',
    officialItem:
      'Special TextPlugin options belong inside the text object form, not the outer tween vars.',
    sectionId: 'setup',
  },
  {
    id: 'TEXT-217-05',
    officialItem:
      'delimiter splits text; default empty string isolates characters and a space supports words.',
    sectionId: 'token-lab',
  },
  {
    id: 'TEXT-217-06',
    officialItem: 'newClass applies a class to new text through a span.',
    sectionId: 'token-lab',
  },
  {
    id: 'TEXT-217-07',
    officialItem: 'oldClass applies a class to old text through a span.',
    sectionId: 'token-lab',
  },
  {
    id: 'TEXT-217-08',
    officialItem:
      'padSpace true pads trailing space with non-breaking space HTML when new text is shorter.',
    sectionId: 'token-lab',
  },
  {
    id: 'TEXT-217-09',
    officialItem:
      'preserveSpaces true maintains extra spaces with non-breaking space HTML.',
    sectionId: 'content-boundary',
  },
  {
    id: 'TEXT-217-10',
    officialItem:
      'rtl true introduces text from right to left in reverse order.',
    sectionId: 'mental-model',
  },
  {
    id: 'TEXT-217-11',
    officialItem:
      'speed adjusts tween duration from text changes; the documented formula is 0.05 / speed * text_changes.',
    sectionId: 'mental-model',
  },
  {
    id: 'TEXT-217-12',
    officialItem:
      'type diff skips identical character positions and animates only differences.',
    sectionId: 'mental-model',
  },
  {
    id: 'TEXT-217-13',
    officialItem:
      'value is the required replacement text string in object form.',
    sectionId: 'token-lab',
  },
  {
    id: 'TEXT-217-14',
    officialItem:
      'TextPlugin recognizes simple HTML nodes such as br and honors them.',
    sectionId: 'content-boundary',
  },
  {
    id: 'TEXT-217-15',
    officialItem:
      'Source accepts innerHTML targets or SVG text and writes intermediate content/class spans to that target.',
    sectionId: 'content-boundary',
  },
] as const
