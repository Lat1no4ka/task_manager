import { useState, useEffect } from "react";
import { XCircle } from 'react-bootstrap-icons';

export const ChatHeader = (props) => {
    return (
        <div className="chat-header">
            <div className="text-center p-2 m-0">
                <h3>{props.roomName}</h3>

            </div>
        </div>
    )
}