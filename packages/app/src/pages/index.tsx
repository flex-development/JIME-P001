import { database } from '@app/config/firebase'
import {
  IPageProps,
  PC,
  ServerSidePageProps,
  SortOrder
} from '@app/subdomains/app'
import { CustomerService } from '@app/subdomains/customers'
import {
  CollectionService,
  ProductService,
  ReviewService
} from '@app/subdomains/sales'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/client'
import Head from 'next/head'
import React from 'react'

const Collections = new CollectionService()
const Customers = new CustomerService()
const ProductReviews = new ReviewService(database)
const Products = new ProductService()

/**
 * Renders the homepage.
 *
 * @param props - Page component props
 */
const Index: PC = () => {
  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1 className='title'>
          Welcome to <a href='https://nextjs.org'>Next.js!</a>
        </h1>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .title a {
          color: #0070f3;
          text-decoration: none;
        }
        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          text-align: center;
        }
        .logo {
          height: 1em;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

/**
 * Retrieves the current user session.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching
 *
 * @param ctx - Next.js page component context
 * @param ctx.params - Route parameters if page uses a dynamic route
 * @param ctx.req - HTTP request object
 * @param ctx.res - HTTP response object
 * @param ctx.resolvedUrl - Normalized version of the request URL
 */
export const getServerSideProps: ServerSidePageProps = async (
  context: GetServerSidePropsContext
) => {
  const session = (await getSession(context)) as IPageProps['session']

  return {
    props: {
      page: {
        collections: await Collections.find(),
        customers: await Customers.find(),
        products: await Products.find({
          $sort: { handle: SortOrder.ASCENDING }
        }),
        reviews: await ProductReviews.find({
          $sort: { id: SortOrder.ASCENDING }
        })
      },
      session
    }
  }
}

export default Index
