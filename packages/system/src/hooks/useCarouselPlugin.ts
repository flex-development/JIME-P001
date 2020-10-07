import { NullishNumber } from '@flex-development/kustomtypez'
import { CarouselEventHandler, CarouselOption } from 'bootstrap'
import CarouselPlugin from 'bootstrap/js/dist/carousel'
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react'

/**
 * @file Create a Bootstrap carousel instance
 * @module hooks/useCarouselPlugin
 *
 * @todo Add declaration file for 'bootstrap/js/dist/carousel'
 */

/**
 * `useCarouselPlugin` state.
 */
export type UseCarouselPlugin = {
  /**
   * Index of active slide.
   */
  active: number

  /**
   * Bootstrap Carousel plugin.
   */
  carousel: typeof CarouselPlugin | null

  /**
   * Determines the active item index.
   *
   * @param curr - Current array index
   */
  isActive(curr: number): boolean

  /**
   * Updates the active index state.
   */
  setActive: Dispatch<SetStateAction<number>>
}

/**
 * Initializes a Bootstrap carousel instance.
 *
 * @see https://v5.getbootstrap.com/docs/5.0/components/carousel/#via-javascript
 *
 * @param ref - HTML element to use as a carousel
 * @param options - Bootstrap carousel options
 * @param initialPosition - Index of the default active item
 */
export function useCarouselPlugin<E = HTMLElement>(
  ref: RefObject<E>,
  options?: CarouselOption,
  initialPosition: NullishNumber = 0
): UseCarouselPlugin {
  const [carousel, setCarousel] = useState<UseCarouselPlugin['carousel']>(null)

  const [active, setActive] = useState<UseCarouselPlugin['active']>(
    initialPosition || 0
  )

  /**
   * Determines the active item index.
   *
   * @param index - Current array index
   */
  const isActive = useCallback(
    (index: number): boolean => {
      return active !== 0 ? active === index : index === 0
    },
    [active]
  )

  useEffect(() => {
    // If missing HTML element, do nothing
    if (!ref.current || carousel) return

    // Create carousel w/ Bootstrap JS API
    setCarousel(new CarouselPlugin(ref.current, options))

    // Update active state when `carousel.slide` instance method is invoked
    const element = (ref.current as unknown) as HTMLElement
    element.addEventListener('slide.bs.carousel', event => {
      const slide = (event as unknown) as CarouselEventHandler<HTMLDivElement>
      setActive(slide.to)
    })

    return () => {
      // If defined, destroy carousel
      carousel && carousel.dispose()
    }
  }, [carousel, options, ref])

  return { active, carousel, isActive, setActive }
}
