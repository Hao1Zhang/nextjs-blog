/*
 * @Author: your name
 * @Date: 2021-07-09 12:11:50
 * @LastEditTime: 2021-07-09 12:17:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nextjs-blog\components\date.js
 */
import { parseISO, format } from 'date-fns'
export default function Date({dateString}) {
    const date = parseISO(dateString)
    return (
        <time dateTime = {dateString}>
             {format(date,'LLLL d,yyyy')}
        </time>
    )
}