import {isBoolean, omit} from 'lodash'
import React, {useEffect, useState} from 'react'
import {Container, ContainerProps} from '../../components'
import {GlobalProps} from '../../declarations'

/**
 * @file Render props.children in a Container component
 * @module hooks/useContainer
 *
 * @see {@link https://reactjs.org/docs/hooks-reference.html#usestate}
 * @see {@link https://reactjs.org/docs/hooks-reference.html#useeffect}
 */

/**
 * Renders {@param props.children} in a {@link Container} component.
 *
 * @param props - Component properties
 * @param props.children - Inner content
 * @param props.container - Boolean or Container component properties
 */
export const useContainer = (props: GlobalProps): GlobalProps => {
  const {children, container: initialContainer = false} = props

  const containerProps = isBoolean(initialContainer) ? {} : initialContainer

  const [skip] = useState(!initialContainer)
  const [mutatedChildren, setMutatedChildren] = useState(children)
  const [container] = useState(JSON.stringify(containerProps))

  useEffect(() => {
    // Skip hook logic
    if (skip) return

    // Parse container state
    const containerParsed: ContainerProps = JSON.parse(container)

    // Update state
    setMutatedChildren(<Container {...containerParsed}>{children}</Container>)
  }, [children, container, skip])

  return {...omit(props, ['container']), children: mutatedChildren}
}
