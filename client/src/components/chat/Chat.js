import "./chat.scss";
import { ChatHeader } from './header'
import { ChatBody } from './body'
import { ChatFooter } from './footer'
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { useHttp } from "../../hooks/http.hook";

var stompClient = null;
export const Chat = (props) => {
    const [files, setFiles] = useState([])
    const user = useSelector(auth => auth.auth)
    const { request } = useHttp();
    const [selectedRoom, setSelectedRoom] = useState(0);
    const [broadcastMessage, setBroadcastMessage] = useState([]);
    const [messages, setMessages] = useState([]);
    const [sendTime, setSendTime] = useState(new Date());
    const [filesId, setFilesId] = useState([])

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
            const prepareMessage = {
                message: message.content,
                sender: message.sender,
                dateTime: message.dateTime
            }
            setBroadcastMessage(prepareMessage);
            setSendTime(message.dateTime);
        }
    }

    const onConnected = () => {
        stompClient.subscribe(`/topic/chat/0`, onMessageReceived);
        stompClient.send('/app/addUser', {}, JSON.stringify({ sender: "Пользователь", type: 'JOIN' }))
        props.tasks.forEach(room => {
            stompClient.subscribe(`/topic/chat/${room.id}`, onMessageReceived);
            stompClient.send('/app/addUser', {}, JSON.stringify({ sender: "Пользователь", type: 'JOIN' }))
        });
    }

    const onError = (err) => {
        console.error(err)
    }

    const sendMessage = (type, value) => {
        var chatMessage = {
            sender: "Пользователь",
            content: value,
            type: type,
            room: selectedRoom,
            file1: null,
            file2: null,
            file3: null,
            file4: null,
            file5: null,
            fileName1: null,
            fileName2: null,
            fileName3: null,
            fileName4: null,
            fileName5: null,
        };
        stompClient.send('/app/sendMessage/0', {}, JSON.stringify(chatMessage));
    }

    const getMessages = async (id) => {
        const messages = await request(`${process.env.REACT_APP_API_URL}/getMessages`, 'POST', JSON.stringify({ room: id }))
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

        setMessages(prev => prev = [...history])
        setSendTime(new Date())
    }

    const changeRoom = (id) => {
        setBroadcastMessage([])
        setMessages([])
        setSelectedRoom(id);
        getMessages(id)
    }

    useEffect(() => {
        if (!stompClient) {
            connect()
        }
        getMessages(selectedRoom)
    }, [])

    useEffect(() => {
        messages.push(broadcastMessage)
    }, [broadcastMessage])
    useEffect(() => {
        if (files.length)
            uploadFile()
    }, [files.length])


    const uploadFile = async () => {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('file', file)
        });
        const headers = { 'Access-Control-Allow-Credentials': 'true' }
        const data = await request(`${process.env.REACT_APP_API_URL}/uploadChatFiles`, "POST", formData, headers)
        const prepareData = data.length ? data.map((file) => {
            return { id: file.id, name: file.fileName }
        }) : null
        setFilesId(prepareData)
    }

    return (
        <div className="d-flex">
            <div className="col-3 p-0 mr-1 m-0 d-flex flex-column">
                <div className="room" onClick={e => changeRoom(0)}> <input type="button" className="btn room-btn" value="Общий чат"></input></div>
                {
                    props.tasks.length ? props.tasks.map(room => {
                        return <div key={room.id} className="room" onClick={e => changeRoom(room.id)}> <input type="button" className="btn room-btn" value={room.taskName}></input></div>
                    }) : null
                }
            </div>
            <div className="chat col-9">
                <ChatHeader />
                <ChatBody messages={messages} user={user} />
                <ChatFooter sendMessage={sendMessage} files={files} setFiles={setFiles} />
            </div >
        </div>
    )
}