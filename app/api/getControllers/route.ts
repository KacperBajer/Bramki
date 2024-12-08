import { getControllers } from "@/lib/controllers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const headers = req.headers;
    const token = headers.get('token');

    console.log(token)

    try {

        if (!token) {
          return  NextResponse.json({message: 'No token'}, {status: 400})
        }

        const controllers = await getControllers(token)

        if(controllers.status === 'failed') {
            return  NextResponse.json({message: controllers.error}, {status: 500})
        }

        return  NextResponse.json({message: 'success', controllers: controllers.data}, {status: 200})

    } catch (error) {
        return  NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}
