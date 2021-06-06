import { useState, useEffect } from "react";
import { TriangleFill } from 'react-bootstrap-icons';

export const ChatFooter = (props) => {
    const [message, setMesage] = useState("")


    const sendMessage = () => {
        props.sendMessage('CHAT', message)
        setMesage("")
    }

    return (
        <div className="chat-footer d-flex flex-row">
            <div className="col-11">
                <textarea
                    value={message}
                    onChange={e => { setMesage(e.target.value) }}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}>

                </textarea>
            </div>
            <div className="col-1">
                <input type="button" className="btn" onClick={e => { sendMessage() }} value="Отправить" />
            </div>
        </div>
    )
}