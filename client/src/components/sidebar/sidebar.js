import { useState, useEffect } from "react";
import { Chat } from "../chat/chat"
import "./sidebar.scss";

export const SideBar = (props) => {

  if (props.showChat) {
    return (
      < div className="sidebar-show" >
        <Chat  type="public"/>
      </div>

    )
  } else if (props.showFilter) {
    return (
      <div className="sidebar-show" >
        <h1>filter</h1>
      </div>
    )
  } else {
    return (
      <div>
      </div>
    )
  }
}