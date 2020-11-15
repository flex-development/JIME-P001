import { ANYTHING } from '@flex-development/kustomzdesign/types'
import firebase from 'firebase/app'
import { orderBy } from 'lodash'
import {
  Media,
  MediaList,
  MediaListOptions,
  MediaStore,
  MediaUploadOptions
} from 'tinacms'

/**
 * @file Firebase Media Store
 * @module subdomains/cms/models/FirebaseMediaStore
 * @see https://tinacms.org/docs/media
 */

export class FirebaseMediaStore implements MediaStore {
  /**
   * `<input>` element `accept` value indicating the type of files the Media
   * Store will accept.
   *
   * @see
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
   */
  accept = '*'

  /**
   * Reference to `public/images` directory in Storage Bucket.
   */
  public: firebase.storage.Reference

  /**
   * Cloud storage service.
   */
  storage: firebase.storage.Storage

  /**
   * Creates a Firebase media store instance.
   *
   * A reference to the Firebase Storage service will be retrieved and used to
   * create a reference to the `public/images` directory in the storage bucket.
   *
   * @param storage - Firebase Storage service module
   */
  constructor(storage: firebase.storage.Storage) {
    this.storage = storage
    this.public = this.storage.ref().child('public/images')
  }

  /**
   * Converts a file or subfolder reference to a TinaCMS `Media` object.
   *
   * @param reference - File or subfolder reference to convert
   * @param reference.fullPath - The full path of file or folder
   * @param reference.name - Name of file (including extension) or folder
   * @param subfolder - True if {@param reference} is reference to subfolder
   * @returns Media object
   */
  static async normalizeMedia(
    reference: firebase.storage.Reference,
    subfolder = false
  ): Promise<Media> {
    const { fullPath, name } = reference
    const media = { filename: name, id: fullPath } as Media

    if (subfolder) {
      media.directory = '/'
      media.type = 'dir'
    } else {
      media.directory = fullPath
      media.previewSrc = await reference.getDownloadURL()
      media.type = 'file'
    }

    return media
  }

  /**
   * Remove a file from the media store.
   *
   * @param media - Media to remove
   * @returns Empty promise
   */
  async delete({ directory }: Media): Promise<void> {
    return await this.public.child(directory.replace('public/', '')).delete()
  }

  /**
   * Lists all files in a specific directory.
   *
   * @async
   * @param options - Media list options
   * @param options.directory - Directory to find files
   * @param options.limit - Number of files to retrieve
   * @param options.offset - Position to begin listing files
   * @returns Object containing files, number of files, and pagination offsets
   */
  async list({ directory: dir }: MediaListOptions = {}): Promise<MediaList> {
    // Get reference to directory of files to list
    const directory_ref = dir ? this.public.child(dir) : this.public

    // Get results
    const result = await directory_ref.listAll()
    const { items: file_refs, prefixes: subfolder_refs } = result

    // Get media objects
    const items: Media[] = []

    // Convert files to media objects
    await Promise.all(
      file_refs.map(async ref => {
        items.push(await FirebaseMediaStore.normalizeMedia(ref))
      })
    )

    // Convert subfolders to media objects
    await Promise.all(
      subfolder_refs.map(async ref => {
        items.push(await FirebaseMediaStore.normalizeMedia(ref, true))
      })
    )

    return {
      items: orderBy(items, ['filename']),
      limit: items.length,
      offset: 0,
      totalCount: items.length
    }
  }

  /**
   * Uploads a batch of files to the media store and returns an array containing
   * the uploaded items.
   *
   * @param files - Files to upload
   * @returns Array of uploaded files
   */
  async persist(files: MediaUploadOptions[]): Promise<Media[]> {
    return Promise.all(files.map(async file => this.uploadFile(file)))
  }

  /**
   * Returns the URL to preview a file.
   *
   * @param src - Media source URL
   * @param fieldPath - Form path where media is being used
   * @param formValues - Current form values
   * @returns Media preview URL
   */
  previewSrc(src: string, fieldPath?: string, formValues?: ANYTHING): string {
    console.debug(src, fieldPath, formValues)
    return src
  }

  /**
   * Upload a file.
   *
   * @see https://firebase.google.com/docs/storage/web/upload-files
   *
   * @async
   * @param media - Media upload settings
   * @param media.directory - Directory where file should be uploaded
   * @param media.file - File to upload
   * @returns Uploaded file as Media object
   */
  async uploadFile(media: MediaUploadOptions): Promise<Media> {
    const { directory: dir, file } = media

    const ref = this.public.child(`${dir}/${file.name}`)
    const task = await ref.put(file, { contentType: file.type })

    return await FirebaseMediaStore.normalizeMedia(task.ref)
  }
}
