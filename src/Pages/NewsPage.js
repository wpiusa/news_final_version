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
          category_id: '',
          items: []
        };
      }
    
      componentDidMount() {
        this.getUserId();
        this.loadArticle();
      }
    
      closeActivityIndicator = () => setTimeout(() => this.setState({
        animating: false }), 3000)


      getUserId = async () => {
        const catTitle = await AsyncStorage.getItem('catTitle') ;
        this.setState({ category_id: catTitle})
        return;
      }

      handleRefresh = () => {
        this.setState({ loading: true, items: [] }, this.loadArticle);
      }
    
      //https://news-mobile-app.herokuapp.com/api/article/title/Business
    
      loadArticle = () => {
       //if (!this.state.loading) this.setState({ loading: true });
        getArticle(this.state.category_id)
          .then(response => {
            this.setState(prevState =>
              ({
                loading: false,
                items: response.news[0].items
              }));
          }).catch(() => {
            this.setState({ loading: false });
          })
      }

    /*
      loadArticle =  () => {
          fetch(`https://news-mobile-app.herokuapp.com/api/article/title/${this.state.category_id}`, {
              method: 'GET'
          })
              .then((response) => response.json())
              .then((responseJson) => {

                this.setState({
                    //data: responseJson,
                    items: responseJson.news[0].items
                })
              })
              .catch((error) => {
              console.error(error);
              });  
      }
*/
      openArticle = (item) => {
        console.log('detail item');
        console.log(item);
        this.props.navigation.navigate('Details', { article: item, title: item.title })
      }
    render(){
        return(
            <FlatList
              style={{ backgroundColor: Colors.background, marginTop: 7 }}
              data={this.state.items}
              renderItem={({ item }) => <Article article={item} onPress={() => this.openArticle(item)} />}
              keyExtractor={item => item.title}
              refreshing={this.state.loading}
              onRefresh={this.handleRefresh}
          />
        );
    }
}   