import "./chat.scss";
import { ChatHeader } from './header'
import { ChatBody } from './body'
import { ChatFooter } from './footer'
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { useHttp } from "../../hooks/http.hook";

var stompClient = null;
export const Chat = (props) => {
    const user = useSelector(auth => auth.auth)
    const { request } = useHttp();
    const [selectedRoom, setSelectedRoom] = useState(0);
    const [broadcastMessage, setBroadcastMessage] = useState([]);
    const [sendTime, setSendTime] = useState(new Date());

    const connect = () => {
        const Stomp = require("stompjs");
        var SockJS = require("sockjs-client");
        SockJS = new SockJS(`${process.env.REACT_APP_API_URL}/ws`);
        stompClient = Stomp.over(SockJS);
        // stompClient.debug = null
        stompClient.connect({}, onConnected, onError);
    };


    const onMessageReceived = (payload) => {
        var message = JSON.parse(payload.body);
        if (message.type === 'JOIN') {
        }
        else if (message.type === 'LEAVE') {
        }
        else if (message.type === 'TYPING') {
        }
        else if (message.type === 'CHAT') {
            let allMessages = broadcastMessage;
            allMessages.push({
                message: message.content,
                sender: message.sender,
                dateTime: message.dateTime
            })
            setBroadcastMessage(allMessages);
            setSendTime(message.dateTime);
        }
    }

    const onConnected = () => {
        stompClient.subscribe(`/topic/chat/0`, onMessageReceived);
        stompClient.send('/app/addUser', {}, JSON.stringify({ sender: user.userId, type: 'JOIN' }))
        props.tasks.forEach(room => {
            stompClient.subscribe(`/topic/chat/${room.id}`, onMessageReceived);
            stompClient.send('/app/addUser', {}, JSON.stringify({ sender: user.userId, type: 'JOIN' }))
        });
    }

    const onError = (err) => {
        console.error(err)
    }

    const sendMessage = (type, value) => {
        var chatMessage = {
            sender: user.userId,
            content: value,
            type: type,
            room: selectedRoom,
        };
        stompClient.send('/app/sendMessage/0', {}, JSON.stringify(chatMessage));
    }

    // const getMessages = async () => {
    //     const messages = await request(`${process.env.REACT_APP_API_URL}/getMessages`, 'POST', JSON.stringify({ room: selectedRoom }))
    //     messages.forEach(message => {
    //         let date = new Date(...message.dateTime)
    //         date = `${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
    //         history.push({
    //             message: message.content,
    //             sender: message.sender,
    //             dateTime: date
    //         })
    //     });
    //     setBroadcastMessage(history)
    //     setMessagesCounter(history.length)
    // }

    const changeRoom = (id) => {
        setSelectedRoom(id);
    }

    useEffect(() => {
        if (!stompClient) {
            connect()
        }
    }, [])

    useEffect(() => {
    }, [sendTime])

    return (
        <div className="d-flex">
            <div className="col-3 d-flex flex-column">
                <div className="room" onClick={e => changeRoom(0)}> <input type="button" className="btn room-btn" value="Общий чат"></input></div>
                {
                    props.tasks.length ? props.tasks.map(room => {
                        return <div key={room.id} className="room" onClick={e => changeRoom(room.id)}> <input type="button" className="btn room-btn" value={room.taskName}></input></div>
                    }) : null
                }
            </div>
            <div className="chat col-9">
                <ChatHeader />
                <ChatBody messages={broadcastMessage} user={user} />
                <ChatFooter sendMessage={sendMessage} />
            </div >
        </div>
    )
}