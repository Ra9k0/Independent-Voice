import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import * as articleService from '../../services/articleService';
import AuthContext from '../../contexts/AuthContext';
import Loading from '../loading/Loading';
import '../all-news/all-news.css';
import './my-news.css';

const MyNews = () => {
    const { userId } = useContext(AuthContext);
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await articleService.getArticlesByUser(userId);
                setArticles(response);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user articles:', error);
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchArticles();
        }
    }, [userId]);

    const handleDeleteClick = (article) => {
        setSelectedArticle(article);
        setShowModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await articleService.remove(selectedArticle._id);
            setArticles(articles.filter(article => article._id !== selectedArticle._id));
            setShowModal(false);
            setSelectedArticle(null);
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    };

    const handleDeleteCancel = () => {
        setShowModal(false);
        setSelectedArticle(null);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="container">
            <div className='new-flex-container'>
                {articles.length > 0 ? (
                    articles.map(article => (
                        <div key={article._id}  className="card-content">
                            <Link to={`/Details/${article._id}`}>
                                <div className='new-card'>
                                    <img className="card-img" src={article.image} alt={article.title} />
                                    <h2 className="card-title">{article.title}</h2>
                                    <p className="card-date">{article._createdOn} by You</p>
                                </div>
                            </Link>
                            <button
                                className="delete-button"
                                onClick={() => handleDeleteClick(article)}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="container">
                    <p className='no-articles'>No articles found.</p>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete the article titled "{selectedArticle?.title}"?</p>
                        <button className="confirm-delete-button" onClick={handleDeleteConfirm}>
                            Yes, Delete
                        </button>
                        <button className="cancel-delete-button" onClick={handleDeleteCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyNews;
