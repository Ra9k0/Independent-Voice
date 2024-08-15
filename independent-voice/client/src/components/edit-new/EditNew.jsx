import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as articleService from "../../services/articleService";
import Loading from '../loading/Loading';
import AuthContext from '../../contexts/AuthContext';

const EditNew = () => {
    const { articleId } = useParams();
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    const isAuthenticated = !!userId;

    const [article, setArticle] = useState({
        title: '',
        content: '',
        image: '',
        authorId: ''
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await articleService.getOne(articleId);
                setArticle({
                    title: response.title,
                    content: response.content,
                    image: response.image,
                    authorId: response.authorId,
                });
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching article:', error);
                setIsLoading(false);
            }
        };

        fetchArticle();
    }, [articleId]);

    useEffect(() => {
        if (!isLoading && (!isAuthenticated || article.authorId !== userId)) {
            console.log('User is not authenticated or does not match the author');
            navigate('/');
        }
    }, [isLoading, isAuthenticated, article.authorId, userId, navigate]);

    const handleChange = (e) => {
        setArticle({
            ...article,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await articleService.update(articleId, article);
            navigate(`/Details/${articleId}`);
        } catch (error) {
            console.error('Error updating article:', error);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Edit Article</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={article.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        value={article.content}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={article.image}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditNew;
