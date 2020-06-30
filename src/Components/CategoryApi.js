const url ="https://news-mobile-app.herokuapp.com/api/categorys";

export async function getCategory() {
  let result = await fetch(url).then(response => response.json());
  return result;
}
