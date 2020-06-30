import React from 'react';
import { 
  StyleSheet, 
  ScrollView,
  Text,
  Dimensions,
  AsyncStorage, 
} from 'react-native';

import { WebView } from 'react-native-webview';
import colors from '../utils/colors';

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { detailArticle: '',  };
    }
   
    async componentDidMount(){
        const detailArticle = await AsyncStorage.getItem('detailArticle') ; 
        this.setState({detailArticle});
    }

  
   render() {
    const { detailArticle } = this.state;
    console.log('detailArticle', detailArticle);
    const itemHTML = detailArticle;
    
     return (
       <WebView 
         source={{uri: itemHTML}}
        
       />
     );
   }
}