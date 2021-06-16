import { useState, useEffect } from "react";
import { Paperclip, FileCheck } from 'react-bootstrap-icons';

export const ChatFooter = (props) => {
    const [message, setMesage] = useState("")


    const sendMessage = () => {
        props.sendMessage('CHAT', message)
        setMesage("")
    }

    return (
        <div>
            <div>
                <div className="chat-footer d-flex flex-row">
                    <div className="col-8 m-1 p-0">
                        <textarea
                            value={message}
                            onChange={e => { setMesage(e.target.value.replace (/[\n\r]/g, '')) }}
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
            <div className="d-flex flex-column">
                {props.files.length ?
                    props.files.map(file => {
                        return <div className="m-1 mb-0 file-added d-flex "> <FileCheck size={20} className="mr-2"/> <div>{file.name}</div></div>
                    }) : null
                }
            </div>
        </div>
    )
}