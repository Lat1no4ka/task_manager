import "./chat.scss";
import { ChatHeader } from './header'
import { useHttp } from "../../hooks/http.hook";
import { ChatBodyPrivate } from './bodyPrivate'
import { ChatFooter } from './footer'
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"

var stompClient = null;
export const PrivateChat = (props) => {
    const { request } = useHttp();
    const user = useSelector(auth => auth.auth)
    const [broadcastMessage, setBroadcastMessage] = useState([])
    const [messagesCounter, setMessagesCounter] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null)
    const [users, setUsers] = useState([])

    const connect = () => {
        const Stomp = require("stompjs");
        var SockJS = require("sockjs-client");
        SockJS = new SockJS(`${process.env.REACT_APP_API_URL}/ws`);
        stompClient = Stomp.over(SockJS);
        // stompClient.debug = null
        stompClient.connect({}, onConnected, onError);
    };


    const onMessageReceived = (payload) => {
        console.log(JSON.parse(payload.body))
        var message = JSON.parse(payload.body);
        if (message.type === 'CHAT') {
            broadcastMessage.push({
                message: message.content,
                sender: message.sender,
                dateTime: message.dateTime
            })
            setBroadcastMessage(broadcastMessage)
            setMessagesCounter(broadcastMessage.length)
        }

    }
    const onConnected = () => {
        stompClient.subscribe(`/user/${user.userId}/reply`, onMessageReceived);
        stompClient.send('/app/addPrivateUser', {}, JSON.stringify({ sender: user.userId, type: 'JOIN' }))
    }

    const sendMessage = (type, value) => {
        var chatMessage = {
            sender: user.userId,
            receiver: selectedUser,
            content: value,
            type: type

        };
        stompClient.send('/app/sendPrivateMessage', {}, JSON.stringify(chatMessage));
    }

    const onError = (err) => {
        console.error(err)
    }

    const getUsers = async () => {
        const response = await request(`${process.env.REACT_APP_API_URL}/getTaskUsers`, "POST", JSON.stringify({ id: props.data.id }))
        const users = response.filter((allUser) => {
            return allUser.id != user.userId ? allUser : null
        })
        setUsers(users)
    }

    const getPrivateMessages = async () => {
        const data = {
            sender: user.userId,
            receiver: selectedUser
        };
        const messages = await request(`${process.env.REACT_APP_API_URL}/getPrivateMessages`, 'POST', JSON.stringify(data))
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
        getUsers()
        if (!stompClient && selectedUser) {
            connect()
        }
        if (!messagesCounter && selectedUser) {
            getPrivateMessages()
        }
    }, [messagesCounter, selectedUser])
    return (
        <div className="d-flex flex-row w-100">
            <div className="col-2">
                {
                    users.map((user) => {
                        return <button type="button" key={user.id} className="btn btn-secondary"
                            onClick={e => {
                                setSelectedUser(user.id)
                            }}
                        >{user.userName}
                        </button>
                    })
                }
            </div>
            <div className="chat col-9" >
                <ChatHeader />
                <ChatBodyPrivate messages={broadcastMessage} user={user} />
                {selectedUser ?
                    <ChatFooter sendMessage={sendMessage} />
                    : null
                }
            </div>
        </div>
    )

}