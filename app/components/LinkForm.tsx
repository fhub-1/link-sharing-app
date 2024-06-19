"use client";

import React, { useState, useEffect } from 'react';
import { Link } from '@prisma/client';

type LinkFormProps = {
    initialData?: Link;
    onSubmit: (link: { url: string; title: string }) => void;
};

const LinkForm: React.FC<LinkFormProps> = ({ initialData, onSubmit }) => {
    const [url, setUrl] = useState(initialData?.url || '');
    const [title, setTitle] = useState(initialData?.title || '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialData) {
            setUrl(initialData.url);
            setTitle(initialData.title);
        } else {
            setUrl('');
            setTitle('');
        }
    }, [initialData]);

    const validateUrl = (url: string) => {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(url);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url || !title) {
            setError('Both URL and title are required.');
            return;
        }
        if (!validateUrl(url)) {
            setError('Please enter a valid URL.');
            return;
        }
        setError('');

        try {
            const response = await fetch('/api/links', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url, title, userId: 1 }), // Assuming a dummy userId for now
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'Something went wrong');
                return;
            }

            const newLink = await response.json();
            onSubmit(newLink);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to add link. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                    URL
                </label>
                <input
                    id="url"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                {initialData ? 'Update' : 'Add'} Link
            </button>
        </form>
    );
};

export default LinkForm;
