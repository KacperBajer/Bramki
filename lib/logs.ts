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

export const getLogs = async (page: number, userid?: number) => {
    try {

        console.log('id ', userid)

        const itemsPerPage = 50;
        const offset = (page - 1) * itemsPerPage;

        let totalCountQuery = 'SELECT COUNT(*) AS total FROM logs';
        let logsQuery = `
            SELECT 
                l.*, 
                u.firstname, 
                u.lastname 
            FROM logs l
            LEFT JOIN users u ON l.userid = u.id
        `;

        const queryParams: any[] = [];

        if (userid) {
            totalCountQuery += ' WHERE l.userid = $1';
            logsQuery += ' WHERE l.userid = $1';
            queryParams.push(userid);
        }

        logsQuery += ` ORDER BY l.date DESC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
        queryParams.push(itemsPerPage, offset);

        const totalCountResult = await (conn as Pool).query(totalCountQuery, userid ? [userid] : []);

        if (totalCountResult.rows.length < 1 || !totalCountResult.rows[0].total) {
            return {
                status: 'failed',
                error: 'No logs',
            } as GetLogsResponse;
        }

        const totalRows = parseInt(totalCountResult.rows[0].total, 10);

        const logsResult = await (conn as Pool).query(logsQuery, queryParams);

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
};


export const createLogs = async (action: string, status: 'success' | 'failed', comment: string, token?: string) => {
    try {
        const user = await getUser(token)
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
