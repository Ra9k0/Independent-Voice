import * as request from "../lib/request";

const baseUrl = 'http://localhost:3033/data/comments'

export const getCommentsByArticleId = async (articleId, userId) => {
    const query = new URLSearchParams({
        where: `newsId="${articleId}"`,
        load: `author=authorId:users`,
    })
    const result = await request.get(`${baseUrl}?${query}`);

    return result;
};

export const addComment = async (comment) => {
    const result = await request.post(baseUrl, comment);

    return result;
};