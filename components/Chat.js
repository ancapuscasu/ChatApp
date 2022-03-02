import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";


// The application’s Chat component that renders the chat UI
const Chat = ({route, navigation}) => {
  console.log(route);

  let name = route.params.name;
  const { bgColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title:name });
  }, []);
  

  const styles = StyleSheet.create({
    chatScreen: {
      flex: 1,
      backgroundColor: bgColor
    },
  });

  return (
    <View style={styles.chatScreen}>
    </View>
  )
}


export default Chat;

