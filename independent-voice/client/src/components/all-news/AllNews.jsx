import React, { useEffect, useState } from 'react';
import './all-news.css'
import Loading from '../loading/Loading';
import * as articleService from "../../services/articleService";
import { Link } from 'react-router-dom';

const AllNews = () => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await articleService.getAll();
                setArticles(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching articles:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) return <Loading />;;
    if (error) return <p>Error loading articles: {error.message}</p>;
    return (
        <div className="container">
            <div className="new-flex-container">
                {articles.map((article) => (
                    <Link
                        key={article._id}
                        to={`/Details/${article._id}`}
                        className="card-content"
                    >
                        <div className="new-card">
                            <img className="card-img" src={article.image} />
                            <h2 className="card-title">{article.title}</h2>
                            <p className="card-date">{article._createdOn} by {article.author.username}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AllNews;

