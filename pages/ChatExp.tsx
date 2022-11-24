import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {Card, Button} from 'react-native-elements';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import { Dialogflow_V2 } from "react-native-dialogflow";
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import {auth} from './firebaseCon';

import { dialogflowConfig} from '../env.js';
import Dialogflow from "react-native-dialogflow";
import { uuid } from 'uuidv4';

const botAvatar = require('../assets/bot.png')
// Interface

const BOT = {
  id: 2,
  name: 'BotSEB',
  avatar: botAvatar,
}
interface IMessage {
  _id: 1;
  text: string;
  createdAt: Date;
  user: {
    _id: 2;
    name: string;
    avatar: string;
  };
}

export default function ChatScreenNew() {
  // Onde armazena as mensagens
  const [messages, setMessages] = useState<IMessage[]>([]);

  // Onde vai ser feito o armazenamento das mensagens
  useEffect(() => {
      Dialogflow_V2.setConfiguration(
        dialogflowConfig.client_email,
        dialogflowConfig.private_key,
        Dialogflow_V2.LANG_PORTUGUESE_BRAZIL,
        dialogflowConfig.project_id,
      );
      
    setMessages([
      {
        _id: 1,
        text: 'Olá, '+ auth.currentUser?.displayName+'.no que posso te ajudar?',
        createdAt: new Date().getTime(),
        user: {
          _id: 2,
          name: 'BotSEB',
          avatar: botAvatar,
          createdAt: new Date().getTime(),
        },
      },
    ]);
    const email = auth.currentUser?.email
    const name = auth.currentUser?.displayName
    

    
  }, []);

  //console.log(messages);
  // Callback quando estiver enviando a mensagem

  

  const pegarResultadoDialog = (result) => {
    
    let text = result.queryResult.fulfillmentMessages[0].
    text.text[0];
    sendBotMessage(text);
    //console.log(text);
  }

  const sendBotMessage = (text) => {
    let msg;
    if (text == 'travel') {
      msg = {
        _id: setMessages.length +1,
        text: 'Por favor fale a cidade aonde mora',
        createdAt: new Date().getTime(),
        user: BOT,
      };
    } else if (text == 'show options') {
      msg = {
        _id: setMessages.length +1,
        text: 'Em ribeirão temos as seguintes escolas: ',
        createdAt: new Date().getTime(),
        user: BOT,
        isOptions: true,
        data : [
          { title: 'Lafaiete',  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV6nfStDxsNL9VKI6XV-FgylM6aE6Q8N-kwwjpJV_7LX3m_Ymm7S4GXL8rk8r3ydyW79g&usqp=CAU'},
          { title: 'Ribeirânia', image: 'https://i0.wp.com/emribeirao.com/assets/media/2019/11/SEB-Portugal-COC.jpg?fit=1280%2C640&ssl=1&resize=1200%2C675' },
          { title: 'Portugal',  image: 'https://fastly.4sqi.net/img/general/600x600/48546888_PR6KNsJDEWp3Gv0rGtp8Q05Vn8r6huqqyQ7xbhn34KM.jpg' },
          ],
        /*quickReplies: {
          type: 'radio',
          keepIt: true,
          values:[
          { title: 'Lafaiete', value: 'Mostrar Lafaiete', bColor: '#A0522D', bgColor: '#A0522D'   },
          { title: 'Riberânia',value: 'Mostrar Riberânia', bColor: '#7B68EE', bgColor: '#7B68EE'  },
          { title: 'Portugal', value: 'Mostrar Portugal', bColor: '#008B8B', bgColor: '#008B8B'   },
        ],
        },*/
      };
      }else{
      msg = {
          _id: setMessages.length +1,
          text,
          createdAt: new Date().getTime(),
          user: BOT,
        };
      }

      msg._id = this.state.messages.length + 1;

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [msg]),
    );
    
  }

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
    let message = messages[0].text;
    //console.log(Dialogflow_V2);

    Dialogflow_V2.requestQuery(message, 
    result=>pegarResultadoDialog(result), 
    error=>console.log("Erro!!!", error));

  }, []);
  
  const onQuickReply = useCallback((quickReply)=>{
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, quickReply),
    );

    let message = quickReply[0].value;
    
    Dialogflow_V2.requestQuery(
      message, 
    result=>pegarResultadoDialog(result), 
    error=>console.log("Erro!!!", error));
    
  }, []);
  const renderBubble = (props) => {
    if (props.currentMessage.isOptions){
      return (
        <ScrollView style={{backgroundColor: '#F2F2F2'}}
        horizontal={true}>
          {props.currentMessage.data.map((item) =>(
            <Card containerStyle={{padding: 0, borderRadius: 15, paddingBottom: 7, overflow: 'hidden'}}
            key={item.title}>
              <Card.Image style={{width:220, height: 110}}
              resizeMode='cover' 
              source={{uri: item.image}}></Card.Image>
              <Card.Divider/>
              <Card.Title>{item.title}</Card.Title>
              <Card.Divider/>
              <Button style={{height: 35}} 
                title="EscolherEscola" onPress={() => sendBotMessage(item.title)}/>
            </Card>
          ))}
        </ScrollView>
      )
    }
    return (<Bubble {...props} 
      textStyle={{right: {color: 'white' } }}
      wrapperStyle={{left: {backgroundColor: '#D2D1D4' }}}
    />
    )
  }
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      onQuickReply={(quickReply) => onQuickReply(quickReply)}
      renderBubble = {renderBubble}
      user={{
        _id: 1,
      }}
    />
  );
}