import { useState, useEffect, useRef } from "react";
import { FileArrowDown } from 'react-bootstrap-icons';

export const ChatBody = (props) => {
    const [messages, setMessages] = useState([]);
    const data = JSON.parse(localStorage.getItem("userData"));
    const name = data.data.firstName + ' ' + data.data.lastName;
    const messagesEndRef = useRef(null)
    useEffect(() => {
        setMessages(props.messages)
    }, [props.messages])

    
    useEffect(() => {
        scrollToBottom()
    }, [messages,messages.length, props.time])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const prepareMessage = (message, index) => {
        let date = new Date(message.dateTime)
        date = `${date.getHours()}:${date.getMinutes()}`
        if (name == message.sender) {
            return (
                <div className="m-2">
                    {message.message ?
                        <div className="d-flex justify-content-end">
                            <div className="my-message m-1 col-9">
                                <p className="text">{message.message}</p>
                                <p className="date">{date}</p>
                            </div>
                        </div> : null
                    }
                    {message.file1?.link ?
                        <div className="d-flex justify-content-end">
                            <div className="my-message m-1 d-flex flex-column col-9">
                                {message.file1?.link ? <div> <FileArrowDown size={20} /> <a href={message.file1.link}>{message.file1.name}</a></div> : null}
                                {message.file2?.link ? <div> <FileArrowDown size={20} /> <a href={message.file2.link}>{message.file2.name}</a></div> : null}
                                {message.file3?.link ? <div> <FileArrowDown size={20} /><a href={message.file3.link}>{message.file3.name}</a></div> : null}
                                {message.file4?.link ? <div><FileArrowDown size={20} /> <a href={message.file4.link}>{message.file4.name}</a></div> : null}
                                {message.file5?.link ? <div><FileArrowDown size={20} /> <a href={message.file5.link}>{message.file5.name}</a></div> : null}
                                <p className="date">{date}</p>
                            </div>
                        </div>
                        : null}
                </div>
            )
        } else {
            return (
                <div className="m-2">
                    {message.message ?
                        <div className="d-flex justify-content-start">
                            <div className="other-message m-1 col-9">
                                <p className="text">{message.message}</p>
                                <p className="sender">{message.sender}</p>
                                <p className="date">{date}</p>
                            </div>
                        </div>
                        : null
                    }
                    {message.file1?.link ?
                        <div className="d-flex justify-content-start">
                            <div className="other-message m-1 d-flex flex-column col-9">
                                {message.file1?.link ? <div> <FileArrowDown size={20} /> <a href={message.file1.link}>{message.file1.name}</a></div> : null}
                                {message.file2?.link ? <div> <FileArrowDown size={20} /> <a href={message.file2.link}>{message.file2.name}</a></div> : null}
                                {message.file3?.link ? <div> <FileArrowDown size={20} /><a href={message.file3.link}>{message.file3.name}</a></div> : null}
                                {message.file4?.link ? <div><FileArrowDown size={20} /> <a href={message.file4.link}>{message.file4.name}</a></div> : null}
                                {message.file5?.link ? <div><FileArrowDown size={20} /> <a href={message.file5.link}>{message.file5.name}</a></div> : null}
                                <p className="date">{date}</p>
                            </div>
                        </div>
                        : null}
                </div>
            )

        }
    }

    return (
        <div className="chat-body">
            <div className="chat-body-scroll p-0 w-100">
                {
                    messages.map((message, index) => {
                        return prepareMessage(message, index)
                    })
                }
                <div ref={messagesEndRef}></div>
            </div>
        </div>
    )
}