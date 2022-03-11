import React, { useState } from "react";

//importing UI components from react-native
import { StyleSheet, View, Text, ImageBackground, Platform, Pressable, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";

//importing assets
import BackgroundImage from '../assets/BackgroundImage.png';
import ProfileIcon from '../assets/ProfileIcon.svg'



// The application’s Home Screen component that renders the landing page
const HomeScreen = ({ navigation }) => {

  //initial state values (username and bubble background color)
  const [ name, setName ] = useState('');
  const [ bgColor, setBgColor ] = useState("#999");

  // function to update the state with the new background color for Chat bubble chosen by the user
  const changeBgColor = newColor => {
    setBgColor(newColor);
  }

  // background colors to choose from; used to update bgColor state
  const colors = {
    dark: "#090C08",
    purple: '#474056',
    blue: '#8A95A5',
    green: '#B9C6AE'
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="height">
      <ImageBackground source={BackgroundImage} resizeMode='cover' style={styles.backgroundImage}>
        <Text style={styles.title}>ChatApp</Text>

        <View style={styles.boxHomeScreen}>
          <View style={styles.boxNameInput}>
            <ProfileIcon height={20} width={20}/>
            <TextInput
              accessible={true}
              accessibilityLabel='Your name'
              accessibilityHint='Type your name to enter the chat room'
              style={styles.nameInput}
              onChangeText={(name) => setName(name)}
              value={name}
              placeholder="Your Name"
            />
          </View>

          <View style={styles.boxColorSelector}>
            <Text style={styles.colorSelectorTitle}> Choose Background Color: </Text>
            <View style={styles.colorArray}>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel='Black background'
                  accessibilityHint='Adds black background to the chat'
                  accessibilityRole='button'
                  style={[styles.color1, styles.colorArrayItem]} 
                  onPress={() => changeBgColor(colors.dark)}>
                </TouchableOpacity>
                <TouchableOpacity 
                  accessible={true}
                  accessibilityLabel='Purple background'
                  accessibilityHint='Adds purple background to the chat screen'
                  accessibilityRole='button'
                  style={[styles.color2, styles.colorArrayItem]}
                  onPress={() => changeBgColor(colors.purple)}>
                </TouchableOpacity>
                <TouchableOpacity 
                  accessible={true}
                  accessibilityLabel='Blue background'
                  accessibilityHint='Adds blue background to the chat screen'
                  accessibilityRole='button'
                  style={[styles.color3, styles.colorArrayItem]}
                  onPress={() => changeBgColor(colors.blue)}>
                </TouchableOpacity>
                <TouchableOpacity 
                  accessible={true}
                  accessibilityLabel='Green background'
                  accessibilityHint='Adds green background to the chat screen'
                  accessibilityRole='button'
                  style={[styles.color4, styles.colorArrayItem]}
                  onPress={() => changeBgColor(colors.green)}>
                </TouchableOpacity>     
              </View>
          </View>

          <View style={styles.boxChatButton}>
            <Pressable
              accessible={true}
              accessibilityLabel='Start chatting'
              accessibilityHint='Lets you enter the chat room'
              accessibilityRole='button'
              onPress={() => navigation.navigate('Chat', { 
                name: name,
                bgColor: bgColor
                })}>
                <Text style={styles.chatButtonText}>Start Chatting</Text>
            </Pressable>
          </View>
        </View>  
      </ImageBackground>
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </KeyboardAvoidingView>
  );
}



//styles

const styles = StyleSheet.create({
  // ****** screen ******
  screen: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  // ****** app title ******
  title: {
    textAlign: "center",
    fontSize: 45, 
    fontWeight: "600", 
    color: '#FFFFFF',
    top: "15%",
  },

  // ****** Home Screen box ******
  boxHomeScreen: {
    backgroundColor: 'rgb(255, 255, 255)', 
    width: '88%',
    justifyContent: 'space-around', 
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 15,
    paddingBottom: 15,
    },

  // ****** Name Input ******
  boxNameInput: {
    borderWidth: 2,
    borderRadius: 3,
    borderColor: 'grey',
    width: '88%',
    height: 60,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "white",
  },
  nameInput: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 50,
    marginLeft: 10
  },

  // ****** Color Selector ******
  boxColorSelector: {
    width: "88%",
    backgroundColor:"white",
    paddingTop: 10,
    paddingBottom: 10
  },
  colorSelectorTitle: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    paddingTop: 5,
  },
  colorArray: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginRight: "25%",
    paddingTop: 5,
    paddingBottom: 5,
  },
  colorArrayItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  color1: {
    backgroundColor: "#090C08",
  },
  color2: {
    backgroundColor: '#474056',
  },
  color3: {
    backgroundColor: '#8A95A5',
  },
  color4: {
    backgroundColor: '#B9C6AE',
  },

  // ****** Start Chat Button ******
  boxChatButton: {
    height: 60,
    width: "88%",
    backgroundColor: "#757083",
    alignItems: "center",
    justifyContent: "center"
  },
  chatButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff"
  }
});

export default HomeScreen;