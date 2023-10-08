const GnewsApi = require('gnews-node-api');
const express = require('express');
const validator = require('validator');
const router = express.Router();
const { client } = require('../config/config.redis.js');

require('dotenv').config()

const API_KEY = process.env.API_KEY;
const CACHE_TIMEOUT = process.env.CACHE_TIMEOUT;
const newsApi = new GnewsApi(API_KEY);


// TODO: Add more other possible error, create a generic function for handling errors.
const getErrorStatus = (errors) => {
    const queryErrorList = ['The query has a syntax error (see https://gnews.io/docs/v4#search-operators).',
        'The query is required.'];
    if (errors.q !== undefined && queryErrorList.includes(errors.q)) {
        return 400;
    }
    if (errors.includes('Your API key is invalid.')) {
        return 403;
    }
    return 400;
}

// TODO: Make cache into a middleware.
const cache = async (key, resp) => {
    const result = await client.get(key);
    if (result) {
        resp.status(200).json({ articles: JSON.parse(result) });
        return true;
    }
    return false;
};

// Get n - general new's articles 
router.get('/articles/:n', async (req, resp, next) => {
    const { n } = req.params;

    const cacheCheck = await cache(String(n), resp);
    if (cacheCheck) return;

    if (!validator.isNumeric(n) || n < 0) {
        resp.status(400).json({
            param: 'n',
            msg: 'No of artices should be a number.',
        });
        return;
    }

    newsApi.getTopHeadLines({
        category: 'general',
        lang: 'en',
        max: n,
    }).then(data => {
        if (data.errors !== undefined) {
            resp.status(getErrorStatus(data.errors)).json({ errors: data.errors });
        } else {
            const jsonString = JSON.stringify(data.articles);
            client.SETEX(String(n), CACHE_TIMEOUT, jsonString);
            resp.status(200).json({ artices: data.articles })
        }
    }).catch((error) => {
        console.error(error);
        resp.status(500).json({ error: "Internal Server Error" });
    });

});

// Query by topic and author.
router.get('/articles/query/:query', async (req, resp, next) => {
    const query = req.params.query;

    const cacheCheck = await cache(query, resp);
    if (cacheCheck) return;

    const articles = await newsApi.searchNews({
        q: query,
        lang: 'en',
        sortby: 'relevance',
    }).then((data) => {
        if (data.errors !== undefined) {
            resp.status(getErrorStatus(data.errors)).json({ errors: data.errors });
        } else {
            const jsonString = JSON.stringify(data.articles);
            client.SETEX(query, CACHE_TIMEOUT, jsonString);
            resp.status(200).json({ artices: data.articles })
        }
    }).catch((error) => {
        console.log(error);
        resp.status(500).json({ error: "Internal Server Error" });
    })
});

// Query by keywords.
router.post('/articles/keywords', async (req, resp, next) => {
    const keywords = req.body.keywords;
    const queries = keywords.join(" OR ");

    const cacheCheck = await cache(queries, resp);
    if (cacheCheck) return;

    const artices = await newsApi.searchNews({
        q: queries,
        lang: 'en',
        sortby: 'relevance',
    }).then((data) => {
        if (data.errors !== undefined) {
            resp.status(getErrorStatus(data.errors)).json({ errors: data.errors });
        } else {
            const jsonString = JSON.stringify(data.articles);
            client.SETEX(queries, CACHE_TIMEOUT, jsonString);
            resp.status(200).json({ artices: data.articles })
        }
    }).catch((error) => {
        resp.status(500).json({ error: "Internal Server Error" })
    })
})

module.exports = router;