'use server'

import { Pool } from "pg";
import conn from "./db";
import { Controller, User } from "./types";
import { getUserId } from "./sessions";
import { getUser } from "./users";
import { createLogs } from "./logs";

type getControllersData = {
    in: Controller[]
    out: Controller[]
}

type GetControllersResponse = {
    status: 'success' | 'failed'
    data?: getControllersData
    error?: string
}

export const getControllers = async () => {
    try {
        const query = 'SELECT id, type, name, mode FROM controllers'
        const result = await (conn as Pool).query(
            query, []
        );
        const controllers = result.rows;

        const grouped = controllers.reduce((acc, controller) => {
            if (controller.mode === 'in') {
                acc.in.push(controller);
            } else if (controller.mode === 'out') {
                acc.out.push(controller);
            }
            return acc;
        }, { in: [], out: [] });

        const ans: GetControllersResponse = {
            status: 'success',
            data: grouped
        }

        return ans;
    } catch (error) {
        const ans: GetControllersResponse = {
            status: 'failed',
            error: 'Something wants wrong'
        }
        console.log(error)
        return ans
    }
}

type GetOpenLinkResponse = {
    status: 'success' | 'failed'
    data?: string
    error?: string
}

export const getOpenLink = async (id: number) => {
    try {
        const query = 'SELECT * FROM controllers WHERE id = $1'
        const result = await (conn as Pool).query(
            query, [id]
        );
        if (result.rows.length < 1) {
            const ans: GetOpenLinkResponse = {
                status: 'failed',
                error: 'No data'
            }
            return ans
        }
        const ans: GetOpenLinkResponse = {
            status: 'success',
            data: result.rows[0].openlink
        }
        return ans
    } catch (error) {
        const ans: GetOpenLinkResponse = {
            status: 'failed',
            error: 'Something wants wrong'
        }
        console.log(error)
        return ans
    }
}

type OpenControllerResponse = {
    status: 'success' | 'failed'
    data?: string
    error?: string
}


export const openController = async (id: number, name: string) => {
    try {

        const link = await getOpenLink(id)

        if (link.status === 'failed') {
            const ans: OpenControllerResponse = {
                status: 'failed',
                error: 'Something wants wrong'
            }

            const createLog = await createLogs(`Open door ${name} (${id})`, 'failed', 'Something wants wrong')

            return ans
        }

        const response = await fetch(link.data as string, {
            method: 'GET',
            headers: {
                'Cookie': `sessionidadms=31e10af6f798790c3db63e76493b8dc8`,
            },
            credentials: 'include',
        })

        const ans: OpenControllerResponse = {
            status: 'success',
        }
        const createLog = createLogs(`Open door ${name} (${id})`, 'success', '')
        return ans
    } catch (error) {
        const ans: OpenControllerResponse = {
            status: 'failed',
            error: 'Something wants wrong'
        }
        console.log(error)
        const createLog = await createLogs(`Open door ${name} (${id})`, 'failed', 'Something wants wrong')
        return ans
    }
}