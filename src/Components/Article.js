import React from 'react';
import { View, Linking, TouchableOpacity } from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-elements';
import moment from 'moment';

export default class Article extends React.Component {
  
  render() {
    const {
      _id,
      title,
      description,
      author,
      headerimgURL,
      articleURL,
      category,
      date
    } = this.props.article;
    
    const { noteStyle, featuredTitleStyle } = styles;
    const time = moment(date || moment.now()).fromNow();
    const defaultImg =
      'https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg';

    return (
      <TouchableOpacity
        useForeground
        //onPress={() => Linking.openURL(url)}
        onPress={this.props.onPress}
      >
        <Card
         
          image={{
            uri: headerimgURL || defaultImg
          }}
        >
          <Text style={styles.featuredTitleStyle}>{title}</Text>
          <Divider style={{ backgroundColor: '#dfe6e9' }} />
          <Text style={{ marginBottom: 10 }}>
            {description || 'Read More..'}
          </Text>
          <Divider style={{ backgroundColor: '#dfe6e9' }} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={noteStyle}>{author}</Text>
            <Text style={noteStyle}>{time}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = {
  noteStyle: {
    margin: 5,
    fontStyle: 'italic',
    color: '#b2bec3',
    fontSize: 12
  },
  featuredTitleStyle: {
    marginBottom: 15,
    marginHorizontal: 5,
    textShadowColor: '#00000f',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  }
};
