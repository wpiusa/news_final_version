const url ="https://news-mobile-app.herokuapp.com/api/article/all";

export async function getNews(cat) {
  let result = await fetch(url+cat).then(response => response.json());
  return result;
}