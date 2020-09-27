import { Image, ImageProps } from '@kustomz/lib'
import React from 'react'
import { StoryFN } from '../../../../.storybook/config'

/**
 * @file Stories - Image
 * @module stories/lib/atoms/Image
 */

export default {
  component: Image,
  title: 'Library/Atoms/Image'
}

/**
 * Fluid {@link Image} story.
 */
export const Fluid: StoryFN<ImageProps> = (args: ImageProps) => (
  <Image {...args} />
)

Fluid.args = {
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
  thumbnail: true
}
