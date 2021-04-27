import "./chat.scss";
import { useState, useEffect } from "react";
import { X } from 'react-bootstrap-icons';
import SockJS from "sockjs-client";
import Stomp from "@stomp/stompjs";

var stompClient = null;
export const Chat = (props) => {
    const [chatMessage, setChatMessage] = useState("")
    const [broadcastMessage, setBroadcastMessage] = useState([]);
    const connect = () => {
        const Stomp = require("stompjs");
        var SockJS = require("sockjs-client");
        SockJS = new SockJS("http://localhost:8080/ws");
        stompClient = Stomp.over(SockJS);
        stompClient.connect({}, () => { if (stompClient.connected) onConnected() }, onError());
    };


    const onMessageReceived = (payload) => {
        var message = JSON.parse(payload.body);
        if (message.type === 'CHAT') {
            broadcastMessage.push({
                message: message.content,
                sender: message.sender,
                dateTime: message.dateTime
            })

            setBroadcastMessage(broadcastMessage)

        }
    }
    const onConnected = () => {
        stompClient.subscribe(`/user/${props.user_id == 1 ? 1 : 2}/reply`, onMessageReceived);
        stompClient.send('/app/addPrivateUser', {}, JSON.stringify({ sender: props.user_id == 1 ? 2 : 1, type: 'JOIN' }))
    }

    const onError = (err) => {
    }

    const sendMessage = (type, value) => {
        if (stompClient) {
            var chatMessage = {
                sender: props.user_id == 1 ? 1 : 2,
                receiver: props.user_id == 1 ? 2 : 1,
                content: value,
                type: type

            };
            stompClient.send('/app/sendPrivateMessage', {}, JSON.stringify(chatMessage));

        }
    }

    const handleSendMessage = (e) => {
        e.preventDefault()
        sendMessage('CHAT', chatMessage)
    }

    useState(() => {
        connect()
    })

    return (
        <div className="chat open_chat">
            <div className="chat-header">
                <button type="button" className="btn primary"
                    onClick={e => { props.setOpenChat(false) }}
                >
                    <X size={23} />
                </button>
            </div>
            <div className="chat-body">

            </div>
            <div className="chat-fother">
                <div>
                    <textarea
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                handleSendMessage(e);
                                setChatMessage("")
                                e.target.value = e.target.value.replace("\n", "")
                                e.target.value = null
                            }
                        }}
                        onChange={e => setChatMessage(e.target.value)}
                    >
                    </textarea>
                </div>
            </div>
        </div >
    )
}