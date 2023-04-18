import logo from './logo.svg';
import './App.css';
import { Widget, addResponseMessage } from 'react-chat-widget-2';
import "react-chat-widget-2/lib/styles.css";
import React, {useEffect} from 'react';
import {Header} from './Banner';
//import data from './data/Intent - loyalist.json'
import axios from 'axios'


function App() {

  const user_message = { user_msg: "hi there"}
  const post_header = { headers: { Authorization: "Token 765748457ff27599526cbe1ae2fd3c773fd76cdc"} }

  useEffect(() => {
    openChatWidget();
    const message = 'Welcome to loyalist college, How can I help you today!'
    addResponseMessage(message)
    /*
    axios.post('http://137.184.170.69/botapi/askthebot/', user_message, post_header)
            .then(res => {addResponseMessage(res.data.botresponse)})
            .catch(err => console.error(err));
    //console.log(data) */
  }, []); 

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    axios.post('http://137.184.170.69/botapi/askthebot/', user_message, post_header)
            .then(res => {addResponseMessage(res.data.botresponse)})
            .catch(err => console.error(err));

    //console.log(`Response from Django Server: ${bot_data}`);
    //const response = 'You are welcome buddy'
    //addResponseMessage(response);
  };

  function openChatWidget() {
    // Find the chat widget button and click it to open the widget
    const chatWidgetButton = document.querySelector('.rcw-launcher');
    chatWidgetButton.click();
  }


  return (
    <div className="App">
        <Header/>
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          profileAvatar={logo}
          title="Loyalist Chatbot"
          subtitle="Admission Assistant"
        />
    </div>
  );
}

export default App;
