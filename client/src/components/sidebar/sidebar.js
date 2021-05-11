import { useState, useEffect } from "react";
import { PublicChat } from "../chat/publicChat"
import "./sidebar.scss";

export const SideBar = (props) => {

  if (props.showChat) {
    return (
      < div className="sidebar-show" >
        <PublicChat  private={false}/>
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