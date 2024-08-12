import React, { useState, useEffect } from 'react';
import './news-grid.css';
import * as articleService from "../../../service/articleService";
import { Link } from 'react-router-dom';
import Loading from '../../loading/Loading';

const NewsGrid = () => {
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

  const firstArticle = articles[0];
  const topArticles = articles.slice(1, 5);
  const bottomArticles = articles.slice(5,10);
  return (
    <div>
      <div className="flex-container">
          <Link
              to={`/Details/${firstArticle._id}`}
              className="flex-item big-item"
              style={{ fontSize: '50px' }}
            >  
                <span>{firstArticle.title}</span>
          </Link>
        <div className="small-items-container">
          {topArticles.map((article) => (
            <Link
              key={article._id}
              to={`/Details/${article._id}`}
              className="flex-item small-item"
              style={{ fontSize: '30px' }}
            >
              <span>{article.title}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex-bottom-container">
        {bottomArticles.map((article) => (
          <Link
          key={article._id}
          to={`/Details/${article._id}`}
          className="flex-item small-item"
          style={{ fontSize: '25px' }}
        >
            <span>{article.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;
