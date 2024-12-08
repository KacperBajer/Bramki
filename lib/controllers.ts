'use server'

import { Pool } from "pg";
import conn from "./db";
import { Controller, User } from "./types";
import { getUserId } from "./sessions";
import { getUser } from "./users";
import { createLogs } from "./logs";
import { createKommerSession } from "./kommer";

type getControllersData = {
    in: Controller[]
    out: Controller[]
}

type GetControllersResponse = {
    status: 'success' | 'failed'
    data?: getControllersData
    error?: string
}

export const getControllers = async (token?: string) => {
    try {
        const user = await getUser(token);

        if (!user) {
            return {
                status: 'failed',
                error: 'User not found or unauthorized',
            } as GetControllersResponse;
        }

        const isAdmin = user.role === 'Admin';

        let controllersQuery = 'SELECT id, type, name, mode FROM controllers';
 

        const controllersResult = await (conn as Pool).query(controllersQuery);
        const controllers = controllersResult.rows;

        if (!isAdmin) {
            const uhfCard = user.cards?.find(card => card.type === 'UHF');
            const rfidCard = user.cards?.find(card => card.type === 'RFID');

            console.log(user.cards)

            const filteredControllers = controllers.filter(controller => {
                if (uhfCard && controller.type === 'barrier') {
                    return true;
                }
                if (rfidCard && controller.type === 'gate') {
                    return true;
                }
                return false;
            });

            const grouped = filteredControllers.reduce((acc, controller) => {
                if (controller.mode === 'in') {
                    acc.in.push(controller);
                } else if (controller.mode === 'out') {
                    acc.out.push(controller);
                }
                return acc;
            }, { in: [], out: [] });

            return {
                status: 'success',
                data: grouped,
            } as GetControllersResponse;
        }

        const grouped = controllers.reduce((acc, controller) => {
            if (controller.mode === 'in') {
                acc.in.push(controller);
            } else if (controller.mode === 'out') {
                acc.out.push(controller);
            }
            return acc;
        }, { in: [], out: [] });

        return {
            status: 'success',
            data: grouped,
        } as GetControllersResponse;
    } catch (error) {
        console.error(error);
        return {
            status: 'failed',
            error: 'Something went wrong',
        } as GetControllersResponse;
    }
};

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


export const openController = async (id: number, name: string, token?: string) => {
    try {
        
       const sessionId = await createKommerSession()

       if (sessionId.status === 'failed') {
        const ans: OpenControllerResponse = {
            status: 'failed',
            error: 'Something went wrong'
        };

        await createLogs(`Open door ${name} (${id})`, 'failed', 'Something went wrong', token);

        return ans;
    }

        const link = await getOpenLink(id);

        if (link.status === 'failed') {
            const ans: OpenControllerResponse = {
                status: 'failed',
                error: 'Something went wrong'
            };

            await createLogs(`Open door ${name} (${id})`, 'failed', 'Something went wrong', token);

            return ans;
        }

        const response = await fetch(link.data as string, {
            method: 'GET',
            headers: {
                'Cookie': `sessionidadms=${sessionId}`,
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to open door');
        }

        const ans: OpenControllerResponse = {
            status: 'success',
        };

        await createLogs(`Open door ${name} (${id})`, 'success', '', token);
        return ans;

    } catch (error) {
        console.error(error);

        const ans: OpenControllerResponse = {
            status: 'failed',
            error: 'Something went wrong'
        };

        await createLogs(`Open door ${name} (${id})`, 'failed', 'Something went wrong', token);
        return ans;
    }
};
