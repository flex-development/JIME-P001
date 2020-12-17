import { AnyObject } from '@flex-development/json'
import { MusicKitInstance } from '@flex-development/kustomzcore'
import { useMemoCompare } from '@flex-development/kustomzdesign'
import { createDeveloperToken } from '@subdomains/streaming/utils'
import { isEmpty } from 'lodash'
import { useEffect, useRef } from 'react'
import pkg from '../../../../../package.json'

/**
 * @file Get Apple Music Kit instance
 * @module subdomains/streaming/hooks/useMusicKit/impl
 */

/**
 * `useMusicKit` return type.
 */
export type UseMusicKit = MusicKitInstance | AnyObject

/**
 * Returns an Apple Music kit instance.
 *
 * @see https://developer.apple.com/documentation/musickitjs/
 */
export const useMusicKit = (): UseMusicKit => {
  const instance = useRef<UseMusicKit>({})
  const _instance = useMemoCompare<typeof instance['current']>(instance.current)

  // Configure MusicKit and get instance
  useEffect(() => {
    // If MusicKit module isn't loaded or instance is already set, do nothing
    if (!window?.MusicKit || !isEmpty(_instance)) return

    // Configure new MusicKit instance
    instance.current = window.MusicKit.configure({
      app: { name: pkg.name, version: pkg.version },
      developerToken: createDeveloperToken()
    })
  }, [_instance])

  return _instance
}
