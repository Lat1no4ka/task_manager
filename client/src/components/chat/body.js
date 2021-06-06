import { useState, useEffect } from "react";


export const ChatBody = (props) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages(props.messages)
    }, [props.messages.length])

    const prepareMessage = (message, index) => {
        let date = new Date(message.dateTime)
        date = `${date.getHours()}:${date.getMinutes()}`
        if (props.user.userId == message.sender) {
            return (
                <div key={index} className="my-message m-3">
                    <p className="text">{message.message}</p>
                    <p className="date">{date}</p>
                </div>
            )
        } else {
            return (
                <div className="other-message">
                    <p className="text">{message.message}</p>
                    <p className="sender">{message.sender}</p>
                    <p className="date">{date}</p>
                </div>
            )

        }
    }

    return (
        <div className="chat-body">
            <div className="chat-body-scroll">
                {
                    messages.map((message, index) => {
                        return prepareMessage(message, index)
                    })
                }
            </div>
        </div>
    )
}