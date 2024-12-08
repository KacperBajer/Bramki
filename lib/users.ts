'use server'
import { Pool } from "pg";
import conn from "./db";
import { createSession, getUserId } from "./sessions";
import { User } from "./types";
import { createLogs } from "./logs";


export const getUser = async () => {
    try {

        const userid = await getUserId()

        if (userid.status === 'failed') {
            return false
        }

        const query = `
            SELECT 
                u.id, 
                u.firstname, 
                u.lastname, 
                u.role, 
                u.email, 
                u.class,
                json_agg(
                    json_build_object(
                        'id', c.id,
                        'type', c.type
                    )
                ) AS cards
            FROM users u
            LEFT JOIN cards c ON u.id = c.userid
            WHERE u.id = $1
            GROUP BY u.id
        `;

        const result = await (conn as Pool).query(
            query, [userid.userid]
        );
        console.log(result.rows)
        return result.rows[0] as User
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

export const loginUser = async (email: string, password: string) => {
    if (!email || !password) {
        console.log('No email or password')
        return
    }
    try {
        const query = 'SELECT * FROM users WHERE email = $1 AND password = $2'
        const result = await (conn as Pool).query(
            query, [email, password]
        );
        if (result.rows.length < 1) {
            const ans: LoginResponse = {
                status: 'failed',
                error: 'Incorrect email or password'
            }
            return ans
        }

        const session = await createSession(result.rows[0].id)

        if (session === 'failed') {
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
        const createLog = await createLogs(`Log In`, 'success', '')
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


type GetUsersResponse = {
    status: 'success' | 'failed'
    error?: string
    data?: User[]
    totalRows?: number
}

export const getUsers = async (page: number) => {
    try {
        const itemsPerPage = 50;
        const offset = (page - 1) * itemsPerPage;

        const totalCountQuery = 'SELECT COUNT(*) AS total FROM users';
        const totalCountResult = await (conn as Pool).query(totalCountQuery);

        if (totalCountResult.rows.length < 1 || !totalCountResult.rows[0].total) {
            return {
                status: 'failed',
                error: 'No users',
            } as GetUsersResponse;
        }

        const totalRows = parseInt(totalCountResult.rows[0].total, 10);

        const usersQuery = `
            SELECT 
                u.id, 
                u.firstname, 
                u.lastname, 
                u.role, 
                u.email, 
                u.class,
                json_agg(
                    json_build_object(
                        'id', c.id,
                        'type', c.type
                    )
                ) AS cards
            FROM users u
            LEFT JOIN cards c ON u.id = c.userid
            GROUP BY u.id
            ORDER BY u.id ASC
            LIMIT $1 OFFSET $2
        `;
        const usersResult = await (conn as Pool).query(usersQuery, [itemsPerPage, offset]);

        return {
            status: 'success',
            data: usersResult.rows,
            totalRows: totalRows,
        } as GetUsersResponse;
    } catch (error) {
        console.error(error);
        return {
            status: 'failed',
            error: 'Something went wrong',
        } as GetUsersResponse;
    }
};

type CreateUserResponse = {
    status: 'success' | 'failed'
    error?: string
}

export const createUser = async (email: string, password: string, firstname: string, lastname: string, userclass?: string, role: string = 'User') => {
    try {
        const query = `
        INSERT INTO users (email, password, firstname, lastname, role, class)
        VALUES ($1, $2, $3, $4, $5, $6);
    `;

        const values = [email, password, firstname, lastname, role, userclass || null];

        const result = await (conn as Pool).query(query, values);

        return {
            status: 'success'
        } as CreateUserResponse

    } catch (error) {
        return {
            status: 'failed',
            error: 'Something wants wrong'
        } as CreateUserResponse
    }
}


type EditUserResponse = {
    status: 'success' | 'failed'
    error?: string
}

export const editUser = async (id: number, email: string, firstname: string, lastname: string, userclass?: string, role: string = 'User') => {
    try {
        const query = `
        UPDATE users
        SET email = $1,
            firstname = $2,
            lastname = $3,
            role = $4,
            class = $5
        WHERE id = $6;
    `;

        const values = [email, firstname, lastname, role, userclass || null, id];

        const result = await (conn as Pool).query(query, values);

        return {
            status: 'success'
        } as EditUserResponse

    } catch (error) {
        console.log(error)
        return {
            status: 'failed',
            error: 'Something wants wrong'
        } as EditUserResponse
    }
}

type AddCardResponse = {
    status: 'failed' | 'success'
    error?: string
}

export const addCard = async (userid: number, cardid: number, type: 'UHF' | 'RFID') => {
    try {
        const query = `
            INSERT INTO cards (userid, id, type)
            VALUES ($1, $2, $3);
        `;

        const values = [userid, cardid, type];

        const result = await (conn as Pool).query(query, values);

        return {
            status: 'success',
            card: result.rows[0],
        } as AddCardResponse

    } catch (error) {
        if ((error as any).code === '23505') {
            return {
                status: 'failed',
                error: 'Card is already added.',
            };
        }
        return {
            status: 'failed',
            error: 'Something went wrong',
        } as AddCardResponse
    }
}