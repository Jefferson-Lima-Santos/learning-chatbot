import { Dimensions,KeyboardAvoidingView,StyleSheet, Text, View,TextInput,TouchableOpacity,ImageBackground,Image,Button  } from 'react-native'
import React,{useState,useEffect,useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from 'firebase/auth'
import DateTimePicker from '@react-native-community/datetimepicker';
//import {Userauthentication} from 'firebase/firebase-config'
import {auth} from './firebaseCon';
import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';
import PhoneInput from "react-native-phone-number-input";
import {Picker} from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text'

const CadScreen = () => {
    
    const firestore = getFirestore();
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nomePessoa,setnomePessoa] = useState('')
    const [sobrenome,setSobrenome] = useState('')
    const [telefone,setTelefone] = useState('')
    const [cpf, setCpf] = useState('')
    const cpfRef = useRef(null);
    //const [formattedValue, setFormattedValue] = useState("")
    //const [dataNascimento,setDataNascimento] = useState(new Date(1598051730000))
    //const [open,setOpen] = useState(false)
    const [vpassword,setvPassword] = useState('')
    //const [input,setInput] = useState('')
    const [esconderSenha,setesconderSenha] = useState(true)
    const [esconderConfSenha,setesconderConfSenha] = useState(true)
    const [mostrar,setMostrar] = useState(false);
    const [mostrarAux,setMostrarAux] = useState(false);
    const MudarTela = () => {
        if(mostrar == true && mostrarAux == true){
            setMostrarAux(false);
        }else if(mostrar == true && mostrarAux == false){
            setMostrar(false);
        }else{
            navigation.replace("intro")
        }
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })
        return unsubscribe
    }, [])

    const onChange = (event, selectedDate) => {
        setOpen(false);
        setDataNascimento(selectedDate);
    };

    const showDatepicker = () => {
        setOpen(true);
    };
    const verificarParte = () => {
        if (mostrar == false && mostrarAux == false) {
            verificarPrimeiraParte();
        }else if(mostrar == true && mostrarAux == false) {
            //verificarSegundaParte();
        }else if(mostrar == true && mostrarAux == true) {
            cadastrarUsuario();
        }
    }
    const verificarPrimeiraParte = () => {
        const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
        var strongSenha = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (email == "") {
            alert("Email é necessario!");
            return false
        }else if (!strongRegex.test(email)) {
            alert("email invalido")
            return false;
        }else if(password == ""){
            alert("Senha esta vazia!");
            return false
        }else if(password.length <=8){
            alert("Senha precisa ter no minimo 8 caracteres!");
            return false
        }else if(password.length != vpassword.length){
            alert("As senhas não são iguais!")
            return false
        }else if (!strongSenha.test(password)) {
            alert("Senha precisa conter simbolos,letras e numeros!")
            return false;
        }else{
            setMostrar(true);
        }
    }
    
    const verificarSegundaParte = () => {
        if(nomePessoa == ""){
            alert("Nome requerido")
            return false;
        }else if(nomePessoa.length >= 14){
            alert("Maximo de 14 caracteres no nome.")
            return false;
        }else if(sobrenome == ""){
            alert("Sobrenome necessário!")
            return false;
        }else if(sobrenome.length >= 40){
            alert("Maximo de 40 caracteres no sobrenome.")
            return false;
        }else{
            setMostrarAux(true);
        }
    }

    const CadastrarUsuario = ()=>{
        const cpfValido = cpfRef?.current.isValid();
        if(cpf == ""){
            alert("Cpf Requerido!")
            return false;
        }else if(cpfValido == false){
            alert("Cpf Invalido")
            return false;
        }else if(telefone == ""){
            alert("Telefone Requerido!")
            return false;
        }else if(telefone.length <= 13){
            alert("Telefone invalido!")
            return false;
        }else {
            createUserWithEmailAndPassword(auth, email, password)
            .then((re) => {
                updateProfile(auth.currentUser, {
                    displayName: nomePessoa,
                    phoneNumber: telefone,
                })
                console.log(re);
                /*const usuario = userCredentials.user;
                console.log('Cadastrado como: ',user.email);*/
        })
            .catch((re) => {
                console.log(re);
        })
            setDoc(doc(firestore,"AppClientes",email),{
                nome: nomePessoa,
                sobrenome: sobrenome,
                telefone: telefone,
                cpf : cpf,
        });
            console.log(setDoc);
        }
            navigation.replace("Photo")
    }
  return (
      
    <View
    imageStyle= {{opacity:0.5}}
    style={styles.background}
    source={require('../imgs/Cadastro.png')}
    >
            {!mostrar && !mostrarAux ? (
                <View
                    style={styles.container}
                    behavior="padding"
                >   
                    <View style={styles.inputContainer}>
                        <View>
                            <Text style={styles.TextPrincipal}>Crie sua Conta</Text>
                            <Text style={styles.TextPrincipal2}>Com o E-mail</Text>
                            <Text style={styles.TextUp}>E-mail:</Text>
                            <TextInput
                                placeholder="exemplo@gmail.com"
                                value={email}
                                onChangeText={text => setEmail(text) }
                                style={styles.input}
                            />
                            <View>
                                <Text style={styles.TextUp}>Crie sua Senha:</Text>
                                <View style={styles.Senhas}> 
                                    <TextInput
                                        placeholder="***********"
                                        value={password}
                                        onChangeText={text => setPassword(text) }
                                        style={styles.inputTextSenha}
                                        secureTextEntry={esconderSenha}
                                    />
                                    <TouchableOpacity style={styles.icons} onPress={() => setesconderSenha(!esconderSenha)}>
                                        <Ionicons name="eye" size={25} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        <Text style={styles.TextUp2}>Cofirme sua Senha:</Text>
                            <View style={styles.Senhas}>
                                <TextInput
                                    placeholder="***********"
                                    value={vpassword}
                                    onChangeText={text => setvPassword(text) }
                                    style={styles.inputTextSenha}
                                    secureTextEntry={esconderConfSenha}
                                />
                                <TouchableOpacity style={styles.icons} onPress={() => setesconderConfSenha(!esconderConfSenha)}>
                                    <Ionicons name="eye" size={25} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.RowView}>
                                <View
                                    style={{
                                        flex: 1,
                                        borderBottomColor: 'black',
                                        borderBottomWidth: StyleSheet.hairlineWidth+2,
                                    }}
                                />
                                <Text style={{
                                    marginLeft: '3%',
                                    marginRight: '3%',
                                    fontSize : 20,
                                    fontWeight: '700',
                                    }}>
                                        Ou
                                        </Text>
                                <View
                                    style={{
                                        flex: 1,
                                        borderBottomColor: 'black',
                                        borderBottomWidth: StyleSheet.hairlineWidth+2,
                                    }}
                                />

                            </View>
                            <View style={styles.RowButton}>
                                <TouchableOpacity
                                    onPress={() => alert("Funcionalidade ainda não disponivel")}
                                    style={[styles.buttonIcons]}
                                >
                                    <Image 
                                        source={require('../imgs/apple.png')}
                                        style={styles.imgIcon}>
                                    </Image>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    onPress={() => alert("Funcionalidade ainda não disponivel")}
                                    style={[styles.buttonIcons,styles.backFace]}
                                >
                                    <Image 
                                        source={require('../imgs/face.png')}
                                        style={styles.imgIcon}>
                                    </Image>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => alert("Funcionalidade ainda não disponivel")}
                                    style={[styles.buttonIcons,styles.backGoogle]}
                                >
                                    <Image 
                                        source={require('../imgs/google.png')}
                                        style={styles.imgIcon}>
                                    </Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={verificarPrimeiraParte}
                            style={[styles.button]}
                        >
                            <Text style={styles.buttonText}>Avançar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={MudarTela}
                        style={[styles.button,styles.buttonOutline]}
                        >
                        <Text style={styles.buttonOutlineText}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ): null}

            {mostrar && !mostrarAux ? (
                <View
                style={styles.container}
                behavior="padding"
                >
                    <View style={styles.inputContainer}>
                        <View>
                            <Text style={styles.TextPrincipal}>Diga-nos um pouquinho</Text>
                            <Text style={styles.TextPrincipal2}>Sobre Você!</Text>
                            <Text style={styles.TextUp2}>Seu nome:</Text>
                            <TextInput
                                placeholder="Seu nome vai aqui"
                                value={nomePessoa}
                                onChangeText={text => setnomePessoa(text) }
                                style={styles.input}
                            />
                            <Text style={styles.TextUp2}>Seu sobrenome:</Text>
                            <TextInput
                                placeholder="Seu sobrenome vai aqui"
                                value={sobrenome}
                                onChangeText={text => setSobrenome(text) }
                                style={styles.input}
                            />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={verificarSegundaParte}
                            style={[styles.button]}
                        >
                            <Text style={styles.buttonText}>Avançar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={MudarTela}
                        style={[styles.button,styles.buttonOutline]}
                        >
                        <Text style={styles.buttonOutlineText}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ): null}
                        
                    {mostrar && mostrarAux ? (
                        <View
                        style={styles.container}
                        behavior="padding"
                        >
                            <View style={styles.inputContainer}>
                                <View>
                                    <Text style={styles.TextPrincipal}>Estamos quase lá...</Text>
                                    <Text style={styles.TextPrincipal2}>Ultimas informações</Text>
                                    <Text style={styles.TextUp2}>Seu CPF:</Text>
                                    <TextInputMask
                                        type={'cpf'}
                                        placeholder="111.111.111-11"
                                        value={cpf}
                                        onChangeText={text => setCpf(text) }
                                        style={styles.input}
                                        ref={cpfRef}
                                    />
                                    <Text style={styles.TextUp2}>Seu Numero de Telefone:</Text>
                                    <TextInputMask
                                        type={'cel-phone'}
                                        options={{
                                          maskType: 'BRL',
                                          withDDD: true,
                                          dddMask: '(99) '
                                        }}
                                        placeholder="(**) 99999-9999"
                                        value={telefone}
                                        onChangeText={text => setTelefone(text) }
                                        style={styles.input}
                                    />
                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    onPress={CadastrarUsuario}
                                    style={[styles.button]}
                                >
                                    <Text style={styles.buttonText}>Cadastrar-se</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={MudarTela}
                                    style={[styles.button,styles.buttonOutline]}
                                >
                                <Text style={styles.buttonOutlineText}>Voltar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                     ): null}
                     
                    
            </View>
  )
}


export default CadScreen

const styles = StyleSheet.create({
    background:{
        backgroundColor: "#FFFFFF",
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height+50,
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer:{
        width: '80%',
    },input:{
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#CFDFFF',
    },inputPhone:{
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#CFDFFF',
        marginTop: 5,
    },inputAux:{
        borderColor: 'blue',
        borderWidth: 2,
    },
    buttonContainer:{
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
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
    },
    InfoNascimento:{
        flexDirection:"row",
        width: '100%',
        marginTop: 5,
        height: '9%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },datepickerText:{
        width: '40%',
    },datepicker:{
        backgroundColor: 'white',
        borderRadius: 16,
        marginTop: 10,
        width: '100%',
    },Senhas:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#CFDFFF',
        borderRadius: 10,
        marginTop: 5,
    },inputTextSenha:{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#CFDFFF',
    },icons:{
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },TextUp:{
        marginTop: '4%',
        fontWeight: '700',
        fontSize: 16,
    },TextUp2:{
        fontWeight: '700',
        fontSize: 16,
    },TextPrincipal:{
        fontWeight: '700',
        fontSize: 29,
        textAlign: 'center',
    },TextPrincipal2:{
        fontWeight: '700',
        fontSize: 29,
        textAlign: 'center',
        marginBottom: '20%',
    },RowView:{
        alignItems: 'center',
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        
        justifyContent: 'space-evenly',
    },RowButton:{
        marginTop: '5%',
        flexDirection: 'row',
        height: '09%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',   
    },buttonIcons:{
        backgroundColor: '#000000',
        width: '30%',
        height: '100%',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },imgIcon:{
        width: '34%',
        height: '70%',
    },backFace: {
        backgroundColor: '#3B5998',
    },backGoogle: {
        backgroundColor: '#4385F5',
    }
})