import { Image,Dimensions,KeyboardAvoidingView,StyleSheet, Text, View,TextInput,TouchableOpacity,ImageBackground } from 'react-native'
import React,{useState,useEffect} from 'react'
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth'
//import {Userauthentication} from 'firebase/firebase-config'
import Ionicons from '@expo/vector-icons/Ionicons';
import {auth} from './firebaseCon';


const LoginScreen = () => {
    
    const [isChecked, setChecked] = useState(false);
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
    
    const MudarTela = () => {
        navigation.replace("Cadastrar")
    }
    const EsqueceuSenha = () => {
        navigation.replace("ForgotPass")
    }
    const MostrarSenha = () => {
        setChecked(!isChecked)
    }

    const Logar = ()=> {
        const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
        if (email == "") {
            alert("Email esta Vazio!");
            return false
        }else if(password == ""){
            alert("Senha esta vazia!");
            return false
        }else if (!strongRegex.test(email)) {
            alert("email invalido")
            return false;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((re) => {
                // Signed in
                // ...
            })
            .catch((re) => {
                console.log(re);
                alert("Verifique o Email e/ou Senha!")
            });
            
    }
    
    /*
    */

  return (
    <View style={styles.background}>
        <Image
            source={require('../imgs/undraw_Reading.png')}
            style={styles.imagem}
        />
        <View
            style={styles.container}
            behavior="padding"
        >
        <View style={styles.inputContainer}>
            <Text style={styles.TextUp}>E-mail</Text>
            <TextInput
                autoComplete="email"
                placeholder="exemplo@gmail.com"
                value={email}
                onChangeText={text => setEmail(text) }
                style={[styles.input,styles.inputAux]}
            />
            <Text style={styles.TextUp}>Senha</Text>
            <View style={[styles.Senhas,styles.inputAux]}>
                <TextInput
                    placeholder="***********"
                    value={password}
                    onChangeText={text => setPassword(text) }
                    style={[styles.input, styles.inputTextSenha]}
                    secureTextEntry={!isChecked}
                />
                    <TouchableOpacity style={styles.icons} onPress={() => setChecked(!isChecked)}>
                                    <Ionicons name="eye" size={25} color="black" />
                    </TouchableOpacity>
                    
            </View>
        </View>
        <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={Logar}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.TextContainer}>
                    <Text style={styles.ForgetText}>
                            Esqueceu a Senha? 
                    </Text>
                    <TouchableOpacity 
                        style={styles.ForgetOut}
                        onPress={EsqueceuSenha}>
                    <Text style={styles.ForgetTextForClick}>
                            Clique aqui!
                    </Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        </View>
  )
}

export default LoginScreen
const styles = StyleSheet.create({
    background:{
        backgroundColor: "#FFFFFF",
        position: 'absolute',
        left: 0,
        top: 0,
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    container:{
        flex: 1,
        width: '100%',
        height: null,
        justifyContent: 'center',
        marginTop: 0,
        alignItems: 'center',
        marginBottom: '50%',
    },
    inputContainer:{
        width: '80%',
        marginTop: '0%',
    },
    input:{
        backgroundColor: '#CFDFFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderColor: 'blue',
        borderRadius: 10,
        marginTop: '0%',
    },
    inputAux:{
        borderColor: 'blue',
        borderWidth: 2,
    },
    buttonContainer:{
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%',
    },
    button:{
        backgroundColor: '#0782F9',
        width: '100%',
        paddingHorizontal: 15,
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
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
    },Senhas:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#CFDFFF',
        borderRadius: 10,
        marginTop: 5,
    },
    buttonOutlineText:{
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },TextContainer:{
        marginTop: '5%',
        flexDirection:"row",
    },inputTextSenha:{
        flex: 1,
    },ForgetText:{
        color: 'black',
        fontWeight: '900',
        fontSize: 19,
    },ForgetTextForClick:{
        marginLeft: '5%',
        color: 'blue',
        fontWeight: '900',
        fontSize: 19,
    },icons:{
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagem:{
        marginTop: '0%',
        width: '80%',
        height: '25%',
        marginBottom: '10%'
    },TextUp:{
        marginTop: '4%',
        fontWeight: '700',
        fontSize: 16,
    }
})