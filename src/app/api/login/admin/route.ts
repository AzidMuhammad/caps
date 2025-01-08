import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export async function POST(req: NextRequest) {
    if (!uri) return NextResponse.json({ message: 'Internal server error' }, { status: 500 });

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("DB");
        const { email, username, password } = await req.json();

        if (!email || !username || !password) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const collection = db.collection('admin');
        const user = await collection.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'Invalid Email' }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid Password' }, { status: 401 });
        }

        const response = NextResponse.json({ message: 'Admin logged in successfully' });
        response.cookies.set('session', JSON.stringify({ email: user.email, username: user.username, role: 'admin' }), {
            httpOnly: true,
            path: '/',
        });

        return response;
    } finally {
        await client.close();
    }
}
