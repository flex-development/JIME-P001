import { useActiveIndex } from '@system/hooks/useActiveIndex'
import { useSanitizedProps } from '@system/hooks/useSanitizedProps'
import { Box, BoxProps } from '@system/lib/atoms/Box'
import { Span } from '@system/lib/atoms/Span'
import classnames from 'classnames'
import chunk from 'lodash/chunk'
import { Children, FC, ReactElement, useCallback } from 'react'
import type { CarouselProps } from './Carousel.props'

/**
 * @file Implementation - Carousel
 * @module lib/molecules/Carousel/impl
 */

/**
 * Slideshow component for cycling through elements.
 * Renders a `Box` component with the class `carousel`.
 */
export const Carousel: FC<CarouselProps> = props => {
  const { children = [], chunk_max, max, position, ...rest } = props

  // Handle props and inject class
  const sanitized = useSanitizedProps<'div', BoxProps>(rest, 'carousel')

  // Get carousel items
  const items = Children.toArray(children) as ReactElement[]
  const chunk_items = chunk(items, chunk_max || 1)

  // Decide if chunked items array should be used and limit number of slides
  let $items = (chunk_max ? chunk_items : items) as ReactElement[]
  $items = $items.slice(0, max || $items.length)

  // Handle active carousel item index
  const { isActive, setIndex } = useActiveIndex(position, {
    upperLimit: items.length - 1
  })

  /**
   * Updates the active carousel item.
   *
   * @param {number} i - Index of active carousel item
   * @return {void}
   */
  const onClickItem = useCallback((i: number) => setIndex(i), [setIndex])

  return (
    <Box {...sanitized} data-chunk-max={chunk_max}>
      <Box className='carousel-inner'>
        {(() => {
          return $items.map((child: ReactElement, i: number) => (
            <Box
              className={classnames('carousel-item', { active: isActive(i) })}
              key={`carousel-item-${i}`}
              onClick={() => onClickItem(i)}
            >
              {child}
            </Box>
          ))
        })()}
      </Box>

      {$items.length > 1 && (
        <Box className='carousel-indicators'>
          {$items.map((child, i: number) => (
            <Span
              aria-label='Carousel indicator'
              className={classnames('carousel-indicator', {
                active: isActive(i)
              })}
              key={`carousel-indicator-${i}`}
              onClick={() => onClickItem(i)}
              role='button'
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

Carousel.displayName = 'Carousel'

Carousel.defaultProps = {
  children: [],
  position: 0
}
