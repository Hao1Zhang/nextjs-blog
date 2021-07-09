/*
 * @Author: your name
 * @Date: 2021-07-09 09:52:03
 * @LastEditTime: 2021-07-09 13:55:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nextjs-blog\pages\index.js
 */
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostData } from '../lib/posts'
import Link from 'next//link'
import Date from '../components/date'

export async function getStaticProps(){
  const allPostsData = getSortedPostData()
  return {
    props: {
      allPostsData
    }
  }
}

// export async function getServerSideProps(){
//   const allPostsData = getSortedPostData()
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href = {`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br/>
              <small className={utilStyles.lightText}>
                <Date dateString = {date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
