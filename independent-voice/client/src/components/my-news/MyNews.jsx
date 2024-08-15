import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import * as articleService from '../../services/articleService';
import AuthContext from '../../contexts/AuthContext';
import Loading from '../loading/Loading';
import '../all-news/all-news.css'

const MyNews = () => {
    const { userId } = useContext(AuthContext);
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="container">
            <div className='new-flex-container'>
                {articles.length > 0 ? (
                    articles.map(article => (
                        <Link key=
                        {article._id} 
                        className="card-content"
                        to={`/Details/${article._id}`}
                        >
                            <div className="new-card">
                            <img className="card-img" src={article.image} />
                            <h2 className="card-title">{article.title}</h2>
                            <p className="card-date">{article._createdOn} by </p>
                        </div>
                        </Link>
                    ))
                ) : (
                    <p>No articles found.</p>
                )}
            </div>
            </div>
    );
};

export default MyNews;
