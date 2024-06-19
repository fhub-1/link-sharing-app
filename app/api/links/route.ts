import prisma from '@/prisma/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const links = await prisma.link.findMany();
        return NextResponse.json(links);
    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { url, title, userId } = await req.json();
        if (!url || !title || !userId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        const newLink = await prisma.link.create({
            data: { url, title, userId },
        });
        return NextResponse.json(newLink, { status: 201 });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json({ error: 'Failed to create link' }, { status: 500 });
    }
}
