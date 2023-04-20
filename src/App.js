import logo from './logo.svg';
import './App.css';
import { Widget, addResponseMessage } from 'react-chat-widget-2';
import "react-chat-widget-2/lib/styles.css";
import React, {useEffect} from 'react';
import {Header} from './Banner';
//import data from './data/Intent - loyalist.json'
import axios from 'axios'


function App() {

  useEffect(() => {
    openChatWidget();
    const message = 'Hello, Welcome to loyalist college, I can provide details on the programs offered here at Loyalist College. Which program are you looking for today?'
    addResponseMessage(message)
  
  }, []); 


  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    const user_message = { user_msg: newMessage}
    const post_header = { headers: { Authorization: "Token 765748457ff27599526cbe1ae2fd3c773fd76cdc"} }

    axios.post('http://137.184.170.69/botapi/askthebot/', user_message, post_header)
            .then(res => {
              addResponseMessage(res.data);
              console.log(res.data);})
            .catch(err => console.error(err));
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
          subtitle="Program/Course Assistant"
        />
    </div>
  );
}

export default App;
