"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

type UserProfile = {
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: string;
};

type UserProfileFormProps = {
    initialData?: UserProfile;
    onSubmit: (profile: UserProfile) => void;
};

const UserProfileForm: React.FC<UserProfileFormProps> = ({ initialData, onSubmit }) => {
    const [firstName, setFirstName] = useState(initialData?.firstName || '');
    const [lastName, setLastName] = useState(initialData?.lastName || '');
    const [email, setEmail] = useState(initialData?.email || '');
    const [profilePicture, setProfilePicture] = useState(initialData?.profilePicture || '');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!firstName || !lastName) {
            setError('First name and last name are required.');
            return;
        }
        setError('');
        onSubmit({ firstName, lastName, email, profilePicture });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                </Label>
                <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border rounded shadow-sm"
                    required
                />
            </div>
            <div>
                <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                </Label>
                <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border rounded shadow-sm"
                    required
                />
            </div>
            <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border rounded shadow-sm"
                />
            </div>
            <div>
                <Label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
                    Profile Picture URL
                </Label>
                <Input
                    id="profilePicture"
                    type="url"
                    value={profilePicture}
                    onChange={(e) => setProfilePicture(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border rounded shadow-sm"
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button
                variant="default"
                type="submit"
            >
                {initialData ? 'Update' : 'Save'} Profile
            </Button>
        </form>
    );
};

export default UserProfileForm;
