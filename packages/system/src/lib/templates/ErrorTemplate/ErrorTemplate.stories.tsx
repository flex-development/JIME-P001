import { Link, Paragraph } from '@system/lib/atoms'
import { ErrorTemplate } from './ErrorTemplate'
import type { ErrorTemplateProps } from './ErrorTemplate.props'

/**
 * @file Stories - ErrorTemplate
 * @module lib/templates/ErrorTemplate/stories
 */

export default {
  component: ErrorTemplate,
  parameters: {
    jest: ['ErrorTemplate']
  },
  title: 'Library/Templates/ErrorTemplate'
}

export const NotFound: FCS<ErrorTemplateProps> = args => (
  <ErrorTemplate {...args} />
)

NotFound.storyName = '404'
NotFound.args = {
  children: (
    <Paragraph>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      Go <Link>home</Link> and smoke or something.
    </Paragraph>
  ),
  code: 404,
  message: "Sorry, the page you're looking for does not exist."
}
