/*
 * @Author: your name
 * @Date: 2021-07-09 09:58:07
 * @LastEditTime: 2021-07-09 12:04:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nextjs-blog\lib\posts.js
 */


//many functions
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostData(){
    //read filenames from the postsDirectory
    const fileNames = fs.readdirSync(postsDirectory)
    //map calculated all of the element in a array and do things
    //fileName is element in fileNames
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '')

        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        const matterResult = matter(fileContents)
        // console.log( matterResult)

        //combine the data with the id 
        return{
            id, 
            //
            ...matterResult.data
        }
    } )
    return allPostsData.sort(({ date: a }, { date: b }) => {
        if (a < b) {
          return 1
        } else if (a > b) {
          return -1
        } else {
          return 0
        }
      })
}

// export async function getSortedPostsData() {
//     // Instead of the file system,
//     // fetch post data from an external API endpoint
//     const res = await fetch('..')
//     return res.json()
//   }

// import someDatabaseSDK from 'someDatabaseSDK'

// const databaseClient = someDatabaseSDK.createClient(...)

// export async function getSortedPostsData() {
//   // Instead of the file system,
//   // fetch post data from a database
//   return databaseClient.query('SELECT posts...')
// }


export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)

    //return ids whitch is the file name and
    //return must be an array of objects.
    return fileNames.map(fileName =>{
        return {
            params: {
                id: fileName.replace(/\.md$/,'')
            }
        }
    })

}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    //remark the text in the file into html
    const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
    const contentHtml = processedContent.contents

    //combine the data with the id 
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}