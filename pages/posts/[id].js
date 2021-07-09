/*
 * @Author: your name
 * @Date: 2021-07-09 11:22:27
 * @LastEditTime: 2021-07-09 16:05:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nextjs-blog\pages\posts\[id].js
 */
import { getAllPostIds, getPostData } from "../../lib/posts"
import utilStyles from '../../styles/utils.module.css'
import Layout from '../../components/layout'
import Date from '../../components/date'
import Head from 'next/head'

export async function getStaticPaths() {
    const paths = getAllPostIds()
    // console.log(paths)
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    // console.log(postData)
    return {
        props: {
            postData : postData
        }
    }
}




export default function Post({ postData }) {
console.log(postData)
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>

        </Layout>
    )
}