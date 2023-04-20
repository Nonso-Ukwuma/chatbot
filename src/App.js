import logo from './logo.svg';
import './App.css';
import { Widget, addResponseMessage } from 'react-chat-widget-2';
import "react-chat-widget-2/lib/styles.css";
import React, {useEffect} from 'react';
import {Header} from './Banner';
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
              try {
                if (!res.data.resp){
                  let bot_resp = {
                    message: res.data.response.message,
                    title: res.data.response.course_details.course_title,
                    college: res.data.response.course_details.college_name,
                    delivery: res.data.response.course_details.program_delivery,
                    campus: res.data.response.course_details.campus,
                    intake: res.data.response.course_details.intake,
                    url: res.data.response.course_details.program_url
                  }
                  let str = `${bot_resp.message.toUpperCase()} \n\n PROGRAM DETAILS:\n\n College Name: ${bot_resp.college} College\n Course Title: ${bot_resp.title}\n Campus: ${bot_resp.campus}\n Delivery: ${bot_resp.delivery}\n Intake Semester: ${bot_resp.intake}\nFor further details please visit : \n\n ${bot_resp.url}`
                  console.log(res.data.response);
                  console.log('Program Intent');
                  addResponseMessage(str);
                }
                else {
                  console.log(res.data.resp);
                  console.log('Greeting Intent');
                  addResponseMessage(JSON.stringify(res.data.resp));
                }
              } catch(err) {
                throw err;
              }
              
            })
            .catch(err => console.error(err));
  };

  function openChatWidget() {
    // Find the chat widget button and click it to open the widget
    const chatWidgetButton = document.querySelector('.rcw-launcher');
    chatWidgetButton.click();
  }


  return (
    <div className="App rcw-message">
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
