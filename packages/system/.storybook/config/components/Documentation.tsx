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
import React from 'react'
import { excludePropKeys } from '..'
import { sortByKeys } from '../../../src'

/**
 * @file Custom Storybook Docs page
 * @module storybook/config/components/Documentation
 */

export const Documentation = () => {
  return (
    <DocsContext.Consumer>
      {ctx => {
        const { kind, parameters, storyStore } = ctx
        const { component } = parameters
        const { __docgenInfo, displayName } = component

        const stories = storyStore.getStoriesForKind(kind)

        component.__docgenInfo.props = sortByKeys(__docgenInfo.props)

        console.debug({ 'DocsContext.Consumer': ctx })
        console.debug({ 'DocsContext.Consumer': stories })

        return (
          <>
            <Title>{displayName}</Title>
            <Description markdown={__docgenInfo.description} />
            <ArgsTable exclude={excludePropKeys} of={component} />

            <Heading>Usage</Heading>
            <br />
            {stories.map(({ id, name }) => {
              return (
                <>
                  <Subtitle>{name}</Subtitle>
                  {/* @ts-expect-error */}
                  <Canvas id={id}>
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
