"use client";

import React, { useState, useEffect } from 'react';
import LinkForm from '@/app/components/LinkForm';
import LinkList from '@/app/components/LinkList';
import { Link } from '@prisma/client';

const ManageLinks: React.FC = () => {
    const [links, setLinks] = useState<Link[]>([]);
    const [editingLink, setEditingLink] = useState<Link | null>(null);

    useEffect(() => {
        fetch('/api/links')
            .then((res) => res.json())
            .then((data) => setLinks(data));
    }, []);

    const addLink = (link: { url: string; title: string }) => {
        fetch('/api/links', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(link),
        })
            .then((res) => res.json())
            .then((newLink) => setLinks([...links, newLink]));
    };

    const updateLink = (link: { url: string; title: string }) => {
        if (!editingLink) return;

        fetch(`/api/links/${editingLink.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(link),
        })
            .then((res) => res.json())
            .then((updatedLink) => {
                setLinks(links.map((l) => (l.id === updatedLink.id ? updatedLink : l)));
                setEditingLink(null);
            });
    };

    const deleteLink = (id: number) => {
        fetch(`/api/links/${id}`, { method: 'DELETE' })
            .then(() => setLinks(links.filter((link) => link.id !== id)));
    };

    return (
        <div className="space-y-4">
            <LinkForm
                initialData={editingLink || undefined}
                onSubmit={editingLink ? updateLink : addLink}
            />
            <LinkList links={links} onEdit={setEditingLink} onDelete={deleteLink} />
        </div>
    );
};

export default ManageLinks;
