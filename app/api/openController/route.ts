import { getControllers, openController } from "@/lib/controllers";
import { getUser } from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const headers = req.headers;
    const token = headers.get('token');
    const controllerid = headers.get('controllerid');
    const controllername = headers.get('controllername');


    try {

        if (!token || !controllerid || !controllername) {
          return  NextResponse.json({message: 'No token'}, {status: 400})
        }

        const user = await getUser(token)
        
        if(!user) {
            return  NextResponse.json({message: 'Session expired'}, {status: 401})            
        }

        const controllers = await openController(parseInt(controllerid as string), controllername as string)

        if(controllers.status === 'failed') {
            return  NextResponse.json({message: controllers.error}, {status: 500})
        }

        return  NextResponse.json({message: 'success'}, {status: 200})

    } catch (error) {
        return  NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}
