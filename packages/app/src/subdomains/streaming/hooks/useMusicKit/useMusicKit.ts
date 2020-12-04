import { AnyObject } from '@flex-development/json'
import { MusicKitInstance } from '@flex-development/kustomzcore'
import { createDeveloperToken } from '@subdomains/streaming/utils'
import { useEffect, useState } from 'react'
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
  const [instance, setInstance] = useState<UseMusicKit>({})

  // Configure MusicKit and get instance
  useEffect(() => {
    if (!MusicKit) return

    const new_instance: UseMusicKit = MusicKit.configure({
      app: { name: pkg.name, version: pkg.version },
      developerToken: createDeveloperToken()
    })

    setInstance(new_instance)
  }, [])

  return instance
}
