import React from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  ActivityIndicator 
} from 'react-native';

import Constants from 'expo-constants';
import Colors from '../../Colors';
import Article from '../Components/Article';
import Carousel from '../Components/Carousel';
import { getHomeItems } from '../../Api';

export default class HomePage extends React.Component {
    static navigationOptions = {
        headerShown: false
      }
    
      constructor(props) {
        super(props);
        this.state = {
          loading: true,
          items: [],
        };
      }
    
    componentDidMount() {
        this.loadArticle();
    }

    loadArticle = () => {
        if (!this.state.loading) this.setState({ loading: true });
    
        getHomeItems()
          .then(response => {
            this.setState(
              {
                loading: false,
                items: response.items,
              });
          }).catch(() => {
            this.setState({ loading: false });
          });
     }

    openArticle = (item) => {
        this.props.navigation.navigate('Details', { article: item, title: item.title })
    }

    renderItem = (item, index) => {
        if (item.items.length === 0) return null;
    
        let result = null;
        switch (item.type) {
          case 'list':
            result = item.items.map(i => <Article key={i.title} article={i} onPress={() => this.openArticle(i)} />);
            break;
          case 'carousel':
            result = <Carousel items={item.items} onPress={(item) => this.openArticle(item)} />;
            break;
        }
    
        return (
          <View key={item._id}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            {result}
          </View>
        );
      }
    
    render() {
        return (
          <SafeAreaView style={styles.container}>
            <ScrollView>
              <StatusBar hidden={false} barStyle={Colors.statusBarStyle} />
              {
                this.state.items.map(this.renderItem)
              }
              {
                this.state.loading && <ActivityIndicator size="large" />
              }
            </ScrollView>
          </SafeAreaView>
        );
      }
}  

const styles = StyleSheet.create({
    container: { backgroundColor: Colors.background, marginBottom: 80, height: '100%', paddingTop: Constants.statusBarHeight },
    title: { color: Colors.text, marginVertical: 7, marginLeft: '5%', fontSize: 24, fontWeight: 'bold' }
  })