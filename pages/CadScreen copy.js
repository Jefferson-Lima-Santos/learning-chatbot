import { Dimensions,KeyboardAvoidingView,StyleSheet, Text, View,TextInput,TouchableOpacity,ImageBackground,Image,Button  } from 'react-native'
import React,{useState,useEffect } from 'react'
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

const CadScreen = () => {
    
    const firestore = getFirestore();
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nomePessoa,setnomePessoa] = useState('')
    const [sobrenome,setSobrenome] = useState('')
    const [telefone,setTelefone] = useState('')
    const [formattedValue, setFormattedValue] = useState("")
    const [genero,setGenero] = useState('masculino')
    const [dataNascimento,setDataNascimento] = useState(new Date(1598051730000))
    const [open,setOpen] = useState(false)
    const [vpassword,setvPassword] = useState('')
    //const [input,setInput] = useState('')
    const [esconderSenha,setesconderSenha] = useState(true)

    const [mostrar,setMostrar] = useState(false);
    const MudarTela = () => {
        if(mostrar == true){
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
    const verificarPrimeiraParte = () => {
        const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
        var strongSenha = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
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

    const CadastrarUsuario = ()=>{
        if(nomePessoa == ""){
            alert("Nome requerido")
            return false;
        }else if(nomePessoa.length >= 14){
            alert("Maximo de 14 caracteres no nome.")
            return false;
        }else if(dataNascimento.toLocaleString() == "Fri Aug 21 23:15:30 2020"){
            alert("Data de Nascimento Requerido!")
            return false;
        }else if(telefone == ""){
            alert("Telefone Requerido!")
            return false;
        }
        
        else {
            createUserWithEmailAndPassword(auth, email, password)
            .then((re) => {
                updateProfile(auth.currentUser, {
                    displayName: nomePessoa,
                    
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
                dataNascimento: dataNascimento,
                telefone: telefone,
                genero: genero,
        });
        }
            navigation.replace("Photo")
    }
  return (
      
    <View
    imageStyle= {{opacity:0.5}}
    style={styles.background}
    source={require('../imgs/Cadastro.png')}
    >
        <View
            style={styles.container}
            behavior="padding"
        >
            {mostrar? ( 
                <View>
                        <Text style={styles.TextPrincipal}>Diga-nos um pouquinho</Text>
                        <Text style={styles.TextPrincipal}>Sobre Você!</Text>
                </View>
            ): null}
        
        {!mostrar? ( 
            <View>
                       <Text style={styles.TextPrincipal}>Crie sua Conta</Text>
                       <Text style={styles.TextPrincipal}>Com o E-mail</Text>
            </View>
        ): null}
        <View style={styles.inputContainer}>
                {!mostrar? (
                    <View>
                        <Text style={styles.TextUp}>E-mail</Text>
                        <TextInput
                            placeholder="exemplo@gmail.com"
                            value={email}
                            onChangeText={text => setEmail(text) }
                            style={styles.input}
                        />
                    </View>
                ): null}

                {!mostrar? (
                    <View>
                        <Text style={styles.TextUp}>Crie sua Senha</Text>
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
                ): null}

                {!mostrar? (
                    <View>
                    <Text style={styles.TextUp2}>Cofirme sua Senha</Text>
                        <View style={styles.Senhas}>
                            <TextInput
                                placeholder="***********"
                                value={vpassword}
                                onChangeText={text => setvPassword(text) }
                                style={styles.inputTextSenha}
                                secureTextEntry={esconderSenha}
                            />
                            <TouchableOpacity style={styles.icons} onPress={() => setesconderSenha(!esconderSenha)}>
                                <Ionicons name="eye" size={25} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ): null}

                {mostrar? (
                    <TextInput
                        placeholder="Nome"
                        value={nomePessoa}
                        onChangeText={text => setnomePessoa(text) }
                        style={styles.input}
                    />
                ): null}

                {mostrar? (
                        <PhoneInput
                            placeholder="Telefone"
                            containerStyle={styles.inputPhone}
                            defaultValue={telefone}
                            defaultCode="BR"
                            layout="first"
                            onChangeText={(text) => setTelefone(text) }
                            withDarkTheme
                            withShadow
                            autoFocus
                        />
                ): null}
                {mostrar? (
                    <View style={styles.input}>
                        <Picker
                            selectedValue={genero}
                            onValueChange={(itemValue, itemIndex) =>
                                setGenero(itemValue)
                            }>
                            <Picker.Item label="Masculino" value="Masculino" />
                            <Picker.Item label="Feminino" value="Feminino" />
                            <Picker.Item label="Prefiro não dizer" value="Não Especificado" />
                        </Picker>
                    </View>
                ): null}
                {mostrar? ( 
                <View style={styles.datepicker}>
                    <Button title="Escolher data de Nascimento" onPress={showDatepicker} />
                        {open && (
                            <DateTimePicker
                            minimunDate={new Date(1940,0,1)}
                            maximunDate={new Date(2020,0,1)}
                            locale="pt-BR"
                            testID="dateTimePicker"
                            format="DD/MM/YYYY"
                            mode={'date'}
                            value={dataNascimento}
                            onChange={onChange}
                            />
                    )}
                </View>
                ): null}
            </View>

            <View style={styles.buttonContainer}>
                    {!mostrar? ( 
                        <TouchableOpacity
                            onPress={verificarPrimeiraParte}
                            style={[styles.button]}
                        >
                            <Text style={styles.buttonText}>Avançar</Text>
                        </TouchableOpacity>
                        ): null}
                    {mostrar? (
                    <TouchableOpacity
                        onPress={CadastrarUsuario}
                        style={[styles.button,styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Cadastrar-se</Text>
                    </TouchableOpacity>
                     ): null}
                    <TouchableOpacity
                        onPress={MudarTela}
                        style={[styles.button,styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Voltar</Text>
                    </TouchableOpacity>
            </View>
        </View>
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
    },
    input:{
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
        fontSize: 16,
    },
    buttonOutlineText:{
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
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
        fontSize: 30,
        textAlign: 'center',
    }
})