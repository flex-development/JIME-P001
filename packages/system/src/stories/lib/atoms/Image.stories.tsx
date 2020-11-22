import { Image, ImageProps } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import React from 'react'

/**
 * @file Stories - Image
 * @module stories/lib/atoms/Image
 */

export default {
  component: Image,
  parameters: {
    jest: ['Image']
  },
  title: 'Library/Atoms/Image'
}

/**
 * Fluid {@link Image} story.
 */
export const Fluid: StoryFN<ImageProps> = (args: ImageProps) => (
  <Image {...args} />
)

Fluid.args = {
  alt: 'Picsum fluid image',
  fluid: true,
  src: 'https://picsum.photos/1920/1080'
}

/**
 * Thumbnail {@link Image} story.
 */
export const Thumbnail: StoryFN<ImageProps> = (args: ImageProps) => (
  <Image {...args} />
)

Thumbnail.args = {
  alt: 'Picsum thumbnail image',
  src: 'https://picsum.photos/400',
  style: {
    height: '400px',
    width: '400px'
  },
  thumbnail: true
}
