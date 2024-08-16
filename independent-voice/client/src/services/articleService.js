import * as request from "../lib/request";

const baseUrl = 'http://localhost:3033/data/news'

export const getOne = async (articleId) => {
    const query = new URLSearchParams({
        load: `author=authorId:users`,
    });

    const result = await request.get(`${baseUrl}/${articleId}?${query}`);
    return result;
}

export const getAll = async () => {
    const query = new URLSearchParams({
        load: `author=authorId:users`,
    });

    const result = await request.get(`${baseUrl}?${query}` );

    return result;
}

export const update = async (articleId, article) => {
    const result = await request.put(`${baseUrl}/${articleId}`, article);

    return result;
};

export const create = async (article) => {
    const result = await request.post(baseUrl, article);

    return result;
};

export const getArticlesByUser = async (userId) => {
    const query = new URLSearchParams({
        where: `authorId="${userId}"`
    })
    const result = await request.get(`${baseUrl}?${query}`);
    console.log(`${baseUrl}?${query}`)

    return result;
};

export const remove = async (newId) => request.remove(`${baseUrl}/${newId}`);