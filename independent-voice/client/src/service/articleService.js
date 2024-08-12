import * as request from "../lib/request";

const baseUrl = 'http://localhost:3033/data/news'

export const getOne = async (articleId) => {
    
    const result = await request.get(`${baseUrl}/${articleId}`, );
    return result;
}

export const getAll = async () => {

    const result = await request.get(`${baseUrl}`, );

    return result;
}