import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    const link = await prisma.link.findUnique({ where: { id } });
    return NextResponse.json(link);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    const { url, title } = await req.json();
    const updatedLink = await prisma.link.update({
        where: { id },
        data: { url, title },
    });
    return NextResponse.json(updatedLink);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    await prisma.link.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
}
