import React from 'react';
import { 
    StyleSheet, 
    Dimensions, 
    ScrollView, 
    Image, 
    ImageBackground, 
    Platform, 
    View,
    AsyncStorage 
} from 'react-native';

import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '../Components/Icon';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";

const { width } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default class Profile extends React.Component {
    state = {
        data: [],
    };  

    componentDidMount() {
        this.getUserId();
    }
     
    getUserId = async () => {
        console.log('get id');
        const userid = await AsyncStorage.getItem('userid') ;
        //console.log('profile user id');
        //console.log(userid);
        this.getUserProfile(userid); //call api and send user id to function
        return;
    }

    getUserProfile =  (userid) => {
        console.log('inside getuserProfile user id');
        console.log(userid);
        fetch(`https://news-mobile-app.herokuapp.com/api/users/email/${userid}`, {
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

    render(){
        const { data } = this.state;
        const { name, shortId, longId, grade, status } = data;
        return(
            <Block flex style={styles.Profile}>
                <ImageBackground
                    source={{ uri: Images.Avatar}}
                    style={styles.profileContainer}
                    imageStyle={styles.profileImage}
                >
                    <Block flex style={styles.profileDetails}>
                        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
                    </Block>
                </ImageBackground>
                <Block flex={1.5}>
                    <Block style={styles.digitalId}>
                        <ScrollView verticL={true} showsVerticalScrollIndicator={false}>
                            <Block row  style={{ padding: theme.SIZES.BASE }}>
                                <Block>
                                    <Text 
                                        size={20}
                                        style={{ paddingBottom: 2}}
                                        >
                                        {name}
                                    </Text>
                                </Block>
                                
                            </Block>
                            <Block row  style={{ padding: theme.SIZES.BASE }}>
                                <Block>
                                    <Text 
                                        size={20}
                                        style={{ paddingBottom: 4}}
                                        >
                                        {grade}
                                    </Text>
                                </Block>
                            </Block>
                            <Block row style={{ padding: 2 }}>
                                <Text bold size={20} style={{marginBottom: 4}}>Short ID:</Text>
                                <Text muted size={20} style={{color:'blue', paddingHorizontal:4}}>{shortId}</Text>
                            </Block>
                            <Block row style={{ padding: 2 }}>
                                <Text bold size={20} style={{marginBottom: 4}}>Long ID:</Text>
                                <Text muted size={20} style={{color:'blue', paddingHorizontal:4}}>{longId}</Text>
                            </Block>
                            <Block row style={{ padding: 2 }}>
                                <Text bold size={20} style={{marginBottom: 6}}>Status:</Text>
                                <Text muted size={20} style={{color:'red', paddingHorizontal:4}}>{status}</Text>
                            </Block>
                        </ScrollView>
                    </Block>
                </Block>
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    Profile: {
        marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    },
    profileTexts: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE * 2,
        zIndex: 2
    },
    profileImage: {
        width: width * 1.1,
        height: 'auto',
    },
    profileContainer: {
        width: width,
        height: 'auto',
        flex: 1,
    },
    profileDetails: {
        paddingTop: theme.SIZES.BASE * 4,
        justifyContent: 'flex-end',
        position: 'relative',
    },
    grade: {
        marginRight: theme.SIZES.BASE / 2,
    },
    gradient: {
        zIndex: 1,
        left: 0,
        right: 0,
        bottom: 0,
        height: '30%',
        position: 'absolute',
    },
    digitalId: {
        position: 'relative',
        paddingHorizontal: theme.SIZES.BASE,
        paddingVertical: theme.SIZES.BASE,
        marginHorizontal: theme.SIZES.BASE,
        marginTop: -theme.SIZES.BASE,
        marginBottom: 0,
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        zIndex: 2,
    }
});   