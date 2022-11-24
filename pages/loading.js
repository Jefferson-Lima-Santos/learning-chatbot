import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import loadingjson from '../assets/loading.json';
import LottieView from 'lottie-react-native';

const Loading = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject ,styles.container]}>
            <LottieView source={loadingjson} 
                    autoPlay
                    loop
            />
    </View>
  )
}
const styles = StyleSheet.create ({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zindex: 1,
    },
});

export default Loading