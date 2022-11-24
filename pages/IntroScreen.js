import { Dimensions,KeyboardAvoidingView,StyleSheet, Text, View,TextInput,TouchableOpacity,ImageBackground,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';

import {auth} from './firebaseCon';


const IntroScreen = () => {
    
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })
        return unsubscribe
    }, [])
    

  return (
    <View style={styles.background}>
        <Image
            source={require('../imgs/undraw_intro.png')}
            style={styles.imagem}
        />
        <Text style={styles.PrincipalText}>Acompanhe a  vida escolar </Text>
        <Text style={styles.SecText}>do seu filho! </Text>
        <Text style={styles.TerText}>Keep Calm and see our results </Text>
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
        <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Cadastrar')}
                    style={[styles.button,styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Cadastrar-se</Text>
                </TouchableOpacity>

                
        </View>
        </KeyboardAvoidingView>
    </View>
  )
}

export default IntroScreen
const styles = StyleSheet.create({
    background:{
        backgroundColor: "#FFFFFF",
        position: 'absolute',
        left: 0,
        top: 0,
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height+50,
    },
    container:{
        flex: 1,
        width: '100%',
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer:{
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '0%',
    },
    button:{
        backgroundColor: '#0782F9',
        width: '100%',
        paddingHorizontal: 15,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline:{
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText:{
        color: 'white',
        fontWeight: '700',
        fontSize: 20,
    },
    buttonOutlineText:{
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 20,
    },imagem:{
        marginTop: '8%',
        width: '85%',
        height: '40%',
    },PrincipalText:{
        fontWeight: '700',
        fontSize: 28,
    },SecText:{
        fontWeight: '700',
        fontSize: 40,
    },TerText:{
        fontWeight: '700',
        fontSize: 25
    }
})