// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export async function POST(req: NextRequest) {
    console.log('Received a registration request');
    
    if (!uri) {
        console.error('MONGODB_URI is not defined in environment variables');
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }

    const client = new MongoClient(uri);

    try {
        console.log("Attempting to connect to MongoDB");
        await client.connect();
        console.log("Connected to MongoDB successfully");

        const db = client.db("DB");

        const { email, username, password, role } = await req.json();
        console.log('Request Body:', { email, username, role });

        if (!email || !username || !password || !role) {
            console.error('Missing required fields');
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        if (!['admin', 'worker', 'customer'].includes(role)) {
            console.error('Invalid role');
            return NextResponse.json({ message: 'Invalid role' }, { status: 400 });
        }

        const collectionName = role;
        const collection = db.collection(collectionName);

        const existingUser = await collection.findOne({ username });
        if (existingUser) {
            console.log('Username already exists');
            return NextResponse.json({ message: 'Username already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            email,
            username,
            password: hashedPassword,
            role,
            createdAt: new Date(),
        };

        await collection.insertOne(newUser);
        console.log(`${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`);
        return NextResponse.json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully` }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ message: 'An error occurred during registration', error}, { status: 500 });
    } finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
}
