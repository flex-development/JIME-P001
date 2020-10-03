import { AddToCartForm, AddToCartFormProps } from '@kustomz/lib'
import React from 'react'
import { ProductVariant } from 'shopify-buy'
import products from '../../../../__mocks__/products.mock.json'
import { StoryFN } from '../../../config'

/**
 * @file Stories - AddToCartForm
 * @module stories/lib/molecules/AddToCartForm
 */

export default {
  component: AddToCartForm,
  excludeStories: ['AshTrayData', 'KustomzData', 'RollingTrayData'],
  parameters: {
    jest: ['AddToCartForm']
  },
  title: 'Library/Molecules/AddToCartForm'
}

export const AshTray: StoryFN<AddToCartFormProps> = (
  args: AddToCartFormProps
) => <AddToCartForm {...args} />

export const AshTrayData = Object.assign(
  {},
  products.find(p => {
    return p.title === 'Ash Tray'
  })
)

AshTray.args = {
  description:
    'Migas non put a bird on it, quinoa mollit fanny pack qui blue bottle pickled dreamcatcher. Snackwave prism pork belly authentic velit sint, disrupt leggings sartorial incididunt. Fingerstache tempor coloring book, consequat next level migas bespoke tacos authentic anim commodo fugiat air plant. PBR&B nulla pok pok taxidermy nisi lumbersexual synth.',
  style: {
    maxWidth: '900px'
  },
  variants: (AshTrayData.variants as unknown) as Partial<ProductVariant>[]
}

export const Kustomz: StoryFN<AddToCartFormProps> = (
  args: AddToCartFormProps
) => <AddToCartForm {...args} />

export const KustomzData = Object.assign(
  {},
  products.find(p => {
    return p.title === 'KUSTOMZ'
  })
)

Kustomz.storyName = 'KUSTOMZ'
Kustomz.args = {
  description:
    'Brunch dolore kinfolk, butcher locavore jean shorts sed photo booth distillery kitsch occaecat hammock slow-carb live-edge. Pok pok minim asymmetrical raw denim, VHS lorem bitters cliche bicycle rights flannel sartorial dolore ut affogato. Qui in before they sold out lo-fi lorem pour-over voluptate poutine photo booth actually flexitarian trust fund messenger bag.',
  style: {
    maxWidth: '900px'
  },
  variants: (KustomzData.variants as unknown) as Partial<ProductVariant>[]
}

export const RollingTray: StoryFN<AddToCartFormProps> = (
  args: AddToCartFormProps
) => <AddToCartForm {...args} />

export const RollingTrayData = Object.assign(
  {},
  products.find(p => {
    return p.title === 'Rolling Tray'
  })
)

RollingTray.args = {
  description:
    'Tousled humblebrag blog unicorn, raclette magna selfies reprehenderit ut do roof party bicycle rights. Celiac sunt qui, duis truffaut sustainable kombucha. Lomo occaecat brunch gochujang mollit post-ironic shoreditch sriracha adaptogen authentic mustache ugh ut. Veniam raw denim asymmetrical green juice.',
  style: {
    maxWidth: '900px'
  },
  variants: (RollingTrayData.variants as unknown) as Partial<ProductVariant>[]
}
