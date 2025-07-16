import React from 'react';
import { useParams } from 'react-router-dom';


const NotFound: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
        <p className="text-lg">The page you are looking for does not exist!</p>
        {id && <p className="text-sm text-gray-500">ID: {id}</p>}
        </div>
    );
}

export default NotFound;