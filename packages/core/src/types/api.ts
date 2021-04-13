import type { Hit, SearchOptions } from '@algolia/client-search'
import type { AnyObject } from '@flex-development/json'
import type {
  Playlist as AppleMusicPlaylist,
  PlaylistAttributes as AppleMusicPlaylistAttributes,
  SongAttributes
} from './apple-music'
import type {
  JudgeMeReview,
  JudgeMeReviewCreateDataDTO,
  JudgeMeReviewer
} from './reviews'
import type {
  ICollectionListing,
  ICustomer,
  IMenu,
  IMenuLink,
  IMetafield,
  IPage,
  IPolicy,
  IProductListing,
  IProductListingVariant
} from './shopify-rest-admin-api'
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

  export interface Customer extends Partial<TObject.Customer> {
    email: ICustomer['email']
    id: ICustomer['id']
    objectID: ICustomer['id']
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

  export interface Review extends Partial<TObject.Review> {
    id: JudgeMeReview['id']
    objectID: JudgeMeReview['id']
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

  export namespace Customer {
    export interface Find extends SearchIndex {
      accepts_marketing?: ICustomer['accepts_marketing']
      email?: ICustomer['email']
      first_name?: ICustomer['first_name']
      id?: ICustomer['id']
      last_name?: ICustomer['last_name']
      last_order_id?: ICustomer['last_order_id']
      last_order_name?: ICustomer['last_order_name']
      moil?: ICustomer['marketing_opt_in_level']
      orders_count?: ICustomer['orders_count']
      phone?: ICustomer['phone']
      state?: ICustomer['state']
      total_spent?: ICustomer['total_spent']
      verified_email?: ICustomer['verified_email']
    }

    export interface Get extends SearchIndexObject {
      objectID: ICustomer['id']
      userToken: NonNullable<SearchIndex['userToken']>
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
      curated?: JudgeMeReview['curated']
      featured?: JudgeMeReview['featured']
      hidden?: JudgeMeReview['hidden']
      id?: JudgeMeReview['id']
      ip_address?: JudgeMeReview['ip_address']
      product_id?: JudgeMeReview['product_external_id']
      rating?: JudgeMeReview['rating']
      reviewer_email?: JudgeMeReviewer['email']
      reviewer_id?: JudgeMeReviewer['id']
      source?: JudgeMeReview['source']
    }

    export interface Get extends SearchIndexObject {
      objectID: JudgeMeReview['id']
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

    /**
     * A user identifier.
     *
     * Format: alpha numeric string [a-zA-Z0-9_-]
     * Length: between 1 and 64 characters.
     */
    userToken?: SearchOptions['userToken']
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
  export namespace Review {
    export type POST = JudgeMeReviewCreateDataDTO
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

  export type Customer = ICustomer

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
