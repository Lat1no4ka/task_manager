import "./chat.scss";
import { useState, useEffect } from "react";
import { X } from 'react-bootstrap-icons';
import SockJS from "sockjs-client";
import Stomp from "@stomp/stompjs";
import { CaretDownFill } from 'react-bootstrap-icons';

var stompClient = null;
export const Chat = (props) => {
    const [selectedRoom, setSelectedRoom] = useState(false);
    const [users, setUsers] = useState([]);
    const [room, setRoom] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [toggle, setToggle] = useState(false);
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
            console.log(room)
            setBroadcastMessage(broadcastMessage)
        }
    }

    const onConnected = () => {
        if (room) {
            stompClient.subscribe(`/user/${currentUser.id}/reply`, onMessageReceived);
            stompClient.send('/app/addPrivateUser', {}, JSON.stringify({ sender: currentUser.id, type: 'JOIN' }))
        }
        else {
            stompClient.subscribe(`/topic/public`, onMessageReceived);
            stompClient.send('/app/addUser', {}, JSON.stringify({ sender: "test", type: 'JOIN' }))
        }
    }

    const onError = (err) => {
    }

    const sendMessage = (type, value) => {
        if (stompClient) {
            if (room) {
                var chatMessage = {
                    sender: currentUser.id,
                    receiver: room.id,
                    content: value,
                    type: type

                };
                stompClient.send('/app/sendPrivateMessage', {}, JSON.stringify(chatMessage));
            } else {
                var chatMessage = {
                    sender: currentUser.userName,
                    content: value,
                    type: type

                };
                stompClient.send('/app/sendMessage', {}, JSON.stringify(chatMessage));
            }

        }
    }

    const handleSendMessage = (e) => {
        e.preventDefault()
        sendMessage('CHAT', chatMessage)
    }

    const getCurrentUser = () => {
        let curUser = props.users.find((user) => {
            return props.userId == user.id ? user : null;
        })
        let other = props.users.filter((user)=>{
            return props.userId != user.id ? user : null;
        })
        setUsers(other  )
        setCurrentUser(curUser)
    }

    const selectChatRoom = (room) => {
        connect()
        setRoom(room)
    }

    useState(() => {
        getCurrentUser()
    }, [])


    const SelectRoom = () => {
        return <div>
            <div className="d-flex col-12">
                <input type="input" className="form-control" readOnly={true}
                    value={room ? room.userName : "Общий"}
                    onFocus={(e) => {
                    }}
                    onClick={e => {
                        setSelectedRoom(!selectedRoom);
                        setToggle(!toggle)
                    }}
                >
                </input><CaretDownFill className={toggle ? "toggle-arrow" : "toggle-arrow-active"} />
            </div>
            {
                selectedRoom ?
                    <div className="list-group list-group-pos col-4">
                        <button
                            type="button"
                            className="list-group-item list-group-item-action"
                            onClick={(e) => {
                                setToggle(false)
                                setSelectedRoom(false)
                                selectChatRoom(null)
                            }}
                        >
                            "Общий"
                        </button>
                        {users.map((user) => {
                            return (
                                <button
                                    type="button"
                                    className="list-group-item list-group-item-action"
                                    id={user.id}
                                    key={user.id}
                                    onClick={(e) => {
                                        setToggle(false)
                                        setSelectedRoom(false)
                                        selectChatRoom(user)
                                    }}
                                >
                                    {user.userName}
                                </button>
                            )
                        })}
                    </div>
                    : ""
            }
        </div>
    }

    return (
        <div className="chat open_chat">
            <div className="chat-header d-flex justify-content-between">
                <SelectRoom />
                <button type="button" className="btn primary"
                    onClick={e => { props.setOpenChat(false) }}
                >
                    <X size={23} />
                </button>
            </div>
            <div className="chat-body">
                {
                    broadcastMessage.map((mess, index) => {
                        return (
                            <div key={index} className="d-flex flex-column">
                                
                                <p className={mess.sender == currentUser.id ? 'text-right' : "text-left"}>{mess.message}</p>
                                </div>
                        )
                    })
                }
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