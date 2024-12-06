'use server'
import { Pool } from "pg";
import conn from "./db";
import { createSession, getUserId } from "./sessions";
import { User } from "./types";


export const getUser = async () => {
    try {

        const userid = await getUserId()

        if(userid.status === 'failed') {
            return false
        }
        
        const query = 'SELECT * FROM users WHERE id = $1'
        const result = await (conn as Pool).query(
            query, [userid.userid]
        );
        const user: User = {
            role: result.rows[0].role,
            username:  result.rows[0].username,
            id:  result.rows[0].id,
        }
        return user
    } catch (error) {
        console.log(error)
        return false
    }
}

type LoginResponse = {
    status: 'success' | 'failed'
    error?: string
    token?: string
}

export const loginUser = async (username: string, password: string) => {
    if(!username || !password) {
        console.log('No username or password')
    }
    try {
        const query = 'SELECT * FROM users WHERE username = $1 AND password = $2'
        const result = await (conn as Pool).query(
            query, [username, password]
        );
        if(result.rows.length < 1) {
            const ans: LoginResponse = {
                status: 'failed',
                error: 'Incorrect username or password'
            }
            return ans
        }
        
        const session = await createSession(result.rows[0].id)
        
        if(session === 'failed') {
            const ans: LoginResponse = {
                status: 'failed',
                error: 'Something wants wrong'
            }
            return ans
        }

        const ans: LoginResponse = {
            status: 'success',
            token: session
        }
        return ans
    } catch (error) {
        console.log(error)
        const ans: LoginResponse = {
            status: 'failed',
            error: 'Something wants wrong'
        }
        return ans
    }
}