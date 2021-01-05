import { Image } from './Image'
import { ImageProps } from './Image.props'

/**
 * @file Stories - Image
 * @module lib/atoms/Image/stories
 */

export default {
  component: Image,
  parameters: {
    jest: ['Image']
  },
  title: 'Library/Atoms/Image'
}

export const Default: FCS<ImageProps> = args => <Image {...args} />

Default.args = {
  alt: 'Picsum image',
  src: 'https://picsum.photos/480/480'
}

export const Fluid: FCS<ImageProps> = args => <Image {...args} />

Fluid.args = {
  $fluid: true,
  alt: 'Picsum fluid image',
  src: 'https://picsum.photos/1920/1080'
}
