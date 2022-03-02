import React, { useState } from "react";
import { StyleSheet, View, Text, ImageBackground, Pressable, TextInput, Button, TouchableOpacity } from "react-native";

import BackgroundImage from '../assets/BackgroundImage.png';
import ProfileIcon from '../assets/ProfileIcon.svg'


// The application’s Home Screen component that renders the landing page
const HomeScreen = ({ navigation }) => {

  //initial state values 
  const [ name, setName ] = useState('');
  const [ bgColor, setBgColor ] = useState("#fff");

  // function to update the state with the new background color for Chat Screen chosen by the user
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
    <View style={styles.screen}>
      <ImageBackground source={BackgroundImage} resizeMode='cover' style={styles.backgroundImage}>
        <View style={styles.titleBox}>
            <Text style={styles.title}>ChatApp</Text>
        </View>

        <View style={styles.boxHomeScreen}>
          <View style={styles.boxNameInput}>
            <ProfileIcon height={20} width={20}/>
            <TextInput
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
                  style={[styles.color1, styles.colorArrayItem]} 
                  onPress={() => changeBgColor(colors.dark)}>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.color2, styles.colorArrayItem]}
                  onPress={() => changeBgColor(colors.purple)}>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.color3, styles.colorArrayItem]}
                  onPress={() => changeBgColor(colors.blue)}>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.color4, styles.colorArrayItem]}
                  onPress={() => changeBgColor(colors.green)}>
                </TouchableOpacity>     
              </View>
          </View>

          <View style={styles.boxChatButton}>
            <Pressable
                onPress={() => navigation.navigate('Chat', { 
                  name: name,
                  bgColor: bgColor
                  })}>
                  <Text style={styles.chatButtonText}>Start Chatting</Text>
              </Pressable>
          </View>
        </View>  
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  // ****** screen ******
  screen: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  // ****** app title ******
  titleBox: {
    height: '50%',
    width: '88%',
    alignItems: 'center',
    paddingTop: 100
  },
  title: {
    fontSize: 45, 
    fontWeight: "600", 
    color: '#FFFFFF',
  },

  // ****** Home Screen box ******
  boxHomeScreen: {
    backgroundColor: 'rgb(255, 255, 255)', 
    height: '44%',
    width: '88%',
    justifyContent: 'space-around', 
    alignItems: 'center',
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
    backgroundColor: "white"
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
    flex: 0.4,
    width: "88%",
    backgroundColor:"white",
  },
  colorSelectorTitle: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
  },
  colorArray: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginRight: "25%",
    marginTop: 10
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
    flex: 0.3,
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