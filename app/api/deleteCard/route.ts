import { deleteCard, getUser } from "@/lib/users";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const headers = req.headers;
    const token = headers.get('token');
    const id = headers.get('id');

    try {

        if (!token || !id) {
          return  NextResponse.json({message: 'No token or id'}, {status: 400})
        }

          const user = await getUser(token)
          
          if(!user) {
            return  NextResponse.json({message: 'Session expired'}, {status: 401})            
          }
          
          console.log(user.cards)
          console.log(id)
          console.log(user.cards.some((card) => card.id !== parseInt(id)))

          if(user.cards.some((card) => card.id !== parseInt(id))) {
            return  NextResponse.json({message: 'the card doesnt belong to you'}, {status: 500})            
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
