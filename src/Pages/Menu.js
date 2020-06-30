import React from 'react';
import { View, Image, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'galio-framework';

export default class Menu extends React.Component {
  
  renderCategories = () => {
   
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.textTitle}>What would you like to do today?</Text>
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Category')}>
                <View style={styles.iconBox1}>
                    <Image
                      style={styles.icon1}
                      source={{
                        uri: 'https://schoolnewsapp.s3.amazonaws.com/newsicon.jpg',
                      }}
                    />
                    <Text style={styles.iconTitle}>News</Text>
                </View>
            </TouchableOpacity> 

            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Profile')}>
                <View style={styles.iconBox2}>
                    <Image
                      style={styles.icon1}
                      source={{
                        uri: 'https://schoolnewsapp.s3.amazonaws.com/school_id_image/SchoolID1.png',
                      }}
                    />
                    <Text style={styles.iconTitle}>School ID</Text>
                </View>
            </TouchableOpacity> 
        </View>

        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Support')}>
                <View style={styles.iconBox3}>
                    <Image
                      style={styles.icon1}
                      source={{
                        uri: 'https://schoolnewsapp.s3.amazonaws.com/support+_image/Schedule+Image1.png',
                      }}
                    />
                    <Text style={styles.iconTitle}>Support</Text>
                </View>
            </TouchableOpacity> 

            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Login')}>
                <View style={styles.iconBox4}>
                    <Image
                      style={styles.icon1}
                      source={{
                        uri: 'https://schoolnewsapp.s3.amazonaws.com/logout+_image/Log+Out1.png',
                      }}
                    />
                    <Text style={styles.iconTitle}>Log Out</Text>
                </View>
            </TouchableOpacity> 
        </View>
        <ImageBackground
            source={{ uri: 'https://schoolnewsapp.s3.amazonaws.com/background/bg1.png' }}
            style={styles.image}
          >
        </ImageBackground>
      </ScrollView>
    )
  }

  render() {
    return (
      <View>
        {this.renderCategories()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textTitle: {
    marginTop: 62,
    marginLeft: 40,
    marginRight: 20,
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 18,
    display: 'flex',
    alignItems: 'flex-end',
    letterSpacing: -0.02
  },
  iconBox1: {
    marginTop: 50,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    width: 120,
    height: 120,
    marginLeft:80,
  },
  iconBox2: {
    marginTop: 50,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    width: 120,
    height: 120,
    marginLeft: 10
  },
  iconBox3: {
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    width: 120,
    height: 120,
    marginLeft:80,
  },
  iconBox4: {
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    width: 120,
    height: 120,
    marginLeft: 10
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: 320,
    height: 240,
    marginRight: 10,
    marginLeft: 10,
  },
  icon1:{
    width: 44,
    height: 44,
    marginTop: 27,
    alignSelf: 'center'
  },
  iconTitle: {
    alignSelf: 'center'
  }
});
