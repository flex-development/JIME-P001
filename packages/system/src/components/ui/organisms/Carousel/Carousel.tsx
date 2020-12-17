import { AnyObject } from '@flex-development/json'
import {
  Box,
  BoxProps,
  FlexBox,
  Span,
  SpanProps
} from '@system/components/ui/atoms'
import { useActiveIndex, useSanitizedProps } from '@system/hooks'
import classnames from 'classnames'
import { chunk } from 'lodash'
import { Children, FC, ReactElement, useCallback } from 'react'

/**
 * @file Slideshow component for cycling through elements
 * @module components/ui/organisms/Carousel/impl
 */

export interface CarouselProps extends BoxProps {
  /**
   * Components to render as `Carousel` items.
   */
  children: ReactElement[]

  /**
   * If defined, maximum number of slides to show in a group.
   */
  chunk_max?: number

  /**
   * Index position of the slide to display first.
   *
   * @default 0
   */
  position?: number
}

export interface CarouselIndicatorProps extends SpanProps {
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
    <Span
      {...rest}
      aria-label='Carousel indicator'
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
 * Slideshow component for cycling through elements.
 *
 * Renders a `Box` component with the class `carousel`.
 *
 * - https://v5.getbootstrap.com/docs/5.0/components/carousel
 */
export const Carousel: FC<CarouselProps> & {
  CarouselIndicator: typeof CarouselIndicator
  CarouselItem: typeof CarouselItem
} = (props: CarouselProps) => {
  const { children, chunk_max, position, ...rest } = props

  // Handle props and inject class
  const sanitized = useSanitizedProps<typeof rest>(rest, 'carousel')

  // Get carousel items
  const items = Children.toArray(children) as CarouselProps['children']
  const chunk_items = chunk(items, chunk_max || 1)
  const items_adaptor = (chunk_max ? chunk_items : items) as Array<AnyObject>

  // Handle active carousel item index
  const { isActive, setIndex } = useActiveIndex(position, {
    upperLimit: items.length - 1
  })

  const onClickItem = useCallback((i: number) => setIndex(i), [setIndex])

  return (
    <Box {...sanitized}>
      <Box className='carousel-inner'>
        {(() => {
          if (chunk_max) {
            return chunk_items.map((chunk: ReactElement[], i: number) => {
              const active = chunk_items.length === 1 || isActive(i)

              return (
                <CarouselItem
                  active={active}
                  flex={active}
                  key={`carousel-item-${i}`}
                  onClick={() => onClickItem(i)}
                >
                  {chunk}
                </CarouselItem>
              )
            })
          }

          return items.map((child: ReactElement, i: number) => (
            <CarouselItem
              active={items.length === 1 || isActive(i)}
              key={`carousel-item-${i}`}
              onClick={() => onClickItem(i)}
            >
              {child}
            </CarouselItem>
          ))
        })()}
      </Box>
      {items_adaptor.length > 1 && (
        <FlexBox className='carousel-indicators'>
          {items_adaptor.map((child, i: number) => (
            <CarouselIndicator
              active={isActive(i)}
              key={`carousel-indicator-${i}`}
              onClick={() => onClickItem(i)}
            />
          ))}
        </FlexBox>
      )}
    </Box>
  )
}

Carousel.CarouselIndicator = CarouselIndicator
Carousel.CarouselItem = CarouselItem

Carousel.displayName = 'Carousel'

Carousel.defaultProps = {
  children: [],
  position: 0
}
