import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-white">404</h1>
                <p className="text-2xl md:text-3xl text-white mt-4">Oops! The page you're looking for doesn't exist.</p>
                <p className="text-lg text-white mt-2 mb-6">It looks like you took a wrong turn.</p>
                <Link
                    to="/"
                    className="px-6 py-3 text-lg font-medium text-blue-600 bg-white rounded-lg shadow hover:bg-gray-100 transition duration-300"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
