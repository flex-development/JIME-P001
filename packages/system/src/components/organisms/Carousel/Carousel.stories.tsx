import { REVIEWS } from '@system-mocks/utils'
import { ProductReview } from '@system/components'
import { StoryFN } from '@system/types/storybook'
import { Carousel, CarouselProps } from './Carousel'

/**
 * @file Stories - Carousel
 * @module components/organisms/Carousel/stories
 */

export default {
  argTypes: {
    children: { control: 'array' }
  },
  component: Carousel,
  parameters: {
    jest: ['Carousel', 'useActiveIndex']
  },
  title: 'Library/Organisms/Carousel'
}

export const ProductReviews: StoryFN<CarouselProps> = (args: CarouselProps) => (
  <Carousel {...args} />
)

ProductReviews.args = {
  children: REVIEWS.map(review => (
    <ProductReview review={review} key={`review-${review.id}`} />
  )),
  position: REVIEWS.length - 3,
  style: {
    maxWidth: '1362px'
  }
}
