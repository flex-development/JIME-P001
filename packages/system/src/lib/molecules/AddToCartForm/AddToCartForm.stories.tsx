import ASH_TRAY from '@system/tests/fixtures/api/products/ash-tray'
import KUSTOMZ from '@system/tests/fixtures/api/products/kustomz'
import ROLLING_TRAY from '@system/tests/fixtures/api/products/rolling-tray'
import { AddToCartForm } from './AddToCartForm'
import type { AddToCartFormProps } from './AddToCartForm.props'

/**
 * @file Stories - AddToCartForm
 * @module lib/molecules/AddToCartForm/stories
 */

export default {
  args: {
    style: {
      maxWidth: '1362px'
    }
  },
  component: AddToCartForm,
  parameters: {
    jest: ['AddToCartForm', 'Form']
  },
  title: 'Library/Molecules/AddToCartForm'
}

export const AshTray: FCS<AddToCartFormProps> = args => (
  <AddToCartForm {...args} />
)

AshTray.args = {
  product: ASH_TRAY
}

export const Kustomz: FCS<AddToCartFormProps> = args => (
  <AddToCartForm {...args} />
)

Kustomz.storyName = 'KUSTOMZ'
Kustomz.args = {
  product: KUSTOMZ
}

export const RollingTray: FCS<AddToCartFormProps> = args => (
  <AddToCartForm {...args} />
)

RollingTray.args = {
  product: ROLLING_TRAY
}
