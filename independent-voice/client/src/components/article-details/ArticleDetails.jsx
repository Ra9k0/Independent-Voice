import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './article-details.css';
import * as articleService from "../../service/articleService";

const ArticleDetails = () => {
    const { articleId } = useParams();

    // State management for article data, likes, dislikes, and comments
    const [article, setArticle] = useState(null);
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [comments, setComments] = useState([
        { name: 'Alice', text: 'This is an interesting article! Thanks for sharing.' },
        { name: 'Bob', text: 'I disagree with some points here, but overall a good read.' }
    ]);
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await articleService.getOne(articleId);
                setArticle(response); // Assuming response contains the article data
                if (response) {
                    setLikeCount(response.likes || 0);
                    setDislikeCount(response.dislikes || 0);
                }
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchArticle();
    }, [articleId]);

    // Handlers for like, dislike, and comment actions
    const handleLike = () => setLikeCount(likeCount + 1);
    const handleDislike = () => setDislikeCount(dislikeCount + 1);
    const handleCommentChange = (e) => setCommentText(e.target.value);
    const handleCommentSubmit = () => {
        if (commentText.trim() !== '') {
            setComments([...comments, { name: 'You', text: commentText }]);
            setCommentText('');
        }
    };

    if (!article) {
        return <p>Loading...</p>;
    }

    return (
        <div className="article-container">
            <header className="article-header">
                <h1>{article.title}</h1>
                <p className="article-meta">Published on {article._createdOn}, by John Doe</p>
            </header>

            <div className="article-content">
                <img src="news-image.jpg" alt="News" className="article-image" />
                <p>{article.content}</p>
                <p>Phasellus sit amet turpis a odio bibendum tincidunt. Integer fermentum nisi sit amet purus ultricies, nec fermentum orci vehicula. Sed sed nisi ac quam efficitur vulputate.</p>
            </div>

            <div className="article-actions">
                <div className="like-dislike">
                    <button className="like-btn" onClick={handleLike}>👍 Like <span className="like-count">{likeCount}</span></button>
                    <button className="dislike-btn" onClick={handleDislike}>👎 Dislike <span className="dislike-count">{dislikeCount}</span></button>
                </div>
                <div className="share-buttons">
                    <button className="share-btn">Share on Twitter</button>
                    <button className="share-btn">Share on Facebook</button>
                </div>
            </div>

            <section className="comments-section">
                <h2>Comments</h2>
                <div className="comment-form">
                    <textarea
                        id="comment-input"
                        value={commentText}
                        onChange={handleCommentChange}
                        placeholder="Write your comment here..."
                    ></textarea>
                    <button className="submit-comment" onClick={handleCommentSubmit}>Post Comment</button>
                </div>
                <div className="comments-list">
                    {comments.map((comment, index) => (
                        <div className="comment" key={index}>
                            <p><strong>{comment.name}:</strong> {comment.text}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ArticleDetails;
