import { useCarouselPlugin, useMutatedProps } from '@system/hooks'
import { uid } from '@system/utils'
import { CarouselOption } from 'bootstrap'
import classnames from 'classnames'
import React, { Children, FC, ReactElement, useRef } from 'react'
import uuid from 'react-uuid'
import { Box, BoxProps, Item, ItemProps, List } from '../atoms'

/**
 * @file Slideshow component for cycling through elements
 * @module lib/molecules/Carousel
 */

/**
 * `Carousel` component properties.
 */
export interface CarouselProps extends BoxProps, CarouselOption {
  /**
   * Components to render as `Carousel` items.
   */
  children: ReactElement[]

  /**
   * The amount of time to delay between automatically cycling an item. If
   * false, carousel will not automatically cycle.
   *
   * @default false
   */
  interval?: false | number

  /**
   * Indiciates if the carousel should react to keyboard events.
   *
   * @default true
   */
  keyboard?: boolean

  /**
   * If set to `hover`, pauses the cycling of the carousel on `mouseenter` and
   * resumes the cycling of the carousel on `mouseleave`.
   *
   * If set to `false`, hovering over the carousel won't pause it.
   *
   * On touch-enabled devices, when set to `hover`, cycling will pause on
   * `touchend` (once the user finished interacting with the carousel)
   * for two intervals, before automatically resuming. Note that this is in
   * addition to the above mouse behavior.
   *
   * @default 'hover'
   */
  pause?: 'hover' | false

  /**
   * Index position of the slide to display first.
   */
  position?: number

  /**
   * Autoplays the carousel after the user manually cycles the first item.
   * If `carousel`, autoplays the carousel on load.
   *
   * @default 'carousel'
   */
  ride?: 'carousel' | boolean

  /**
   * Use to easily control the position of the carousel. It accepts the keywords
   * prev or next, which alters the slide position relative to its current
   * position.
   *
   * Alternatively, use `data-slide-to` to pass a raw slide index to
   * the carousel.
   *
   * @default false
   */
  slide?: 'next' | 'prev' | false

  /**
   * If `true`, support left/right swipe interactions on touchscreen devices.
   *
   * @default true
   */
  touch?: boolean

  /**
   * Indicates if the carousel should cycle continuously or have hard stops.
   *
   * @default true
   */
  wrap?: boolean
}

export interface CarouselIndicatorProps extends ItemProps {
  /**
   * If `true`, add "active" class.
   */
  active?: boolean
}

export interface CarouseItemProps extends BoxProps {
  /**
   * If `true`, add "active" class.
   */
  active?: CarouselIndicatorProps['active']
}

const CarouselIndicator: FC<CarouselIndicatorProps> = (
  props: CarouselIndicatorProps
) => {
  const { active = false, ...rest } = props

  return (
    <Item
      {...rest}
      className={classnames('carousel-indicator', { active })}
      role='button'
    />
  )
}

const CarouselItem: FC<CarouseItemProps> = (props: CarouseItemProps) => {
  const { active = false, ...rest } = props

  return <Box {...rest} className={classnames('carousel-item', { active })} />
}

/**
 * Slideshow component for cycling through elements. Renders a `Box` component
 * with the class `carousel`.
 *
 * - https://v5.getbootstrap.com/docs/5.0/components/carousel
 */
export const Carousel: FC<CarouselProps> & {
  CarouselIndicator: typeof CarouselIndicator
  CarouselItem: typeof CarouselItem
} = (props: CarouselProps) => {
  const {
    children,
    interval,
    keyboard,
    pause,
    position,
    ride,
    slide,
    touch,
    wrap,
    ...rest
  } = props

  // Handle props and inject class
  const mutated = useMutatedProps<typeof rest>(rest, 'carousel')

  // Bootstrap carousels require an ID
  mutated.id = mutated.id || uid('carousel')

  // Carousel items - useMutatedProps converts props.children into an array
  const items = Children.toArray(children) as CarouselProps['children']

  // Ref to attach Bootstrap Carousel to
  const ref = useRef<HTMLDivElement | null>(null)

  // Initialize Bootstrap Carousel plugin
  const { isActive, setActive } = useCarouselPlugin<HTMLDivElement>(
    ref,
    { interval, keyboard, pause, ride, slide, touch, wrap },
    position && position >= 0 && position <= items.length - 1 ? position : null
  )

  return (
    <Box {...mutated} ref={ref}>
      <Box className='carousel-inner'>
        {items.map((child: ReactElement, i: number) => (
          <CarouselItem
            active={isActive(i)}
            key={uuid()}
            onClick={() => setActive(i)}
          >
            {child}
          </CarouselItem>
        ))}
      </Box>
      <List className='carousel-indicators' is='ol'>
        {items.map((child: ReactElement, i: number) => (
          <CarouselIndicator
            active={isActive(i)}
            key={uuid()}
            onClick={() => setActive(i)}
          />
        ))}
      </List>
    </Box>
  )
}

Carousel.CarouselIndicator = CarouselIndicator
Carousel.CarouselItem = CarouselItem

Carousel.defaultProps = {
  children: [],
  interval: false,
  keyboard: true,
  pause: 'hover',
  ride: 'carousel',
  slide: false,
  touch: true,
  wrap: true
}
