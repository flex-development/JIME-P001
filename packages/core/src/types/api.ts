import type { Hit, SearchOptions } from '@algolia/client-search'
import type { AnyObject } from '@flex-development/json'
import type {
  Playlist as AppleMusicPlaylist,
  PlaylistAttributes as AppleMusicPlaylistAttributes,
  SongAttributes
} from './apple-music'
import type { JudgeMeReview, JudgeMeReviewCreateParams } from './reviews'
import type {
  ICollectionListing,
  IMenu,
  IMenuLink,
  IMetafield,
  IPage,
  IPolicy,
  IProductListing,
  IProductListingVariant
} from './shopify'
import type { SEOData } from './storefront'
import type { NumberString } from './utils'

/**
 * @file Type Definitions - KAPI
 * @module types/api
 */

/**
 * Shape of JSON responses from various endpoints.
 *
 * NOTICE: For endpoints that return arrays, the appropriate array documentation
 * should be used. Array types for these endpoints are not in this namespace.
 */
export namespace APIPayload {
  export interface Collection extends Partial<TObject.Collection> {
    collection_id: ICollectionListing['collection_id']
    objectID: ICollectionListing['handle']
    seo?: SEOData
  }

  export type Layout = {
    hero: { subtitle: string; title: string }
    playlist: Playlist
    seo: SEOData
    sidebar: {
      age: number
      img: string
      location: string
      menu: IMenuLink[]
      mood: string
    }
  }

  export interface Menu extends Partial<TObject.Menu> {
    objectID: IMenu['handle']
  }

  export interface Page extends Partial<TObject.Page> {
    id: IPage['id']
    objectID: IPage['handle']
    seo?: SEOData
  }

  export type Playlist = {
    attributes: Pick<AppleMusicPlaylistAttributes, 'name' | 'url'>
    id: AppleMusicPlaylist['id']
    tracks: SongAttributes[]
  }

  export interface Policy extends Partial<TObject.Policy> {
    objectID: IPolicy['handle']
    seo?: SEOData
  }

  export interface Product extends Partial<TObject.Product> {
    objectID: IProductListing['handle']
    product_id: IProductListing['product_id']
    seo?: SEOData
  }
}

/**
 * Shape of query parameters accepted by various endpoints.
 */
export namespace APIQuery {
  export namespace Collection {
    export interface Find extends SearchIndex {
      collection_id?: ICollectionListing['collection_id']
    }

    export interface Get extends SearchIndexObject {
      objectID: ICollectionListing['handle']
    }
  }

  export namespace Menu {
    export type Find = SearchIndex

    export interface Get extends SearchIndexObject {
      objectID: IMenu['handle']
    }
  }
  export namespace Page {
    export interface Find extends SearchIndex {
      author?: IPage['author']
      id?: IPage['id']
    }

    export interface Get extends SearchIndexObject {
      objectID: IPage['handle']
    }
  }

  export namespace Policy {
    export type Find = SearchIndex

    export interface Get extends SearchIndexObject {
      objectID: IPolicy['handle']
    }
  }

  export namespace Playlist {
    export type Get = SearchIndexObject
  }
  export namespace Product {
    export interface Find extends SearchIndex {
      product_id?: IProductListing['product_id']
    }

    export interface Get extends SearchIndexObject {
      objectID: IProductListing['handle']
      sku?: IProductListingVariant['sku']
    }
  }

  export namespace Review {
    export interface Find extends SearchIndex {
      created_at?: JudgeMeReview['created_at']
      curated?: JudgeMeReview['curated']
      featured?: JudgeMeReview['featured']
      hidden?: JudgeMeReview['hidden']
      id?: JudgeMeReview['id']
      ip_address?: JudgeMeReview['ip_address']
      product_id?: JudgeMeReview['product_id']
      reviewer_id?: JudgeMeReview['reviewer_id']
      source?: JudgeMeReview['source']
      updated_at?: JudgeMeReview['updated_at']
      verified?: JudgeMeReview['verified']
    }
  }

  export interface SearchIndex extends PaginationSearchOptions {
    /**
     * Comma-separated list of property fields to show.
     */
    fields?: string

    /**
     * Set the number of hits to retrieve.
     */
    limit?: SearchOptions['length']

    /**
     * Find resource by search index objectID.
     */
    objectID?: Hit<AnyObject>['objectID']

    /**
     * Text to query search index.
     */
    text?: SearchOptions['query']
  }

  export type SearchIndexObject = {
    fields?: SearchIndex['fields']
    objectID: NumberString
  }
}

/**
 * Shape of API request bodies.
 */
export namespace APIRequestBody {
  export namespace Reviews {
    export type POST = Pick<
      JudgeMeReviewCreateParams,
      | 'body'
      | 'email'
      | 'id'
      | 'ip_addr'
      | 'picture_keys'
      | 'picture_urls'
      | 'rating'
      | 'title'
    >
  }
}

/**
 * Names of Algolia pagination search parameters.
 */
export type PaginationParameter = 'hitsPerPage' | 'length' | 'page' | 'offset'

/**
 * Object containing Algolia pagination search parameters.
 */
export type PaginationSearchOptions = Pick<SearchOptions, PaginationParameter>

/**
 * Object types used to initialize search indexes.
 */
export namespace TObject {
  export interface Collection extends ICollectionListing {
    metafield: IMetafield[]
    products: IProductListing[]
  }

  export type Menu = IMenu

  export interface Page extends IPage {
    metafield: IMetafield[]
  }

  export type Policy = IPolicy

  export interface Product extends IProductListing {
    metafield: IMetafield[]
  }

  export type Review = JudgeMeReview
}
