import prisma from '@/prisma/prisma';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
    const userId = 1; // Replace with actual user ID logic
    const userProfile = await prisma.user.findUnique({
        where: { id: userId },
        include: { links: true },
    });
    return NextResponse.json(userProfile);
}

export async function PUT(req: NextRequest) {
    const userId = 1; // Replace with actual user ID logic
    const { firstName, lastName, email, profilePicture } = await req.json();
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { firstName, lastName, email, profilePicture },
    });
    return NextResponse.json(updatedUser);
}
