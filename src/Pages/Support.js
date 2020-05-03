import React from 'react';
import { Alert, Dimensions, StyleSheet, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Block, Button, Input, Text, theme, } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../constants/';
import { HeaderHeight } from "../constants/utils";
import * as EmailValidator from 'email-validator';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
const { height, width } = Dimensions.get('window');

export default class Support extends React.Component {
  state = {
    title: '',
    desc: '',
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value});
  }

  handlePress = () => {
    const { title, desc } = this.state;
    fetch('https://news-mobile-app.herokuapp.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          desc,
        })
    })
      .then((resp) => {
          this.props.navigation.navigate('Menu');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  userSupport() {
    if (!this.state.title) {
      Alert.alert('Enter the support title!');
      return
    } 

    if (!this.state.desc) {
      Alert.alert('Enter the support decription!');
      return
    }
    this.handlePress();
 }
 
  render() {
  
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0.25, y: 1.1 }}
        locations={[0.2, 1]}
        colors={['#6C24AA', '#15002B']}
        style={[styles.signup, { flex: 1, paddingTop: theme.SIZES.BASE * 1 }]}>
        <Block flex middle>
          <KeyboardAvoidingView behavior="padding" enabled>
            <Block style={{ marginBottom: height * 0.01 }}>
              <Block row center space="between" style={{ marginVertical: theme.SIZES.BASE * 1.275 }}>
                <Block flex middle right>
                    <Button
                        round
                        onlyIcon
                        iconSize={theme.SIZES.BASE * 1.625}
                        icon="home"
                        iconFamily="font-awesome"
                        color={theme.COLORS.FACEBOOK}
                        shadowless
                        iconColor={theme.COLORS.WHITE}
                        style={styles.topIcon}
                    />
                </Block>
                <Block flex middle center>
                    <Button
                        round
                        onlyIcon
                        iconSize={theme.SIZES.BASE * 1.625}
                        icon="users"
                        iconFamily="font-awesome"
                        color={theme.COLORS.BASE}
                        shadowless
                        iconColor={theme.COLORS.WHITE}
                        style={styles.topIcon}
                    />
                </Block>
                <Block flex middle left>
                    <Button
                        round
                        onlyIcon
                        iconSize={theme.SIZES.BASE * 1.625}
                        icon="gear"
                        iconFamily="font-awesome"
                        color={theme.COLORS.DRIBBBLE}
                        shadowless
                        iconColor={theme.COLORS.WHITE}
                        style={styles.topIcon}
                    />
                </Block>
              </Block>
            </Block>

            <Block flex={1} center space="between">
              <Block center>
                <Input
                  bgColor='transparent'
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  borderless
                  color="white"
                  placeholder="Support Title"
                  autoCapitalize="none"
                  style={[styles.input, styles.inputActive]}
                  onChangeText={text => this.handleChange('title', text)}
                />
                <Block style={styles.container}>
                    <AutoGrowingTextInput 
                      style={[styles.input, styles.textArea]} 
                      placeholder={'Your Support Message'}
                />
                </Block>
                <Block style={styles.container}>
                  
                  <Block flex top style={{ marginTop: 10 }}>
                    <Button
                      shadowless
                      style={{ height: 48 }}
                      color={materialTheme.COLORS.BUTTON_COLOR}
                      onPress={() => this.userSupport()}
                    >
                      Submit Support
                    </Button>
                </Block>
              </Block>
          
              </Block>
              
            </Block>
          </KeyboardAvoidingView>
        </Block>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
    signup: {
        marginTop: Platform.OS ==='android' ? -HeaderHeight : 0,
    },
    topIcon: {
        width: theme.SIZES.BASE * 3.5,
        height: theme.SIZES.BASE * 3.5,
        borderRadius: theme.SIZES.BASE * 1.75,
        justifyContent: 'center',
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset:{
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 1
    },
    input: {
        width: width * 0.9,
        borderRadius: 0,
        borderBottomWidth: 1,
        borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
    },
    inputActive: {
        borderBottomColor: "white"
    },
    textArea: {
      borderBottomColor: "white",
      color: 'white'
    },
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: "center"
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'white',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'white',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });