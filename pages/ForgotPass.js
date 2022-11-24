import { ImageBackground,StyleSheet,KeyboardAvoidingView, Text, View,TextInput,Image,TouchableOpacity,Dimensions } from 'react-native';
import React,{useState} from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

const ForgotPass = () => {
  const auth = getAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const MudarTela = () => {
    navigation.replace("Login")
  }

  const resetPassMsg = (email) => {
    console.log(email)
    console.log(auth)
    sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Verifique a caixa de Entrada do seu Email")
      navigation.replace("Login")
    })
    .catch((error) => {
      console.log(error)
    })
  }
  
  return (
    
    <View
    style={styles.background}
    >
      <Image
            source={require('../imgs/undraw_ForgotPass.png')}
            style={styles.imagem}
        />
      <View
            style={styles.container}
            behavior="padding"
        >
           <View style={styles.inputContainer}>
            <Text style={styles.TextUp}>E-mail</Text>
              <TextInput
                  placeholder="exemplo@gmail.com"
                  value={email}
                  onChangeText={text => setEmail(text) }
                  style={styles.input}
              />
            </View>
          <View style={styles.TextContainer}>
            <Text style={styles.TextImpar}>Esqueceu a Senha?</Text>
            <Text style={styles.TextPar}> Não tem problema!</Text>
            <Text style={styles.TextImpar}>Basta escrever o seu E-mail e...</Text>
            <Text style={styles.TextPar}>Te mostraremos uma forma de</Text>
            <Text style={styles.LastText}>Alterar a sua Senha!</Text>
          </View>
         
        <View style={styles.buttonContainer}>
          <TouchableOpacity
              onPress={() => resetPassMsg(email)}
              style={styles.button}
          >
              <Text style={styles.buttonText}>Enviar Email</Text>
          </TouchableOpacity>
            
        </View>
      </View>
    </View>
  )
}

export default ForgotPass

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
      borderWidth: 2,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText:{
      color: 'white',
      fontWeight: '700',
      fontSize: 20,
    },
    buttonOutline:{
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonOutlineText:{
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },inputContainer:{
      width: '80%',
      marginTop: '0%',
    },
    input:{
      borderColor: 'blue',
      borderWidth: 2,
      backgroundColor: 'white',
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 10,
      width: '100%',
      backgroundColor: '#CFDFFF',
    },
    TextImpar:{
      fontSize: 18,
      marginTop: '5%',
      fontWeight: 'bold',
      marginLeft: '3%',
      color: 'blue',
      alignSelf: 'flex-start'
    },
    TextPar:{
      fontSize: 18,
      marginTop: '5%',
      fontWeight: 'bold',
      marginLeft: '3%',
      color: 'black',
      alignSelf: 'flex-end'
    },LastText:{
      fontSize: 25,
      textAlign: 'center',
      marginTop: '5%',
      fontWeight: 'bold',
      marginLeft: '3%',
      color: 'blue',
    },
    TextContainer:{
      width: '80%',
    },imagem:{
      marginTop: '10%',
      width: '100%',
      height: '30%',
      marginBottom: '0%'
  },TextUp:{
    marginTop: '4%',
    fontWeight: '700',
    fontSize: 16,
  }
})