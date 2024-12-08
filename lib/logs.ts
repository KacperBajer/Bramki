'use server'

import { Pool } from "pg";
import conn from "./db";
import { getUser } from "./users";
import { getCurrentDateForDatabase } from "./func";
import { Logs } from "./types";

type GetLogsResponse = {
    status: 'success' | 'failed'
    error?: string
    data?: Logs[]
    totalRows?: number 
}

export const getLogs = async (page: number) => {
    
    try {
        const itemsPerPage = 50;
        const offset = (page - 1) * itemsPerPage;

        const totalCountQuery = 'SELECT COUNT(*) AS total FROM logs';
        const totalCountResult = await (conn as Pool).query(totalCountQuery);

        if (totalCountResult.rows.length < 1 || !totalCountResult.rows[0].total) {
            return {
                status: 'failed',
                error: 'No logs',
            } as GetLogsResponse;
        }

        const totalRows = parseInt(totalCountResult.rows[0].total, 10);

        const logsQuery = `
            SELECT 
                l.*, 
                u.firstname, 
                u.lastname 
            FROM logs l
            LEFT JOIN users u ON l.userid = u.id
            ORDER BY l.date DESC 
            LIMIT $1 OFFSET $2
        `;
        const logsResult = await (conn as Pool).query(logsQuery, [itemsPerPage, offset]);

        return {
            status: 'success',
            data: logsResult.rows,
            totalRows: totalRows,
        } as GetLogsResponse;
    } catch (error) {
        console.error(error);
        return {
            status: 'failed',
            error: 'Something went wrong',
        } as GetLogsResponse;
    }
}

export const createLogs = async (action: string, status: 'success' | 'failed', comment: string) => {
    try {
        const user = await getUser()
        if(!user) {
            return
        }

        const query = 'INSERT INTO logs (userid, action, status, comment, date) VALUES ($1, $2, $3, $4, $5)'
        const result = await (conn as Pool).query(
            query, [user.id, action, status, comment, getCurrentDateForDatabase()]
        );
        return 'success'
    } catch (error) {
        console.log(error)
        return 'failed'
    }
}