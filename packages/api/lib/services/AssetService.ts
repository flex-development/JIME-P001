import type { NumberString, OrNever } from '@flex-development/kustomzcore'
import { createError } from '@flex-development/kustomzcore'
import { readFileSync } from 'fs'
import { join } from 'path'
import sharp from 'sharp'

/**
 * @file Implementation - AssetService
 * @module lib/services/AssetService
 */

class AssetService {
  /**
   * @property {string} IMAGE_DIR_PATH - Path to `/images` directory
   */
  static IMAGE_DIR_PATH: string = '../../api/assets/images/_files'

  /**
   * Returns the filename extension.
   *
   * @param {string} filename - Filename to get extenstion from
   * @return {string} Filename extension (i.e webp, png, etc)
   */
  static ext(filename: string): string {
    const parts = filename.split('.')
    return parts[parts.length - 1]
  }

  /**
   * Retrieve an image from the `/assets/images/_files` directory.
   *
   * @param {string} filename - Filename of image to retrieve
   * @return {Buffer} Image file
   * @throws {FeathersErrorJSON}
   */
  static image(filename: string): OrNever<Buffer> {
    const $filename = join(__dirname, AssetService.IMAGE_DIR_PATH, filename)

    try {
      return readFileSync($filename)
    } catch (err) {
      const { code, errno, path, syscall } = err

      const data = {
        code,
        errno,
        errors: { $filename, filename },
        path,
        syscall
      }

      throw createError(err, data, code === 'ENOENT' ? 404 : 500)
    }
  }

  /**
   * Resizes an image.
   *
   * @async
   * @param {Buffer} image - Image to resize
   * @param {NumberString} [height] - Resized image height
   * @param {NumberString} [width] - Resized image width
   * @return {Promise<Buffer>} Promise containing resized image
   */
  static async resizeImage(
    image: Buffer,
    height?: NumberString,
    width?: NumberString
  ): OrNever<Promise<Buffer>> {
    const $height = typeof height === 'string' ? JSON.parse(height) : height
    const $width = typeof width === 'string' ? JSON.parse(width) : width

    return await sharp(image).resize($width, $height).toBuffer()
  }
}

export default AssetService
