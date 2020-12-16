import { ligatures as children } from '@system/config'
import { StoryFN } from '@system/types/storybook'
import { Icon, IconProps } from './Icon'

/**
 * @file Stories - Icon
 * @module components/ui/atoms/Icon/stories
 */

export default {
  argTypes: { children },
  component: Icon,
  parameters: {
    jest: ['Icon']
  },
  title: 'Library/Atoms/Icon'
}

export const Bootstrap: StoryFN<IconProps> = (args: IconProps) => (
  <Icon {...args} />
)

Bootstrap.args = {
  bi: 'bootstrap-fill',
  c: 'primary',
  className: 'd-inline-flex text-lg'
}

export const FontAwesome: StoryFN<IconProps> = (args: IconProps) => (
  <Icon {...args} />
)

FontAwesome.args = {
  c: 'secondary',
  fa: 'spinner fas fa-spin'
}

export const Material: StoryFN<IconProps> = (args: IconProps) => (
  <Icon {...args} />
)

Material.args = {
  c: 'light',
  mat: 'search'
}
