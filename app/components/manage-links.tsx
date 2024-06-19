// pages/manage-links.tsx

import React from 'react';
import ManageLinks from '../(pages)/manage/page';

const ManageLinksPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Manage Links</h1>
            <ManageLinks />
        </div>
    );
};

export default ManageLinksPage;
