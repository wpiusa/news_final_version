import React,{ Component } from 'react';
import { 
  Text, 
  View, 
  StyleSheet,
  Platform, 
  ActivityIndicator,
  FlatList,
  Alert,
  AsyncStorage,
} from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../utils/colors';
import Article from '../Components/Article';
export default class NewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true };
  }
    componentDidMount() {
      this.getUserId();
    }

    getUserId = async () => {
      const catTitle = await AsyncStorage.getItem('catTitle') ;
      this.fetchNews(catTitle);
      return;
    }

    fetchNews =  (catTitle) => {
      fetch(`https://news-mobile-app.herokuapp.com/api/article/all`, {
          method: 'GET'
      })
          .then((response) => response.json())
          .then((responseJson) => {
            const cat = responseJson.filter(item => item.category === catTitle);
            this.setState({
              articles: cat,
              refreshing: false,
            })
          })
          .catch((error) => {
          console.error(error);
          });  
  }

    handleRefresh() {
      this.setState(
        {
          refreshing: true
        },
        () => this.fetchNews()
      );
    }

    renderItem = ({ item }) => {  
      const {
        navigation: { navigate },
      } = this.props; 
      const { articles, articleDetailUrl }=this.state;
      const { _id,author,title,description,category,headerimgURL,articleURL,date} = item;
      
      return (
        <Article
            article={item}
            onPress={
              () => {
                console.log('on press');
                AsyncStorage.setItem('detailArticle', item.articleURL);
                this.props.navigation.navigate('Details');
              }
            }              
        />
      );
    };

    renderFooter = () => {
      const { articles, articleDetailUrl }=this.state;
      if (articles.length != 0) return null;
      
      return <Text style={styles.nodataTextStyle}>There is no articles avilable this time. Coming Soon !</Text>
    };

    render(){
        if (this.state.articles){
          return(
            <FlatList
                data={this.state.articles}
                renderItem={this.renderItem}
                keyExtractor={item => item.title}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh.bind(this)}
                ListFooterComponent={this.renderFooter}
            />
          )
        } 
        
    }
}   

const styles ={
  nodataTextStyle:{
    margin:40,
    fontSize:20,
    color:'red',
  }
}