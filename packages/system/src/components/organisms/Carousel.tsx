import { useActiveIndex, useMutatedProps } from '@system/hooks'
import classnames from 'classnames'
import React, { Children, FC, ReactElement } from 'react'
import { Box, BoxProps, Item, ItemProps, List } from '../atoms'

/**
 * @file Slideshow component for cycling through elements
 * @module components/organisms/Carousel
 */

export interface CarouselProps extends BoxProps {
  /**
   * Components to render as `Carousel` items.
   */
  children: ReactElement[]

  /**
   * Index position of the slide to display first.
   *
   * @default 0
   */
  position?: number
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
  const { children, position, ...rest } = props

  // Handle props and inject class
  const mutated = useMutatedProps<typeof rest>(rest, 'carousel')

  // Get carousel items
  const items = Children.toArray(children) as CarouselProps['children']

  // Handle active carousel item index
  const { isActive, setIndex } = useActiveIndex(position, {
    upperLimit: items.length - 1
  })

  return (
    <Box {...mutated}>
      <Box className='carousel-inner'>
        {items.map((child: ReactElement, i: number) => (
          <CarouselItem
            active={items.length === 1 || isActive(i)}
            key={`carousel-item-${i}`}
            onClick={() => setIndex(i)}
          >
            {child}
          </CarouselItem>
        ))}
      </Box>
      {items.length > 1 && (
        <List className='carousel-indicators' is='ol'>
          {items.map((child: ReactElement, i: number) => (
            <CarouselIndicator
              active={isActive(i)}
              key={`carousel-indicator-${i}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </List>
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
