import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import './article-details.css';
import * as articleService from "../../services/articleService";
import Loading from '../loading/Loading';
import AuthContext from '../../contexts/AuthContext';
import * as commentService from "../../services/commentService";

const ArticleDetails = () => {
    const { articleId } = useParams();
    const { userId } = useContext(AuthContext);
    const [article, setArticle] = useState(null);
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [loadEditButton, setLoadEditButton] = useState(false);
    const isAuthenticated = !!userId;

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

        const fetchComments = async () => {
            try {
                const commentsResponse = await commentService.getCommentsByArticleId(articleId, userId);
                setComments(commentsResponse);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchArticle();
        fetchComments();
    }, [articleId]);

    useEffect(() => {
        if (!isLoading && (isAuthenticated && article.authorId == userId)) {
            setLoadEditButton(true);
        }
    }, [isLoading]);

    const handleLike = () => setLikeCount(likeCount + 1);
    const handleDislike = () => setDislikeCount(dislikeCount + 1);
    const handleCommentChange = (e) => setCommentText(e.target.value);
    const handleCommentSubmit = async () => {
        if (commentText.trim() !== '') {
            const newComment = {
                authorId: userId,
                content: commentText,
                author: article.author,
                newsId: articleId,
                _createdOn: new Date().toISOString(),
                _updatedOn: new Date().toISOString(),
            };

            try {
                const savedComment = await commentService.addComment(newComment);
                setComments([...comments, savedComment]);
                setCommentText('');
            } catch (error) {
                console.error('Error posting comment:', error);
            }
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="container">
            <div className="article-container">
                {loadEditButton && (
                    <Link to={`/EditNew/${article._id}`} className="edit">Edit</Link>
                )}
                <header className="article-header">
                    <h1>{article.title}</h1>
                    <p className="article-meta">Published on {article._createdOn}, by {article.author.username}</p>
                </header>

                <div className="article-content">
                    <img src={article.image} alt="News" className="article-image" />
                    <p>{article.content}</p>
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
                        {comments.reverse().map((comment, index) => (
                            <div className="comment" key={index}>
                                <p><strong>{comment.author.username}:</strong> {comment.content}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ArticleDetails;
