"use client"

import React, { useState, useEffect } from 'react';
import UserProfileForm from '@/app/components/UserProfileForm';

const ManageProfile: React.FC = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // Fetch the user's profile data from the API
        fetch('/api/profile')
            .then((res) => res.json())
            .then((data) => setProfile(data));
    }, []);

    const saveProfile = (profile: any) => {
        fetch('/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profile),
        })
            .then((res) => res.json())
            .then((updatedProfile) => setProfile(updatedProfile));
    };

    return (
        <div className="space-y-4">
            <UserProfileForm initialData={profile || undefined} onSubmit={saveProfile} />
        </div>
    );
};

export default ManageProfile;
