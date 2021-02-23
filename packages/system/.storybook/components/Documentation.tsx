import {
  ArgsTable,
  Canvas,
  Description,
  DocsContext,
  Heading,
  Story,
  Subtitle,
  Title
} from '@storybook/addon-docs/blocks'
import type { FC } from 'react'

/**
 * @file Custom Storybook Docs page
 * @module storybook/components/Documentation
 */

export const Documentation: FC<typeof DocsContext> = () => {
  return (
    <DocsContext.Consumer>
      {ctx => {
        const { kind, parameters, storyStore } = ctx
        const { component } = parameters
        const { __docgenInfo, displayName } = component

        const stories = storyStore.getStoriesForKind(kind)

        console.debug({ 'DocsContext.Consumer': ctx })
        console.debug({ 'DocsContext.Consumer': stories })

        return (
          <>
            <Title>{displayName}</Title>
            <Description markdown={__docgenInfo.description} />
            <ArgsTable of={component} />

            <Heading>Usage</Heading>
            <br />
            {stories.map(({ id, name }) => {
              return (
                <>
                  <Subtitle>{name}</Subtitle>
                  <Canvas>
                    <Story id={id} />
                  </Canvas>
                </>
              )
            })}
          </>
        )
      }}
    </DocsContext.Consumer>
  )
}
