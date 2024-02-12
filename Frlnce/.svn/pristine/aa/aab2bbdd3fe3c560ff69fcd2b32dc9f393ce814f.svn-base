import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Config from '../../_config/config'

const style = {
    color: 'red',
    margin: '10px'
  }
  
class Header extends Component {
 
 componentDidMount(){
	if(localStorage.getItem('siteTitle')){
      document.title = localStorage.getItem('siteTitle')
	}else{
	  document.title = Config.siteTitle
	}
	
 }
 
  render() {
    return (
	  <header></header>
    )
  }
  
}

export default Header