import React from 'react';
import { FlatList, Text, View } from 'react-native';
import Article from '../Components/Article';
import Colors from '../../Colors';
import { getArticle } from '../../Api';

export default class NewsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          category_id: props.navigation.getParam('title', null),
          items: []
        };
      }
    
      componentDidMount() {
        this.loadArticle();
      }
    
      handleRefresh = () => {
        this.setState({ loading: true, items: [] }, this.loadArticle);
      }
    
    
      loadArticle = () => {
       if (!this.state.loading) this.setState({ loading: true });
        getArticle(this.state.category_id)
          .then(response => {
            console.log('response news page', response);
            this.setState(prevState =>
              ({
                loading: false,
                items: response.news[0].items
              }));
          }).catch(() => {
            this.setState({ loading: false });
          })
      }
    
      openArticle = (item) => {
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