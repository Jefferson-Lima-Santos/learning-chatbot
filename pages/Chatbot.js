import React, {Component} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {Card, Button} from 'react-native-elements';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {Dialogflow_V2} from 'react-native-dialogflow';
import LottieView from 'lottie-react-native';
import botAvatar from '../assets/chatbotAn.gif';
import {auth} from './firebaseCon';
import {dialogflowConfig} from '../env';

  const BOT = {
    _id: 2,
    name: 'Mr.Bot',
    avatar: botAvatar,
  };

  class Chatbot extends Component {
    state = {
      messages: [{_id: 2, text: 'Que bom te ver por aqui '+  auth.currentUser?.displayName+'. \nEstou aqui para ajudar, caso precise saber algo sobre as escolas ou demais produtos do Grupo SEB, sinta-se a vontade para perguntar!', createdAt: new Date().getTime(),user: BOT},
                 {_id: 1, text: 'Ola 🤩', createdAt: new Date().getTime(),user: BOT},],
      id: 1,
      name: '',
    };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id,
    );
      this.setState([
        {
          _id: 1,
          text: 'Olá, no que posso te ajudar?',
          createdAt: new Date().getTime(),
          user: {
            _id: 2,
            name: 'BotSEB',
            avatar: botAvatar,
            createdAt: new Date().getTime(),
          },
        },
      ]);
  }

  handleGoogleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];

    this.sendBotResponse(text);
  }
  sendBotResponse(text) {
    let msg;
    if(text == 'Inovação'){
      msg = {
        text: '  Nós do Grupo SEB, usamos a tecnologia como ferramenta educacional através de soluções que auxiliam a personalização e otimização do aprendizado.',
        createdAt: new Date().getTime(),
        user: BOT,
      };
    }else if(text == 'Tradição'){
      msg = {
        text: '   Nossos padrões de qualidade educacional reforçam o nosso compromisso em oferecer a melhor educação em qualquer fase da vida.',
        createdAt: new Date().getTime(),
        user: BOT,
      };
    }else if(text == 'Resultados'){
      msg = {
        text: '  Utilizamos sempre metodologias de alta performance, a Escola SEB é destaque no Enem e aprova nos cursos e instituições de ensino mais concorridos do país.',
        createdAt: new Date().getTime(),
        user: BOT,
      };
    }else if(text == 'Protagonismo'){
      msg = {
        text: '   Nosso programa de ensino desenvolve habilidades e competências socioemocionais e pensamento crítico, essenciais para uma formação integral.',
        createdAt: new Date().getTime(),
        user: BOT,
      };
    }else if (text == 'Portugal') {
      msg = {
        text: '   A escola Portugal esta localizada no Endereço: \n R. Prof. João Álvares da Costa, R. Santa Cruz, S/n - José Jaques, Ribeirão Preto - SP, 14020-380\n Fica aberto de segunda a sexta das 08:00 até as 17:30. Entre em contato pelo numero:\n(16) 3603-9300',
        createdAt: new Date().getTime(),
        user: BOT,
      };
    }else if (text == 'Ribeirânia') {
      msg = {
        text: '   A escola Ribeirânia esta localizada no Endereço: \n Rua Abraão Issa Halack, 320 - Ribeirânia, Ribeirão Preto - SP, 14096-160\n Fica aberto de segunda a sexta das 08:00 até as 20:00 e sábado das 08 até as 12:00 Entre em contato pelo numero:\n(16) 3603-9200',
        createdAt: new Date().getTime(),
        user: BOT,
      };
    }else if(text == 'Lafaiete'){
      msg = {
        text: '   A escola Lafaiete esta localizada no Endereço: \n R. Lafaiete, 261 - Centro, Ribeirão Preto - SP, 14015-080\n Fica aberto de segunda a sexta das 08:00 até as 18:00 e sábado das 08 até as 12:00 Entre em contato pelo numero:\n(16) 3603-9400',
        createdAt: new Date().getTime(),
        user: BOT,
      };
    }else if (text == 'Temos mais 120 escolas SEB espalhadas pelo brasil, pode ser um pouco mais especifico? por exemplo, "Quais são as escolas da cidade de ribeirão preto".') {
      msg = {
        text: '   Por favor fale a cidade aonde deseja saber sobre as escolas SEB.\nExemplo: "Escolas em Ribeirão Preto"',
        createdAt: new Date().getTime(),
        user: BOT,
      };
    } else if (text == 'Em ribeirão preto, as escolas disponíveis, são: escola Ribeirânia, escola Portugal e a escola Lafaiete.') {
      msg = {
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
      }else if(text == 'Nosso compromisso é promover a formação integral dos estudantes para que tenham confiança e habilidades necessárias para os desafios do futuro, através da Inovação, Tradição, Resultados e Protagonismo'){
        msg = {
            text: '    Está querendo saber sobre as escolas do grupo SEB? vou te falar então sobre nossa responsabilidade para com os alunos.',
          createdAt: new Date().getTime(),
          user: BOT,
        };
        msg._id = this.state.messages.length + 1;
        this.setState((previouseState) => ({
          messages: GiftedChat.append(previouseState.messages, [msg]),
        }));
        msg = {
          text: '    Nosso compromisso é promover a formação integral dos estudantes para que tenham confiança e habilidades necessárias para os desafios do futuro, através da Inovação, Tradição, Resultados e Protagonismo',
          createdAt: new Date().getTime(),
          user: BOT,
        };
        msg._id = this.state.messages.length + 1;
        this.setState((previouseState) => ({
          messages: GiftedChat.append(previouseState.messages, [msg]),
        }));
        msg = {
          text: 'Pilares do Grupo SEB',
          createdAt: new Date().getTime(),
          user: BOT,
          isOptions: true,
          data : [
            { title: 'Inovação',  image: 'https://classic.exame.com/wp-content/uploads/2020/07/Escola-Luminova.jpg?quality=70&strip=info&w=1024'},
            { title: 'Tradição', image: 'https://s2.glbimg.com/v6SAxCeSgdDUecp1gLjdiXCPSKs=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/j/h/7CNlmWTUqoEMMjkxdAvg/texto4-foto1.jpg'},
            { title: 'Resultados',  image: 'https://novosalunos.com.br/wp-content/uploads/2021/08/SEB-18.jpg'},
            { title: 'Protagonismo',  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSvlenO8K5G5DpO0lWin5tS42aw0Fa5AU42w&usqp=CAU' },
            ],
        };
        
      }else{
      msg = {
          text,
          createdAt: new Date().getTime(),
          user: BOT,
        };
      }
    msg._id = this.state.messages.length + 1;

    this.setState((previouseState) => ({
      messages: GiftedChat.append(previouseState.messages, [msg]),
    }));
  }

  onSend(messages = []) {
    this.setState((previouseState) => ({
      messages: GiftedChat.append(previouseState.messages, messages),
    }));

    let text = messages[0].text;

  

    Dialogflow_V2.requestQuery(
      text,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error),
    );
  }

  onQuickReply(quickReply) {
    this.setState((previouseState) => ({
      messages: GiftedChat.append(previouseState.messages, quickReply),
    }));

    let message = quickReply[0].value;

    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error),
    );
  }

  renderBubble = (props) => {
    if (props.currentMessage.isOptions) {
      return (
        <ScrollView style={{backgroundColor: 'white'}} horizontal={true}>
          {props.currentMessage.data.map((item) => (
            <Card containerStyle={{padding: 0, borderRadius: 15, paddingBottom: 7, overflow: 'hidden'}}
            key={item.title}>
              <Card.Image style={{width:220, height: 110}}
              resizeMode='cover' 
              source={{uri: item.image}}></Card.Image>
              <Card.Divider/>
              <Card.Title>{item.title}</Card.Title>
              <Card.Divider/>
              <Button style={{height: 35}} 
                title="Ver Informações" onPress={() => this.sendBotResponse(item.title)}/>
            </Card>
          ))}
        </ScrollView>
      );
    }

    return (
      <Bubble
        {...props}
        textStyle={{right: {color: 'white' } }}
        wrapperStyle={{left: {backgroundColor: '#D2D1D4' }}}
      />
    );
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={(message) => this.onSend(message)}
          onQuickReply={(quickReply) => this.onQuickReply(quickReply)}
          renderBubble={this.renderBubble}
          user={{_id: 1}}
        />
      </View>
    );
  }
}

export default Chatbot;