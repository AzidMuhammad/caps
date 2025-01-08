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

        const { phoneNumber, password } = await req.json();

        if (!phoneNumber || !password) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const collection = db.collection('customer');
        const user = await collection.findOne({ phoneNumber });

        if (!user) {
            return NextResponse.json({ message: 'Invalid Phone Number' }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid Password' }, { status: 401 });
        }

        const response = NextResponse.json({ message: 'Customer logged in successfully' });
        response.cookies.set('session', JSON.stringify({
            phoneNumber: user.phoneNumber,
            username: user.username,
            role: 'customer',
            plateNumber: user.plateNumber,
            vehicleColor: user.vehicleColor,
            washingStartTime: user.washingStartTime,
            washingEndTime: user.washingEndTime,
        }), {
            httpOnly: true,
            path: '/',
        });

        return response;
    } finally {
        await client.close();
    }
}
