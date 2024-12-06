'use server'

import { Pool } from "pg";
import conn from "./db";
import { getUser } from "./users";
import { getCurrentDateForDatabase } from "./func";

export const createLogs = async (action: string, status: 'success' | 'failed', comment: string) => {
    try {
        const user = await getUser()
        if(!user) {
            return
        }

        const query = 'INSERT INTO logs (userid, username, action, status, comment, date) VALUES ($1, $2, $3, $4, $5, $6)'
        const result = await (conn as Pool).query(
            query, [user.id, user.username, action, status, comment, getCurrentDateForDatabase()]
        );
        return 'success'
    } catch (error) {
        console.log(error)
        return 'failed'
    }
}