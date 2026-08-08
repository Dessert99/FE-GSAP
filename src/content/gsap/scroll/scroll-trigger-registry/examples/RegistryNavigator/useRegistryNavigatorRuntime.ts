/** P44의 owned registry, navigator, guarded killAll 재생성을 소유한다. */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState } from 'react'

/** 목록과 selected lookup에 쓰는 owned trigger 식별자다. */
export type RegistryId = 'registry-alpha' | 'registry-beta' | 'registry-gamma'

/** readout이 실제 registry 상태를 한 번에 동결한 값이다. */
export type RegistrySnapshot = {
  ids: string[]
  selectedId: RegistryId
  found: boolean
  previousId: string | null
  nextId: string | null
  isScrolling: boolean
  isTouch: number
}

/** 세 local section과 code panel이 공유하는 trigger descriptor다. */
export const registryDescriptor: ReadonlyArray<{
  id: RegistryId
  label: string
  start: string
  end: string
}> = [
  { id: 'registry-alpha', label: 'Alpha', start: 'top 85%', end: 'bottom 15%' },
  { id: 'registry-beta', label: 'Beta', start: 'top 85%', end: 'bottom 15%' },
  { id: 'registry-gamma', label: 'Gamma', start: 'top 85%', end: 'bottom 15%' },
]

// actual static and instance registry calls 전에 plugin을 GSAP core에 등록한다
gsap.registerPlugin(ScrollTrigger)

/** local scroller 안에서만 세 trigger를 만들고 static registry를 snapshot으로 읽는다. */
export function useRegistryNavigatorRuntime() {
  // useGSAP selector와 owned cleanup 범위를 이 lab DOM으로 한정한다
  const scope = useRef<HTMLDivElement>(null)
  // 세 section trigger가 공유할 keyboard-scrollable local scroller다
  const scrollerRef = useRef<HTMLDivElement>(null)
  // callback ref가 descriptor ID마다 정확한 local section을 보관한다
  const targetRefs = useRef<Record<RegistryId, HTMLDivElement | null>>({
    'registry-alpha': null,
    'registry-beta': null,
    'registry-gamma': null,
  })
  // normal cleanup과 isolated reset이 소유 instance만 처분하도록 유지한다
  const ownedRef = useRef<ScrollTrigger[]>([])
  // selected lookup과 order navigation 결과를 continuous rendering 없이 보관한다
  const [snapshot, setSnapshot] = useState<RegistrySnapshot>({
    ids: [],
    selectedId: 'registry-alpha',
    found: false,
    previousId: null,
    nextId: null,
    isScrolling: false,
    isTouch: ScrollTrigger.isTouch,
  })
  // action 결과만 live status로 알려 연속 scroll 상태를 announce하지 않는다
  const [notice, setNotice] = useState(
    '세 trigger를 만들고 registry snapshot을 읽는 중입니다.',
  )

  // instance ID를 optional vars.id에서 안전하게 text readout으로 정규화한다
  const getId = (trigger: ScrollTrigger | undefined) =>
    typeof trigger?.vars.id === 'string' ? trigger.vars.id : null

  // getAll, getById, next, previous, isScrolling, isTouch의 같은 시점 결과를 동결한다
  const readRegistry = (selectedId: RegistryId) => {
    const selected = ScrollTrigger.getById(selectedId)
    setSnapshot({
      ids: ScrollTrigger.getAll().map((trigger) =>
        String(trigger.vars.id ?? '(unlabelled)'),
      ),
      selectedId,
      found: Boolean(selected),
      previousId: getId(selected?.previous()),
      nextId: getId(selected?.next()),
      isScrolling: ScrollTrigger.isScrolling(),
      isTouch: ScrollTrigger.isTouch,
    })
  }

  // descriptor target가 모두 mount된 경우에만 standalone local instances를 만든다
  const createOwned = () => {
    const scroller = scrollerRef.current
    if (!scroller) return false
    const targets = registryDescriptor.map(
      (descriptor) => targetRefs.current[descriptor.id],
    )
    if (targets.some((target) => !target)) return false
    ownedRef.current = registryDescriptor.map((descriptor) =>
      ScrollTrigger.create({
        id: descriptor.id,
        trigger: targetRefs.current[descriptor.id]!,
        scroller,
        start: descriptor.start,
        end: descriptor.end,
      }),
    )
    ScrollTrigger.refresh()
    return true
  }

  // mount 동안 owned local triggers만 만들고 unmount에서 그 instance만 kill한다
  useGSAP(
    () => {
      // external registry와 섞이지 않는 local targets로 세 labelled trigger를 생성한다
      if (!createOwned()) return undefined
      // initial selected lookup은 create 뒤 실제 registry에서 읽는다
      readRegistry('registry-alpha')
      setNotice(
        '세 owned trigger를 만들었습니다. 목록 또는 이전·다음 순서를 읽어보세요.',
      )

      // page dispose는 global killAll을 쓰지 않고 이 lab이 만든 instance만 정리한다
      return () => {
        ownedRef.current.forEach((trigger) => trigger.kill())
        ownedRef.current = []
      }
    },
    // scope 하나가 React unmount와 GSAP context cleanup을 같은 local owner에 묶는다
    { scope },
  )

  // selected ID로 getById와 refresh order neighbor를 다시 읽는다
  const select = (id: RegistryId) => {
    readRegistry(id)
    setNotice(`${id}의 lookup과 previous/next 결과를 snapshot으로 읽었습니다.`)
  }

  // global killAll은 registry가 이 lab의 세 instance뿐일 때만 실제 실행한다
  const resetIsolatedRegistry = () => {
    // 같은 ID 문자열이 아니라 exact instance identity로 foreign ownership을 판정한다
    const registered = ScrollTrigger.getAll()
    // normal cleanup과 같은 owned instance 목록을 guard에도 사용한다
    const owned = ownedRef.current
    if (
      registered.length !== owned.length ||
      registered.some((trigger) => !owned.includes(trigger))
    ) {
      setNotice(
        '외부 trigger가 있어 killAll을 실행하지 않았습니다. normal cleanup은 항상 owned-only입니다.',
      )
      return
    }
    // isolated trigger만 kill하되 unrelated global listener는 allowListeners로 보존한다
    ScrollTrigger.killAll(true)
    ownedRef.current = []
    if (createOwned()) {
      readRegistry(snapshot.selectedId)
      setNotice(
        'isolated registry에서 killAll() 뒤 세 owned trigger를 명시적으로 recreate했습니다.',
      )
    }
  }

  // display는 refs, descriptor, frozen snapshot과 discrete actions만 소비한다
  return {
    scope,
    scrollerRef,
    targetRefs,
    descriptor: registryDescriptor,
    snapshot,
    notice,
    select,
    resetIsolatedRegistry,
  }
}
