import { Image,Dimensions,StyleSheet, Text, View,Button,TouchableOpacity } from 'react-native';
import Icon from 'react-native-ico-material-design';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import React,{useState,useEffect} from 'react';
import {auth,app,storage} from './firebaseCon';
import { getStorage, ref,uploadBytes } from "firebase/storage";
  
  const PhotoScreen = () => {

    const navigation = useNavigation();
    const [temPermissao,settemPermissao] = useState(null)
    const [imagem,setImagem] = useState(
      'https://img2.gratispng.com/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg'
  );
  const storage = getStorage();
  
  const [mostrar,setMostrar] = useState(false);
  
  useEffect(() => {
    
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      settemPermissao(galleryStatus.status === 'garantido');
    })();
  }, []);

  const EscolherImagem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality:1,
    });
    //console.log(result);

    if (!result.canceled) {
      if (result.uri!=null) {
        setImagem(result.uri);
        setMostrar(true);
        
        const storageRef = ref(storage, "Imagens-Perfil/" + auth.currentUser?.email)
        
        const img = await fetch(result.uri);
        const bytes = await img.blob();

        await uploadBytes(storageRef, bytes).then((snapshot) => {
          console.log('Subiu uma imagem!');     
        });
      }
    }
  };

  const MudarTela = () => {
    navigation.replace("Home")
  }
  return (
    <View style={styles.background}>
        <View style={styles.buttonContainer}>
              <TouchableOpacity
                  onPress={() => EscolherImagem()}
                  style={[styles.button,styles.buttonOutline]}
              >
              <Image 
              //'https://img2.gratispng.com/20180331/eow/kisspng-computer-icons-user-clip-art-user-5abf13db298934.2968784715224718991702.jpg'
                  source={{uri: imagem}} 
                  style={styles.imgUsuario}>
              </Image>
                  <Text style={styles.buttonOutlineText}>Escolher Foto</Text>
              </TouchableOpacity>
              {!mostrar? ( 
              <Text style={styles.Text}>
                Deseja colocar uma foto de usuario?
              </Text>
              ): null}
        </View>
        <View style={styles.ButtonAvancar}>
                {mostrar? ( 
                <TouchableOpacity
                    onPress={MudarTela}
                    style={[styles.button,styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Avançar</Text>
                </TouchableOpacity>
                ): null}
        </View>

        <View style={styles.TextView}>
          
            <View style={{flexDirection:"row"}}> 
              {!mostrar? (    
                <TouchableOpacity
                    onPress={MudarTela}
                    style={[styles.button,styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Pular</Text>
                </TouchableOpacity>
                ): null}
            </View>
        </View>
        
    </View>
  )
}

export default PhotoScreen

const styles = StyleSheet.create({
    background:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: 0,
      top: 0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    imgUsuario:{
        marginTop: '10%',
        marginBottom: '10%',
        width: '40%',
        height: '45%',
        marginRight: '3%',
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    },
    TextView:{
      marginTop: '30%',
      alignItems: 'center',
      height: '30%',
      width: '80%',
    },
    Text:{
      fontSize: 19, 
    },
    TextTouch:{
      color: '#0782F9',
    },
    buttonContainer:{
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button:{
        marginTop: '10%',
        backgroundColor: '#0782F9',
        width: '100%',
        paddingHorizontal: 15,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
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
    },ButtonAvancar:{
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '-13%',
    }
})