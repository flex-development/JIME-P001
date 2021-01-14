import { BoxProps } from '@system/lib/atoms/Box'
import { ReactElement } from 'react'

/**
 * @file Component Props - Carousel
 * @module lib/molecules/Carousel/impl
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
