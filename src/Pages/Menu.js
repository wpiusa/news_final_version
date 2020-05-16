import React from 'react';
import { Alert, StyleSheet, Dimensions, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { Block, Text, theme, Button } from 'galio-framework';

const { width } = Dimensions.get('screen');

export default class Menu extends React.Component {
  
  renderCategories = () => {
   
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
        <Block flex>
            <Block flex card style={[styles.category, styles.shadow]}>
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('Category')}>
                  <ImageBackground
                          source={{ uri: 'https://schoolnewsapp.s3.amazonaws.com/news.jpeg' }}
                          style={[styles.imageBlock, { width: width - (theme.SIZES.BASE * 2), height: 150 }]}
                          imageStyle={{ width: width - (theme.SIZES.BASE * 2), height: 150 }}
                      >
                      <Block style={styles.categoryTitle}>
                          <Text size={18} bold color={theme.COLORS.WHITE}>News</Text>
                      </Block>
                  </ImageBackground>
                </TouchableOpacity> 
            </Block>
        </Block>

        <Block flex>
            <Block flex card style={[styles.category, styles.shadow]}>
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('Profile')}>
                  <ImageBackground
                          source={{ uri: 'https://schoolnewsapp.s3.amazonaws.com/schoolID.jpeg' }}
                          style={[styles.imageBlock, { width: width - (theme.SIZES.BASE * 2), height: 150 }]}
                          imageStyle={{ width: width - (theme.SIZES.BASE * 2), height: 150 }}
                      >
                      <Block style={styles.categoryTitle}>
                          <Text size={18} bold color={theme.COLORS.WHITE}>Digital ID</Text>
                      </Block>
                  </ImageBackground>
                </TouchableOpacity> 
            </Block>
        </Block>

        <Block flex>
            <Block flex card style={[styles.category, styles.shadow]}>
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('Support')}>
                  <ImageBackground
                          source={{ uri: 'https://schoolnewsapp.s3.amazonaws.com/support.jpeg' }}
                          style={[styles.imageBlock, { width: width - (theme.SIZES.BASE * 2), height: 150 }]}
                          imageStyle={{ width: width - (theme.SIZES.BASE * 2), height: 150 }}
                      >
                      <Block style={styles.categoryTitle}>
                          <Text size={18} bold color={theme.COLORS.WHITE}>Support</Text>
                      </Block>
                  </ImageBackground>
                </TouchableOpacity> 
            </Block>
        </Block>
        <Block flex>
            <Block flex card style={[styles.category, styles.shadow]}>
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('Login')}>
                  <ImageBackground
                          source={{ uri: 'https://schoolnewsapp.s3.amazonaws.com/logout.jpeg' }}
                          style={[styles.imageBlock, { width: width - (theme.SIZES.BASE * 2), height: 150 }]}
                          imageStyle={{ width: width - (theme.SIZES.BASE * 2), height: 150 }}
                      >
                      <Block style={styles.categoryTitle}>
                          <Text size={18} bold color={theme.COLORS.WHITE}>Log Out</Text>
                      </Block>
                  </ImageBackground>
                </TouchableOpacity> 
            </Block>
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.categories}>
        {this.renderCategories()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  categories: {
    width: width,
  },
  categoryList: {
    justifyContent: 'center',
    paddingTop: theme.SIZES.BASE * 1.5,
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginHorizontal: theme.SIZES.BASE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    elevation: 2,
  }
});
