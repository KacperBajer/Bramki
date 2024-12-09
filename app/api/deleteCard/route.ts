import { deleteCard } from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, res: NextResponse) {
    const headers = req.headers;
    const token = headers.get('token');
    const id = headers.get('id');

    try {

        if (!token) {
          return  NextResponse.json({message: 'No token'}, {status: 400})
        }

        const res = await deleteCard(parseInt(id as string), token)

        if(res.status === 'failed')  {
          return  NextResponse.json({message: res.error || 'Something went wrong'}, {status: 500})
        }

        return  NextResponse.json({message: 'success'}, {status: 200})

    } catch (error) {
        return  NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}
