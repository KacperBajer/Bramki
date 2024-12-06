'use server'
import { Pool } from "pg";
import conn from "./db";
import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers'


export const createSession = async (userid: number) => {
    const cookieStore = await cookies()
    try {

        const token = uuidv4()

        const query = 'INSERT INTO sessions (userid, token) VALUES ($1, $2)'
        const result = await (conn as Pool).query(
            query, [userid, token]
        );

        cookieStore.set('token', token)

        return token
    } catch (error) {
        console.log(error)
        return 'failed'
    }
}

type ResponseGetUserId = {
    status: 'success' | 'failed'
    userid?: number
    error?: string
}

export const getUserId = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    if(!token) {
        const ans: ResponseGetUserId = {
            status: 'failed',
            error: 'No token'
        }

        return ans
    }
    try {
        const query = 'SELECT * FROM sessions WHERE token = $1'
        const result = await (conn as Pool).query(
            query, [token.value]
        );
        if(result.rows.length < 1) {
            const ans: ResponseGetUserId = {
                status: 'failed',
                error: 'Invalid token'
            }
    
            return ans
        }
        const ans: ResponseGetUserId = {
            status: 'success',
            userid: result.rows[0].userid
        }

        return ans
    } catch (error) {
        console.log(error)
        const ans: ResponseGetUserId = {
            status: 'failed',
            error: 'Something wants wrong'
        }

        return ans
    }
}