"use client";

import React from 'react';
import { Link } from '@prisma/client';
import { Button } from '@/components/ui/button';

type LinkListProps = {
    links: Link[];
    onEdit: (link: Link) => void;
    onDelete: (id: number) => void;
};

const LinkList: React.FC<LinkListProps> = ({ links, onEdit, onDelete }) => {
    return (
        <ul className="space-y-4">
            {links.map((link) => (
                <div key={link.id} className="flex justify-between items-center p-4 border rounded hover:bg-gray-100">
                    <div>
                        <a href={link.url} className="text-blue-500 hover:underline">
                            {link.title}
                        </a>
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            onClick={() => onEdit(link)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => onDelete(link.id)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            ))}
        </ul>
    );
};

export default LinkList;
