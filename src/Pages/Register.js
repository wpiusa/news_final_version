import React from 'react';
import { 
  Alert, 
  Dimensions, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  View,
  AsyncStorage
 } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import { Block, Button, Input, Text, theme, } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import * as EmailValidator from 'email-validator';

const { height, width } = Dimensions.get('window');

export default class SignUp extends React.Component {
  state = {
    user: '',
    email: '',
    password: '',
    shortId: '',
    longId: '',
    grade: '',
    school: '',
    data: [],
    active: {
      user: false,
      email: false,
      password: false,
      shortId: false,
      longId: false,
      grade: false,
 
    },
  }

  componentDidMount = () => {
    fetch('https://news-mobile-app.herokuapp.com/api/school/all', {
       method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
       this.setState({
          data: responseJson
       })
    })
    .catch((error) => {
       console.error(error);
    });
 }
  handleChange = (name, value) => {
    this.setState({ [name]: value});
  }

  toggleActive = (name) => {
    const { active } = this.state;
    active[name] =!active[name];
    this.setState({ active: active});
  }

  handlePress = () => {
    const { user, email, password, shortId, longId, grade, school } = this.state;
    fetch('https://news-mobile-app.herokuapp.com/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name : user,
          email,
          password,
          shortId,
          longId,
          grade,
          school
        })
    })
      .then((resp) => {
          AsyncStorage.setItem('user', user);
          AsyncStorage.setItem('school', school);
          this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  userRegister() {
    //const { navigation: { navigate },} = this.props;
    //const { password,password2 } =this.state;
    //const passwordLength = password.length ;
    if (!this.state.user) {
        Alert.alert( 'Enter the name !')
        return
    }

    if (!this.state.email) {
        Alert.alert( 'Enter the email !')
        return
    }

    if (!EmailValidator.validate(this.state.email)) {
      Alert.alert('Invalid email format !');
      this.setState({
        email:''
      })
      return
    }

    if (!this.state.password) {
       Alert.alert( 'Enter the password !')
       return
    } 

    if (!this.state.password) {
      Alert.alert( 'Enter the password !')
      return
    }
    this.handlePress();
    
    //this.setState({
    //  animating:true,
    //})
 }
  
  render() {
    const { navigation } = this.props;
    const { data } = this.state;
    const placeholder = {
      label: 'Select a Grade...',
      value: null,
      color: '#9EA0A4',
    };
    const schoolPlaceholder = {
      label: 'Select a School...',
      value: null,
      color: '#9EA0A4',
    };

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
              </Block>
              <Text color='#fff' center size={theme.SIZES.FONT * 0.875}>
                Student Sign UP
              </Text>
              <Text center color={theme.COLORS.WHITE} size={theme.SIZES.FONT * 0.75}>
                    Already have an account? Sign In
              </Text>      
            </Block>

            <Block flex={1} center space="between">
              <Block center>
                <Input
                  bgColor='transparent'
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  borderless
                  color="white"
                  placeholder="Full Name"
                  autoCapitalize="none"
                  style={[styles.input, this.state.active.user ? styles.inputActive : null]}
                  onChangeText={text => this.handleChange('user', text)}
                  onBlur={() => this.toggleActive('user')}
                  onFocus={() => this.toggleActive('user')}
                />
                <Input
                  bgColor='transparent'
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  borderless
                  color="white"
                  type="email-address"
                  placeholder="Email"
                  autoCapitalize="none"
                  style={[styles.input, this.state.active.email ? styles.inputActive : null]}
                  onChangeText={text => this.handleChange('email', text)}
                  onBlur={() => this.toggleActive('email')}
                  onFocus={() => this.toggleActive('email')}
                />
                <Input
                  bgColor='transparent'
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  borderless
                  color="white"
                  password
                  viewPass
                  placeholder="Password"
                  iconColor="white"
                  style={[styles.input, this.state.active.password ? styles.inputActive : null]}
                  onChangeText={text => this.handleChange('password', text)}
                  onBlur={() => this.toggleActive('password')}
                  onFocus={() => this.toggleActive('password')}
                />
                <Input
                  bgColor='transparent'
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  borderless
                  color="white"
                  shortId
                  viewPass
                  placeholder="Short ID"
                  iconColor="white"
                  style={[styles.input, this.state.active.shortId ? styles.inputActive : null]}
                  onChangeText={text => this.handleChange('shortId', text)}
                  onBlur={() => this.toggleActive('shortId')}
                  onFocus={() => this.toggleActive('shortId')}
                />
                <Input
                  bgColor='transparent'
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  borderless
                  color="white"
                  longId
                  viewPass
                  placeholder="Long ID"
                  iconColor="white"
                  style={[styles.input, this.state.active.longId ? styles.inputActive : null]}
                  onChangeText={text => this.handleChange('longId', text)}
                  onBlur={() => this.toggleActive('longId')}
                  onFocus={() => this.toggleActive('longId')}
                />
                <RNPickerSelect
                  placeholder={placeholder}
                  onValueChange={(value) => this.setState({ grade: value})}
                  items={[
                      { label: 'Freshman ', value: 'Freshman ' },
                      { label: 'Sophomore', value: 'Sophomore' },
                      { label: 'Junior', value: 'Junior'},
                      { label: 'Senior', value: 'Senior'},
                  ]}
                  style={pickerSelectStyles}
                />
                <RNPickerSelect
                  placeholder={schoolPlaceholder}
                  onValueChange={(value) => this.setState({ school: value})}
                  items={data}
                  style={pickerSelectStyles}
                />
                <Block style={styles.container}>
                  
                  <Block flex top style={{ marginTop: 10 }}>
                    <Button
                      shadowless
                      style={{ height: 48 }}
                      color={materialTheme.COLORS.BUTTON_COLOR}
                      //onPress={() => navigation.navigate('Login')}
                      onPress={() => this.userRegister()}
                    >
                      SIGN UP
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