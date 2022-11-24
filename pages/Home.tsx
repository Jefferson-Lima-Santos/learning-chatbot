import { Button, Dimensions, StyleSheet, Text, View, TouchableOpacity, FlatList,Image } from 'react-native';
import React, { useRef,useEffect,useState} from "react";
import LottieView from 'lottie-react-native';
import chatIcon from '../assets/chatboticon.json';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {auth} from './firebaseCon';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-ico-material-design';
import { getStorage, ref,getDownloadURL } from "firebase/storage";
import Loading from './loading';
import Carousel from 'react-native-snap-carousel';
//import { sliderWidth, itemWidth } from './styles/SliderEntry.style';
//import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';

const StackHOme = createStackNavigator();

const viewConfig = {viewAreaCoveragePercentThreshold: 95};
const sizeicon = Dimensions.get('window').width *  0.3;
const {width, height} = Dimensions.get('window');
//const [MsgBemVindo,setMsgBemVindo] = useState('boa tarde');

/*const MsgBemVindoFunc = () => {   
    if (tempo >= 18){
        setMsgBemVindo("Boa noite!");
    }else if(tempo <= 17 || tempo >= 12){
        setMsgBemVindo("Boa tarde!");
    }else if(tempo <= 11 || tempo >= 6){
        setMsgBemVindo("Bom dia!");
    }
}*/

const HomeScreen = ( {navigation} ) => {
    useEffect(() => {
        
        }
    );

    const [url,setUrl] = useState();
    const [saudacao,setSaudacao] = useState();
    const [carregar,setCarregar] = useState(false);
    useEffect(() => {
        const storage = getStorage();
        const reference = ref(storage, "Imagens-Perfil/" + auth.currentUser?.email);
        
            getDownloadURL(reference).then((x) =>{
            setUrl(x);
        })
        if (url === undefined){
            setUrl('https://reactjs.org/logo-og.png')
        }
        let tempo = new Date().getHours();
        if(tempo <= 11 && tempo >= 6){
            setSaudacao('Bom dia!')
        }else if(tempo >= 12 && tempo <= 18){
            setSaudacao('Boa tarde!')
        }else{
            setSaudacao('Boa Noite!')
        }


    },[]);
    
    const navegar = useNavigation();

    const HomeNavigation = () => {
        
    }
    const Deslogar = () => {
        auth
            .signOut()
            .then(() => {
                navegar.replace("Login")
            })
            .catch(error => alert(error.message));
    }
    const AbrirChat = () => {
        setCarregar(true);
        navigation.navigate('ChatExpDois');
        setCarregar(false);
    }

    const _renderItem = ({item, index}) => {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{ item.title }</Text>
            </View>
        );
    }
    
    return (
        <>
        <View  style={styles.viewFull}>
                <View style={styles.InformacaoUsuario}>
                    <View style={styles.NomeUsuarioEmsg}>
                        <Text style={styles.MensagemUsuario}>{saudacao}</Text> 
                        <Text style={styles.NomeUsuario}>{auth.currentUser?.displayName}</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.containerImg}
                        onPress={() => navigation.navigate('Photo')}
                    >
                        <Image 
                            source={{uri: url}}
                            style={styles.imgUsuario}>
                        </Image>
                    </TouchableOpacity>
                </View>
                <Carousel
                    ref={(c) => c }
                    renderItem={_renderItem}
                    sliderWidth={{}}
                    itemWidth={{}}
                />
                
                <View style={styles.bottomContent}>
                    <TouchableOpacity 
                        style={styles.containerChatbot}
                        onPress={AbrirChat}
                    >
                        <LottieView source={chatIcon} style={{width: sizeicon, height: sizeicon}}
                        autoPlay
                        loop
                        resizeMode='cover'
                        />
                    </TouchableOpacity>
                   
                    <View style={styles.navContainer}>
                        <View style={styles.NavBar}>
                            <TouchableOpacity 
                            onPress={() => navigation.navigate('Photo')}
                            style={styles.IconBehave}
                            >
                                <Icon name="round-account-button-with-user-inside" height={size/14} width={size/8} color='white'/>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={HomeNavigation}
                            style={styles.IconBehave}
                            >
                                <Icon name="home-button" height={size/14} width={size/8} color='white'/>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={Deslogar}
                            style={styles.IconBehave}
                            >
                                <Icon name="exit-to-app-button" height={size/14} width={size/8} color='white'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        </View>
        {carregar? (
            <Loading/>
        ): null}
       </>
    );
}

const size = Dimensions.get('window').width;
const styles = StyleSheet.create ({
    viewFull:{
        marginTop: '3%',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerChatbot: {
        justifyContent: 'flex-end',
        width: size/8,
        height:size/10,
        marginTop:'10%',
        bottom: 0,
        marginLeft: '80%',
        marginEnd:'5%',
        marginBottom: '27%',
        alignItems: 'center',
    },
    button:{
        backgroundColor: '#0782F9',
        width: '100%',
        paddingHorizontal: 15,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText:{
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    InformacaoUsuario: {
        flexDirection:"row",
        width: '100%',
        marginTop: 27,
        height: '9%',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    imgUsuario:{
        marginTop: '5%',
        width: '100%',
        height: '100%',
        marginRight: '3%',
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        },
    bottomContent:{
        width: '100%',
    },navContainer:{
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
    },NavBar:{
        flexDirection: 'row',
        backgroundColor: '#35C5FE',
        width: '100%',
        justifyContent: 'space-evenly',
        borderRadius: 0,
    },IconBehave:{
        backgroundColor: '#35C5FE',
        padding: 15,
    },MensagemUsuario:{
        width: '100%',
        marginLeft: '5%',
        fontSize: 26,
    },NomeUsuarioEmsg:{
        marginLeft: '0%',
        justifyContent: 'center',
        fontSize: 26,
    },
    NomeUsuario: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: '5%',
        marginLeft: '8%',
    },
    containerImg:{
        width: '19%',
        height: '111%',
        marginRight: '5%'
    }
});

export default HomeScreen