import "./chat.scss";
import { ChatHeader } from './header'
import { ChatBody } from './body'
import { ChatFooter } from './footer'
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"

var stompClient = null;
export const Chat = (props) => {
    const user = useSelector(auth => auth.auth)
    const [broadcastMessage, setBroadcastMessage] = useState([])
    const [messagesCounter, setMessagesCounter] = useState(0);

    const connect = () => {
        const Stomp = require("stompjs");
        var SockJS = require("sockjs-client");
        SockJS = new SockJS("http://localhost:8080/ws");
        stompClient = Stomp.over(SockJS);
        stompClient.debug = null
        stompClient.connect({}, onConnected, onError);
    };


    const onMessageReceived = (payload) => {
        var message = JSON.parse(payload.body);
        console.log(new Date(message.dateTime))
        if (message.type === 'JOIN') {
        }
        else if (message.type === 'LEAVE') {
        }
        else if (message.type === 'TYPING') {
        }
        else if (message.type === 'CHAT') {
            broadcastMessage.push({
                message: message.content,
                sender: message.sender,
                dateTime: message.dateTime
            })
            setBroadcastMessage(broadcastMessage)
            setMessagesCounter(broadcastMessage.length)
        }
        else {
        }
    }

    const onConnected = () => {
        // stompClient.subscribe(`/user/${currentUser.id}/reply`, onMessageReceived);
        // stompClient.send('/app/addPrivateUser', {}, JSON.stringify({ sender: currentUser.id, type: 'JOIN' }))
        stompClient.subscribe(`/topic/public`, onMessageReceived);
        stompClient.send('/app/addUser', {}, JSON.stringify({ sender: user.userId, type: 'JOIN' }))

    }

    const onError = (err) => {
        console.error(err)
    }

    const sendMessage = (type, value) => {
        // var chatMessage = {
        //     sender: currentUser.id,
        //     receiver: room.id,
        //     content: value,
        //     type: type

        // };
        // stompClient.send('/app/sendPrivateMessage', {}, JSON.stringify(chatMessage));
        var chatMessage = {
            sender: user.userId,
            content: value,
            type: type

        };
        stompClient.send('/app/sendMessage', {}, JSON.stringify(chatMessage));
    }


    useEffect(() => {
        console.log(user)
        if (!stompClient) {
            console.log("connect()")
            connect()
        }
    }, [messagesCounter])

    return (
        <div className="chat">
            <ChatHeader />
            <ChatBody messages={broadcastMessage} user={user} />
            <ChatFooter sendMessage={sendMessage} />
        </div >
    )
}