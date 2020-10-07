import { StoryFN } from '@kustomz-config/index'
import { Carousel, CarouselProps, Image } from '@kustomz/lib'
import React from 'react'

/**
 * @file Stories - Carousel
 * @module stories/lib/organisms/Carousel
 */

export default {
  args: {
    style: {
      maxHeight: '600px',
      maxWidth: '438px'
    }
  },
  argTypes: {
    children: { control: 'array' }
  },
  component: Carousel,
  parameters: {
    jest: ['Carousel']
  },
  title: 'Library/Organisms/Carousel'
}

const images = [
  <Image
    alt='Ash Tray - FUNFETTI'
    className='d-block w-100'
    src='assets/ash-tray-funfetti.png'
  />,
  <Image
    alt='Ash Tray - JELLY $LIDES'
    className='d-block w-100'
    src='assets/ash-tray-jelly-slides.png'
  />
]

export const Default: StoryFN<CarouselProps> = (args: CarouselProps) => (
  <Carousel {...args} />
)

Default.args = {
  children: images
}

export const Manual: StoryFN<CarouselProps> = (args: CarouselProps) => (
  <Carousel {...args} />
)

Manual.args = {
  children: images,
  interval: false,
  position: images.length - 1
}
