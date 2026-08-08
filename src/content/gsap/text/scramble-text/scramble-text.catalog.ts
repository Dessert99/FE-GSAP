/** P31이 소유한 #141의 complete technical item을 source 순서로 고정한다. */
export const scrambleTextCatalog = [
  {
    id: 'SCRAMBLE-141-01',
    officialItem:
      'Register ScrambleTextPlugin before using the scrambleText tween property.',
    sectionId: 'setup',
  },
  {
    id: 'SCRAMBLE-141-02',
    officialItem:
      'A string scrambleText value uses default reveal settings in a gsap.to tween.',
    sectionId: 'setup',
  },
  {
    id: 'SCRAMBLE-141-03',
    officialItem:
      'Random characters refresh while new or original text is gradually revealed left to right by default.',
    sectionId: 'mental-model',
  },
  {
    id: 'SCRAMBLE-141-04',
    officialItem:
      'text replaces target text; omitted, {original}, or original sentinel uses the original text.',
    sectionId: 'phrase-lab',
  },
  {
    id: 'SCRAMBLE-141-05',
    officialItem:
      'chars accepts upperCase, lowerCase, upperAndLowerCase, or custom characters; default upperCase.',
    sectionId: 'phrase-lab',
  },
  {
    id: 'SCRAMBLE-141-06',
    officialItem:
      'tweenLength gradually changes differing text length; false makes the length jump; default true.',
    sectionId: 'mental-model',
  },
  {
    id: 'SCRAMBLE-141-07',
    officialItem:
      'revealDelay delays reveal for a specified tween-time portion; default 0.',
    sectionId: 'phrase-lab',
  },
  {
    id: 'SCRAMBLE-141-08',
    officialItem:
      'newClass wraps new text in a span with the supplied class; default null.',
    sectionId: 'content-boundary',
  },
  {
    id: 'SCRAMBLE-141-09',
    officialItem:
      'oldClass wraps original text in a span with the supplied class; default null.',
    sectionId: 'content-boundary',
  },
  {
    id: 'SCRAMBLE-141-10',
    officialItem:
      'speed controls randomized-character refresh frequency; default 1.',
    sectionId: 'phrase-lab',
  },
  {
    id: 'SCRAMBLE-141-11',
    officialItem:
      'delimiter changes character-by-character reveal to a delimiter-based unit such as words; default empty string.',
    sectionId: 'mental-model',
  },
  {
    id: 'SCRAMBLE-141-12',
    officialItem:
      'rightToLeft reveals from right to left when true; default false.',
    sectionId: 'phrase-lab',
  },
  {
    id: 'SCRAMBLE-141-13',
    officialItem:
      'The official usage example combines text, chars, revealDelay, speed, and newClass in one object.',
    sectionId: 'phrase-lab',
  },
  {
    id: 'SCRAMBLE-141-14',
    officialItem:
      'Installed source writes innerHTML when available and class options create span markup, so a scrambled target owns replaceable content.',
    sectionId: 'content-boundary',
  },
] as const
