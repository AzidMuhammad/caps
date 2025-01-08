import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const session = req.cookies.get('session');
    
    if (!session) {
        return NextResponse.json({ message: 'No session found' }, { status: 401 });
    }

    const userData = JSON.parse(session.value);
    return NextResponse.json(userData, { status: 200 });
}
