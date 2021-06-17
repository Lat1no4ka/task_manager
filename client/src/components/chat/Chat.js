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
    const [roomName, setRoomName] = useState('Общий чат')
    const [broadcastMessage, setBroadcastMessage] = useState([]);
    const [messages, setMessages] = useState([]);
    const [sendTime, setSendTime] = useState(new Date());
    const [filesField, setFilesField] = useState([])
    const data = JSON.parse(localStorage.getItem("userData"));

    const connect = () => {
        const Stomp = require("stompjs");
        var SockJS = require("sockjs-client");
        SockJS = new SockJS(`${process.env.REACT_APP_API_URL}/ws`);
        stompClient = Stomp.over(SockJS);
        stompClient.debug = null
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
            const fileLink1 = JSON.parse(message.fileLink1)
            const fileLink2 = JSON.parse(message.fileLink2)
            const fileLink3 = JSON.parse(message.fileLink3)
            const fileLink4 = JSON.parse(message.fileLink4)
            const fileLink5 = JSON.parse(message.fileLink5)
            const prepareMessage = {
                message: message.content,
                sender: message.sender,
                dateTime: message.dateTime,
                file1: { name: message?.fileName1, link: fileLink1?.link },
                file2: { name: message?.fileName2, link: fileLink2?.link },
                file3: { name: message?.fileName3, link: fileLink3?.link },
                file4: { name: message?.fileName4, link: fileLink4?.link },
                file5: { name: message?.fileName5, link: fileLink5?.link },
            }
            setBroadcastMessage(prepareMessage);
            setSendTime(message.dateTime);
        }
    }

    const onConnected = () => {
        stompClient.subscribe(`/topic/chat/0`, onMessageReceived);
        stompClient.send('/app/addUser', {}, JSON.stringify({ sender: data.data.firstName + ' ' + data.data.lastName, type: 'JOIN' }))
        props.tasks.forEach(room => {
            stompClient.subscribe(`/topic/chat/${room.id}`, onMessageReceived);
            stompClient.send('/app/addUser', {}, JSON.stringify({ sender: data.data.firstName + ' ' + data.data.lastName, type: 'JOIN' }))
        });
    }

    const onError = (err) => {
        console.error(err)
    }

    const sendMessage = (type, value) => {
        var chatMessage = {
            sender: data.data.firstName + ' ' + data.data.lastName,
            content: value,
            type: type,
            room: selectedRoom,
            fileLink1: filesField[0]?.id,
            fileLink2: filesField[1]?.id,
            fileLink3: filesField[2]?.id,
            fileLink4: filesField[3]?.id,
            fileLink5: filesField[4]?.id,
            fileName1: filesField[0]?.fileName,
            fileName2: filesField[1]?.fileName,
            fileName3: filesField[2]?.fileName,
            fileName4: filesField[3]?.fileName,
            fileName5: filesField[4]?.fileName,
        };
        if (value.trim() != '' || files)
            stompClient.send('/app/sendMessage/0', {}, JSON.stringify(chatMessage));
        setFiles([])
        setFilesField([])
    }

    const getMessages = async (id) => {
        const messages = await request(`${process.env.REACT_APP_API_URL}/getMessages`, 'POST', JSON.stringify({ room: id }))
        let history = []
        messages.forEach(message => {
            let fileLink1 = JSON.parse(message.fileLink1)
            let fileLink2 = JSON.parse(message.fileLink2)
            let fileLink3 = JSON.parse(message.fileLink3)
            let fileLink4 = JSON.parse(message.fileLink4)
            let fileLink5 = JSON.parse(message.fileLink5)
            let date = new Date(...message.dateTime)
            date = `${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
            history.push({
                message: message.content,
                sender: message.sender,
                dateTime: date,
                file1: { name: message?.fileName1, link: fileLink1?.link },
                file2: { name: message?.fileName2, link: fileLink2?.link },
                file3: { name: message?.fileName3, link: fileLink3?.link },
                file4: { name: message?.fileName4, link: fileLink4?.link },
                file5: { name: message?.fileName5, link: fileLink5?.link },
            })
        });

        setMessages(prev => prev = [...history])
        setSendTime(new Date())
    }

    const changeRoom = (id, taskName) => {
        setBroadcastMessage([])
        setMessages([])
        setSelectedRoom(id);
        setRoomName(taskName)
        getMessages(id)
        setFiles([])
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
        setFilesField(data)
    }


    return (
        <div className="d-flex">
            <div className="col-3 p-0 mr-1 m-0 d-flex flex-column scroll-room" style={{background:'#b6b8b9', borderRadius:'10px' }}>
                <div className="room" onClick={e => changeRoom(0, "Общий чат")}> <input type="button" className="btn room-btn" value="Общий чат"></input></div>
                {
                    props.tasks.length ? props.tasks.map(room => {
                        return <div key={room.id} className="room" onClick={e => changeRoom(room.id, room.taskName)}> <input type="button" className="btn room-btn" value={room.taskName}></input></div>
                    }) : null
                }
            </div>
            <div className="chat col-9 m-0 p-0">
                <ChatHeader roomName={roomName} />
                <ChatBody messages={messages} user={user} time={new Date()} />
                <ChatFooter sendMessage={sendMessage} files={files} setFiles={setFiles} />
            </div >
        </div>
    )
}
