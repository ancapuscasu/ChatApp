import React, { Component } from "react";

//importing Gifted Chat (UI for chat) component
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";

import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';

//importing UI components from react-native
import { View, StyleSheet, KeyboardAvoidingView, Platform, LogBox } from "react-native";

import CustomActions from "./CustomActions";
import MapView from "react-native-maps";

//importing Firestore
import * as firebase from 'firebase';
import "firebase/firestore";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNvn-F_B4yAy-IAu1aamHaaVRK41_-pXc",
  authDomain: "chatapp-a0571.firebaseapp.com",
  projectId: "chatapp-a0571",
  storageBucket: "chatapp-a0571.appspot.com",
  messagingSenderId: "315627559724",
  appId: "1:315627559724:web:4fe59e4029e19d72e0aa89",
  measurementId: "G-56FSQMJTRX"
};




export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
      isConnected: false,
      image: null,
      location: null,
    }

    //initializing Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // reference to the Firestore MESSAGES collection
    this.referenceChatMessages = firebase
      .firestore()
      .collection('messages');
    this.referenceUserMessages = null;

     // Removes warning message in the iOS Simulator console -- CHECK LATER
    LogBox.ignoreAllLogs();
  }

  /**
   * when updated set the messages state with the current data 
  */
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
        image: data.image || null,
        location: data.location || null
      });
    });
    this.setState({
      messages: messages,
    });
    this.saveMessages();
  };



  /**
   * Add message to messages collection
  */
  addMessages() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: this.state.user,
      image: message.image || "",
      location: message.location || null,
    });
  }

  //FUNCTION TO DELETE COLLECTION DOCUMENTS - CHECK LATER
  // deleteDocuments() {
  //   this.referenceChatMessages.listDocuments().then(val => {
  //     val.map((val) => {
  //       val.delete()
  //     })
  //   })
  // }

  /**
   * Function to add messages array to AsyncStorage - stringifies messages object
  */
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  /**
   * function to get messages from AsynStorage - sets messages state with parsed item
  */
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];//set empty if there is no storage item
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };


  /**
   * function to remove messages item from AsyncStorage
  */
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }


  componentDidMount() {
    //Setting user name as the header title once Chat is loaded
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    //Checks user's connection status (online or offline)
    NetInfo.fetch().then(connection => {

      //Action if user is online - authenticate the user and get their messages from Firestore
      if (connection.isConnected) {
        this.setState({ 
          isConnected: true
        });
        console.log('online');
        // user can sign in anonymously
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
              await firebase.auth().signInAnonymously();
          }
          //update user state with currently active user data
          this.setState({
              uid: user.uid,
              messages: [],
              user: {
                _id: user.uid,
                name: name,
                avatar: "https://placeimg.com/140/140/any",
              },
          });
          // listens for updates in the collection
          this.unsubscribe = this.referenceChatMessages
            .orderBy("createdAt", "desc")
            .onSnapshot(this.onCollectionUpdate)
          // create a reference to the active user's messages
          this.referenceUserMessages = firebase
            .firestore()
            .collection("messages")
            .where("uid", "==", this.state.uid);
        });
        //save messages when online
        this.saveMessages();

        //actions when user is offline - get messages from AsyncStorage
      } else {
          console.log('offline');
          this.setState({ 
            isConnected: false
          });
          //retrieve chat from asyncstorage
          this.getMessages();
        }
    });

  
  }

  /**
   * Stop listening to authentication and collection changes
  */
 
  componentWillUnmount() {
      this.unsubscribe();
      this.authUnsubscribe();
  }


  /**
   * function to add message to messages[array]; 
   * takes array of existing messages and appends current message to it
  */

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessages();
      this.saveMessages();
      // this.deleteMessages();
    })
  }


  /**
   * function to adjust Bubble backgroundColor to color chosen by user
  */
   renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#FF7777",
          },
        }}
      />
    );
  }

  /**
   * Function to hide inputbar when offline
  */
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar
        {...props}
        />
      )
    }
  }

  /**
  * Function to display the communication features 
  * (get image from camera roll, take a photo or send location)
  */
  renderCustomActions(props) {
    return <CustomActions {...props} />;
  }
  
  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region = {{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          />
      )
    }
    return null;
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.route.params.bgColor }}>
        {/* <Text>{this.state.loggedInText}</Text> */}
        <GiftedChat
        renderBubble={this.renderBubble.bind(this)}
        renderInputToolbar={this.renderInputToolbar.bind(this)}
        renderActions={this.renderCustomActions}
        renderCustomView={this.renderCustomView}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.state.user._id,
          name: this.state.name,
          avatar: this.state.user.avatar
      }}
      />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    )
  }
}


