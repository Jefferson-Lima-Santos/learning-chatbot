import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import splashJson from '../assets/splash.json';
import { CommonActions, useNavigation } from '@react-navigation/native';

export interface SplashScreenProps{
    
}

const size = Dimensions.get('window').width *  1.5

const SplashScreen = () => {
     const navigation = useNavigation()
    useEffect(() => {
        setTimeout(() => {
            navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [{name: 'intro'}]
            }))
        }, 4000);
    }, []) 
    return (
        <View style={styles.container}>
            <LottieView source={splashJson} style={{width: size, height: size}}
                    autoPlay
                    loop
                    resizeMode='cover'
            />
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: '#FBFBFC'
    },
});

export default SplashScreen