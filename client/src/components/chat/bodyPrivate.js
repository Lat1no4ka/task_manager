import { useState, useEffect } from "react";

export const ChatBodyPrivate = (props) => {

    useEffect(() => {
        console.log(props)
    }, [])

    


    const prepareMessage = (message, index) => {
        let date = new Date(message.dateTime)
        date = `${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
        if (props.user.userId == message.sender) {
            return (
                <div key={index} className="my-message m-3">
                    <p className="text">{message.message}</p>
                    <p className="date">{date}</p>
                </div>
            )
        } else {
            return (
                <div key={index} className="other-message">
                    <p className="text">{message.message}</p>
                    <p className="sender">{message.sender}</p>
                    <p className="date">{date}</p>
                </div>
            )

        }
    }

    return (

        <div className="chat-body-private">
            {
                props.messages.map((message, index) => {
                    return prepareMessage(message, index)
                })
            }
        </div>
    )
}