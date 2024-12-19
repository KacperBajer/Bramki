import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

        return  NextResponse.json({message: 'The feature is currently disabled'}, {status: 200})
    } catch (error) {
        return  NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}
