import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import './article-details.css';
import * as articleService from "../../services/articleService";
import Loading from '../loading/Loading';
import AuthContext from '../../contexts/AuthContext';

const ArticleDetails = () => {
    const { articleId } = useParams();

    const [article, setArticle] = useState(null);
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [comments, setComments] = useState([
        { name: 'Alice', text: 'This is an interesting article! Thanks for sharing.' },
        { name: 'Bob', text: 'I disagree with some points here, but overall a good read.' }
    ]);
    const [commentText, setCommentText] = useState('');
    
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useContext(AuthContext);
    const isAuthenticated = !!userId;
    const [loadEditButton, setLoadEditButton] = useState(false);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await articleService.getOne(articleId);
                setArticle(response);
                if (response) {
                    setLikeCount(response.likes);
                    setDislikeCount(response.dislikes);
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching article:', error);
                setIsLoading(false);
            }
        };

        fetchArticle();
    }, [articleId]);

    useEffect(() => {
        if (!isLoading && (isAuthenticated && article.authorId == userId)) {
            setLoadEditButton(true);
        }
    }, [isLoading]);

    const handleLike = () => setLikeCount(likeCount + 1);
    const handleDislike = () => setDislikeCount(dislikeCount + 1);
    const handleCommentChange = (e) => setCommentText(e.target.value);
    const handleCommentSubmit = () => {
        if (commentText.trim() !== '') {
            setComments([...comments, { name: 'You', text: commentText }]);
            setCommentText('');
        }
    };
    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="container">
            <div className="article-container">
                {loadEditButton && (
                <Link
                    to={`/EditNew/${article._id}`}
                    className="edit"
                >
                    Edit
                </Link>)}
                <header className="article-header">
                    <h1>{article.title}</h1>
                    <p className="article-meta">Published on {article._createdOn}, by {article.author.username}</p>
                </header>

                <div className="article-content">
                    <img src={article.image} alt="News" className="article-image" />
                    <p>{article.content}</p>
                    <p>Phasellus sit amet turpis a odio bibendum tincidunt. Integer fermentum nisi sit amet purus ultricies, nec fermentum orci vehicula. Sed sed nisi ac quam efficitur vulputate.</p>
                </div>

                <div className="article-actions">
                    <div className="like-dislike">
                        <button className="like-btn" onClick={handleLike}>👍 Like <span className="like-count">{likeCount}</span></button>
                        <button className="dislike-btn" onClick={handleDislike}>👎 Dislike <span className="dislike-count">{dislikeCount}</span></button>
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
        </div>
    );
};

export default ArticleDetails;
