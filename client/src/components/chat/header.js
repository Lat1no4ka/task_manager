import { useState, useEffect } from "react";
import { XCircle } from 'react-bootstrap-icons';

export const ChatHeader = (props) => {
    return (
        <div className="d-flex chat-header">
            <div className="text-center col-11">
                {props.currUsers ? <h3>{props.currUsers.userName}</h3> :
                    <h1>Общий чат</h1>
                }
            </div>
            <div className="col-1">
                {props.setOpenChat ?
                    <XCircle size={22} className="x-circle" onClick={e => props.setOpenChat(false)} />
                    : null
                }
            </div>
        </div>
    )
}