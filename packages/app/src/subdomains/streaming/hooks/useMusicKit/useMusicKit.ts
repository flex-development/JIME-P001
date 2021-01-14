import { AnyObject } from '@flex-development/json/utils/types'
import { MusicKitInstance } from '@flex-development/kustomzcore/types/musickit'
import { useMemoCompare } from '@hooks/useMemoCompare'
import lernaconf from '@lerna-config'
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
    if (!window?.MusicKit || !Object.keys(_instance).length) return

    // Configure new MusicKit instance
    instance.current = window.MusicKit.configure({
      app: { name: pkg.name, version: lernaconf.version },
      developerToken: process.env.APPLE_DEVELOPER_TOKEN
    })
  }, [_instance])

  return _instance
}
