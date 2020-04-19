import { Alert, Dimensions, StyleSheet, KeyboardAvoidingView, Platform, View } from 'react-native';
const BASE_URL = 'https://news-mobile-app.herokuapp.com/';
const API_URL = BASE_URL + 'api/';
const getData = async (endpoint) => {
    let result;
    if (endpoint ==='categorys/all'){
        result = await fetch(API_URL + endpoint).then((res) => res.json());
    }else if ( endpoint ==='article/all'){
        result = await fetch(API_URL + endpoint).then((res) => res.json());
    }else if ( endpoint ==='article/title/'){
        result = await fetch(API_URL + endpoint).then((res) => res.json());  
        console.log('api get article', result);
    }else{
        result = await fetch(API_URL + endpoint).then((res) => res.json());
    }
    return result;
}



export const getArticle = async (article_title) => {
    return getData('article/title/' + article_title);
}
export const getArticleDetail = async (article_id) => {
    return getData('newsdetail/' + article_id);
}
export const getCategories = async () => {
    return getData('categorys/all');
}
export const getHomeItems = async () => {
    return getData('article/all');
}
