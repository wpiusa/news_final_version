import React from 'react';
import { FlatList, Text, View, AsyncStorage, ActivityIndicator,} from 'react-native';
import Article from '../Components/Article';
import Colors from '../../Colors';
import { getArticle } from '../../Api';

export default class NewsPage extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
          animating: false,
          items: []
        };
      }
    
      componentDidMount() {
        this.getUserId();
      }
    
      getUserId = async () => {
        const catTitle = await AsyncStorage.getItem('catTitle') ;
        this.loadArticle(catTitle);
        return;
      }
    
      loadArticle =  (catTitle) => {
        fetch(`https://news-mobile-app.herokuapp.com/api/article/title/${catTitle}`, {
            method: 'GET'
      })
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({
                items: responseJson.news[0].items
              })
            })
            .catch((error) => {
            console.error(error);
            });  
      }
    
      openArticle = (item) => {
        AsyncStorage.setItem('articleTitle', item.title);
        AsyncStorage.setItem('articleImage', item.image);
        AsyncStorage.setItem('articleContent', item.content);
        AsyncStorage.setItem('articleViews', item.views);
        AsyncStorage.setItem('articleCategory', item.category);
        AsyncStorage.setItem('articlePublishedAt', item.published_at);
        this.props.navigation.navigate('Details');
      }
    render(){
        return(
            <FlatList
              style={{ backgroundColor: Colors.background, marginTop: 7 }}
              data={this.state.items}
              renderItem={({ item }) => <Article article={item} onPress={() => this.openArticle(item)} />}
              keyExtractor={item => item.title}
            />
        );
    }
}   