import React, { useEffect, useState, useCallback } from "react";

//importing Gifted Chat (UI for chat) component
import { GiftedChat, Bubble } from "react-native-gifted-chat";

//importing UI components from react-native
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";



// The application’s Chat component that renders the chat UI
export default function Chat ({route, navigation}) {
  const [ messages, setMessages ] = useState([]);

  //props from HomeScreen
  const name = route.params.name;
  const bgColor = route.params.bgColor;
  console.log(bgColor);

  //Setting user name as the header title
  useEffect(() => {
    navigation.setOptions({ title:name });
  }, []);


  //Setting default messages; one from a default user and one from the system announcing who just entered the chat
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: `${name} has entered the chat`,
        createdAt: new Date(),
        system: true,
       },
    ])
  }, [])

  //function to add message to messages[array]; takes array of existing messages and appends current message to it
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])


  //function to adjust Bubble backgroundColor to color chosen by user
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: bgColor,
            padding: 2,
          },
          left: {
            backgroundColor: "#E2E2E2",
            padding: 2
          }
        }}
      />
    )
  }
  

  return (
    <View style={styles.chatScreen}>
      <GiftedChat
      renderBubble={renderBubble}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  )
}


//styles 
const styles = StyleSheet.create({
  chatScreen: {
    flex: 1,
  },
});

