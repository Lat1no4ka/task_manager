import { useState, useEffect } from "react";
import { Paperclip } from 'react-bootstrap-icons';

export const ChatFooter = (props) => {
    const [message, setMesage] = useState("")


    const sendMessage = () => {
        props.sendMessage('CHAT', message)
        setMesage("")
    }

    return (
        <div>
            <div className="d-flex">
                {props.files.length &&
                    props.files.map(file => {
                        console.log(file)
                        return <div className="m-1 mb-0"><p>{file.name}</p></div>
                    })
                }
            </div>
            <div>
                <div className="chat-footer d-flex flex-row">
                    <div className="col-8 m-1 p-0">
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

                    <div className="col-4 m-1 p-0 d-flex" >
                        <div className="image-upload">
                            <label for="file-input">
                                <Paperclip size={30} style={{ cursor: "pointer", height: "40px" }} />
                            </label>
                            <input id="file-input" type="file" multiple={true} onChange={e => props.setFiles(files => [...files, ...e.target.files])} />
                        </div>
                        <input type="button" className="btn btn-secondary" style={{ height: "40px" }} onClick={e => { sendMessage() }} value="Отправить" />

                    </div>
                </div>
            </div>
        </div>
    )
}