import { AddToCartForm, AddToCartFormProps } from '@kustomz/lib'
import React from 'react'
import products from '../../../../__mocks__/products.mock.json'
import { StoryFN } from '../../../config'

/**
 * @file Stories - AddToCartForm
 * @module stories/lib/molecules/AddToCartForm
 */

export default {
  component: AddToCartForm,
  parameters: {
    jest: ['AddToCartForm']
  },
  title: 'Library/Molecules/AddToCartForm'
}

export const AshTray: StoryFN<AddToCartFormProps> = (
  args: AddToCartFormProps
) => <AddToCartForm {...args} />

const ashtray_data = Object.assign(
  {},
  products.find(p => {
    return p.handle === 'ash-tray'
  })
)

AshTray.args = {
  description:
    'Migas non put a bird on it, quinoa mollit fanny pack qui blue bottle pickled dreamcatcher. Snackwave prism pork belly authentic velit sint, disrupt leggings sartorial incididunt. Fingerstache tempor coloring book, consequat next level migas bespoke tacos authentic anim commodo fugiat air plant. PBR&B nulla pok pok taxidermy nisi lumbersexual synth.',
  product_title: ashtray_data.title,
  style: {
    maxWidth: '900px'
  },
  variants: ashtray_data.variants
}

export const Kustomz: StoryFN<AddToCartFormProps> = (
  args: AddToCartFormProps
) => <AddToCartForm {...args} />

const kustomz_data = Object.assign(
  {},
  products.find(p => {
    return p.handle === 'kustomz'
  })
)

Kustomz.storyName = 'KUSTOMZ'
Kustomz.args = {
  description:
    'Brunch dolore kinfolk, butcher locavore jean shorts sed photo booth distillery kitsch occaecat hammock slow-carb live-edge. Pok pok minim asymmetrical raw denim, VHS lorem bitters cliche bicycle rights flannel sartorial dolore ut affogato. Qui in before they sold out lo-fi lorem pour-over voluptate poutine photo booth actually flexitarian trust fund messenger bag.',
  product_title: kustomz_data.title,
  style: {
    maxWidth: '900px'
  },
  variants: kustomz_data.variants
}

export const RollingTray: StoryFN<AddToCartFormProps> = (
  args: AddToCartFormProps
) => <AddToCartForm {...args} />

const rolling_tray_data = Object.assign(
  {},
  products.find(p => {
    return p.handle === 'rolling-tray'
  })
)

RollingTray.args = {
  description:
    'Tousled humblebrag blog unicorn, raclette magna selfies reprehenderit ut do roof party bicycle rights. Celiac sunt qui, duis truffaut sustainable kombucha. Lomo occaecat brunch gochujang mollit post-ironic shoreditch sriracha adaptogen authentic mustache ugh ut. Veniam raw denim asymmetrical green juice.',
  product_title: rolling_tray_data.title,
  style: {
    maxWidth: '900px'
  },
  variants: rolling_tray_data.variants
}
