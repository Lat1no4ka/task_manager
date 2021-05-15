import "./chat.scss";
import { ChatHeader } from './header'
import { ChatBody } from './body'
import { ChatBodyPrivate } from './bodyPrivate'
import { ChatFooter } from './footer'
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { useHttp } from "../../hooks/http.hook";

var stompClient = null;
export const PublicChat = (props) => {
    const user = useSelector(auth => auth.auth)
    const [broadcastMessage, setBroadcastMessage] = useState([])
    const [messagesCounter, setMessagesCounter] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null)
    const { request } = useHttp();

    const connect = () => {
        const Stomp = require("stompjs");
        var SockJS = require("sockjs-client");
        SockJS = new SockJS(`${process.env.REACT_APP_API_URL}/ws`);
        stompClient = Stomp.over(SockJS);
        // stompClient.debug = null
        stompClient.connect({}, onConnected, onError);
    };


    const onMessageReceived = (payload) => {
        console.log("public")
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

    const UpdateSelectedUser = (selectedUserId) => {
        setSelectedUser(selectedUserId)
        setBroadcastMessage([])
        setMessagesCounter(broadcastMessage.length)
    }

    const onConnected = () => {
        if (props.private) {
            stompClient.subscribe(`/user/${user.userId}/reply`, onMessageReceived);
            stompClient.send('/app/addPrivateUser', {}, JSON.stringify({ sender: 1, type: 'JOIN' }))
        } else {
            stompClient.subscribe(`/topic/public`, onMessageReceived);
            stompClient.send('/app/addUser', {}, JSON.stringify({ sender: 1, type: 'JOIN' }))
        }
    }

    const onError = (err) => {
        console.error(err)
    }

    const sendMessage = (type, value) => {
        if (props.private) {
            var chatMessage = {
                sender: 1,
                receiver: 1,
                content: value,
                type: type

            };
            stompClient.send('/app/sendPrivateMessage', {}, JSON.stringify(chatMessage));
        } else {
            var chatMessage = {
                sender: user.userId,
                content: value,
                type: type

            };
            stompClient.send('/app/sendMessage', {}, JSON.stringify(chatMessage));
        }
    }

    const getPublicMessages = async () => {
        const messages = await request(`${process.env.REACT_APP_API_URL}/getPublicMessages`, 'GET')
        let history = []
        messages.forEach(message => {
            let date = new Date(...message.dateTime)
            date = `${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
            history.push({
                message: message.content,
                sender: message.sender,
                dateTime: date
            })
        });
        setBroadcastMessage(history)
        setMessagesCounter(history.length)
    }

    useEffect(() => {
        if (!stompClient) {
            connect()
        }
        getPublicMessages();
    }, [messagesCounter])

    if (props.private) {
        return (
            <div className="chat">
                <ChatHeader />
                <ChatBodyPrivate messages={broadcastMessage} user={user} task={props.data}
                    UpdateSelectedUser={UpdateSelectedUser} />
                {selectedUser ?
                    <ChatFooter sendMessage={sendMessage} />
                    : null
                }
            </div>
        )
    } else {
        return (
            <div className="chat">
                <ChatHeader />
                <ChatBody messages={broadcastMessage} user={user} />
                <ChatFooter sendMessage={sendMessage} />
            </div >
        )
    }
}