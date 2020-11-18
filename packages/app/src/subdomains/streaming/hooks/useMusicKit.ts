import { AnyObject, MusicKitInstance } from '@flex-development/types'
import { useEffect, useState } from 'react'
import pkg from '../../../../package.json'
import { createDeveloperToken } from '../utils'

/**
 * @file Get Apple Music Kit instance
 * @module subdomains/streaming/hooks/useMusicKit
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
  const [instance, setInstance] = useState<UseMusicKit>({})

  // Configure MusicKit and get instance
  useEffect(() => {
    if (!MusicKit) return

    const new_instance: UseMusicKit = MusicKit.configure({
      app: { build: pkg.version, name: pkg.name },
      developerToken: createDeveloperToken()
    })

    setInstance(new_instance)
  }, [])

  return instance
}
