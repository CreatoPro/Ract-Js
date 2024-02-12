import React, { Component } from "react";
import {ILoader} from './../../_components/iloader/iloader';
import { Container } from "react-bootstrap";
import styles from "./components/chatbot.css"
class chatbot extends Component {
  componentDidMount(){
    // localStorage.setItem('',)
  }
  render() {
    return (
      <>
        <iframe
        src="https://d3og1fncqe9lrx.cloudfront.net/index.html?enquiryId=94">
        </iframe>
      </>
    )
  }
}
export default chatbot;