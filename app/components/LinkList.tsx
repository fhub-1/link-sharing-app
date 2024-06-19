"use client";

import React from 'react';
import { Link } from '@prisma/client';

type LinkListProps = {
    links: Link[];
    onEdit: (link: Link) => void;
    onDelete: (id: number) => void;
};

const LinkList: React.FC<LinkListProps> = ({ links, onEdit, onDelete }) => {
    return (
        <ul className="space-y-4">
            {links.map((link) => (
                <li key={link.id} className="flex justify-between items-center p-4 border rounded hover:bg-gray-100">
                    <div>
                        <a href={link.url} className="text-blue-500 hover:underline">
                            {link.title}
                        </a>
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={() => onEdit(link)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(link.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default LinkList;
