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
        const userid = await AsyncStorage.getItem('userid') ;
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
        const { 
            name, 
            shortId, 
            longId, 
            grade, 
            status, 
            ASB, 
            sixPeriod, 
            lunchPeriod,
            reject,
            rejectReason, 
        } = data;
        const asbStatus = ASB ? "Yes": "No";
        const sixPeriodStatus = sixPeriod ? "Yes": "No";
        const lunchPeriodStatus = lunchPeriod ? "Yes": "No";
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
                            <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
                                    <Block middle>
                                        <Text bold size={16} style={{marginBottom: 8}}>{name}</Text>
                                    </Block>
                                    <Block middle>
                                        <Text bold size={16} style={{marginBottom: 8}}>{grade}</Text>
                                    </Block>
                           </Block>
                            <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
                                <Block>
                                    <Text size={14} style={{marginBottom: 8}}>Short ID</Text>
                                </Block>
                                <Block>
                                    <Text bold size={14} style={styles.fieldStyle}>{shortId}</Text>
                                </Block>
                            </Block>
                            <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
                                <Block middle>
                                    <Text size={14} style={{marginBottom: 8}}>Long ID</Text>
                                </Block>
                                <Block middle>
                                    <Text bold size={14} style={styles.fieldStyle}>{longId}</Text>
                                </Block>
                            </Block>

                            <Block row  space="between" style={{ padding: theme.SIZES.BASE, }}>
                                <Block middle>
                                    <Text size={14} style={{marginBottom: 8}}>ASB</Text>
                                </Block>
                                <Block middle>
                                    <Text bold size={14} style={styles.fieldStyle}>{asbStatus}</Text>
                                </Block>
                            </Block>

                            <Block row  space="between" style={{ padding: theme.SIZES.BASE, }}>
                                
                                <Block middle>
                                    <Text size={14} style={{marginBottom: 8}}>Six Period</Text>
                                </Block>
                                <Block middle>
                                    <Text bold size={14} style={styles.fieldStyle}>{sixPeriodStatus}</Text>
                                </Block>
                            </Block>
                            <Block row space="between"  style={{ padding: theme.SIZES.BASE, }}>
                                
                                <Block middle>
                                    <Text size={14} style={{marginBottom: 8}}>Lunch Period</Text>
                                </Block>
                                <Block middle>
                                    <Text bold size={14} style={styles.fieldStyle}>{lunchPeriodStatus}</Text>
                                </Block>
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
        borderRadius:15,
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        zIndex: 2,
    },
    fieldStyle: {
        marginLeft: 30,
        marginBottom: 6
    }
});   