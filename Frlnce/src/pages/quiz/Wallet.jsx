import React, { Component } from "react";
import {Container, Card, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../_services/ApiService";
import {ILoader} from './../../_components/iloader/iloader';
import Config from './../../_config/config'

class Wallet extends Component {
  constructor(props) {    
    super(props);
    console.log("Wallet -> constructor()... ");
    console.log("Wallet -> constructor(); Portlet : "+JSON.stringify(Config.CURRENT_PORTLET));
    if(!Config.CURRENT_PORTLET) {
      Config.CURRENT_PORTLET = JSON.parse(localStorage.getItem('portlet'));
    }
    this.state = {
      enquiryId : localStorage.getItem('enquiryId')+"",
      message: null,
      showLoading: true,
      wallet: null,
      transactions: []
    };
    //this.init = this.init.bind(this);
  }

  componentDidMount() {
    console.log("Wallet -> componentDidMount()... ");
    this.init();
  }

  init() {
    console.log("Wallet -> init()... ");    
    ApiService.getWalletTransactions(0)
    .then((res) => {
      let respData = res.data;
      console.log("Wallet -> init(); res : "+JSON.stringify(respData));
      this.setState({
        showLoading: false,
        wallet: respData,
        transactions: respData.transactions
      });
    },
    error => { //ErrorCB
      console.log("Wallet -> init() -> Connection Error : "+Config.CONNECTION_ERROR);
      this.setState({
        showLoading: false
      });
    });
  }
  
  render() {
    const _loadingText = 'Please wait...';
    return (
      <>
        <div className="ilearn-full-height page-quiz-zone">
          <Container fluid>
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderLoader()}          
          </Container>
        </div>
      </>
    );
  }

  renderHeader() {
    console.log("Wallet -> renderHeader()... ");
    return (
      <div className={`ilearn-plain-header ${Config.CURRENT_PORTLET.class}`}>
        <div className="back">
          <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
        </div>
        <h4>Wallet</h4>
      </div>
    );
  }

  renderBody() {
    console.log("Wallet -> renderBody()... ");
    let _wallet = this.state.wallet;
    let _transactions = this.state.transactions
    return (
        <>
            <div className="ilearn-padding-top">
            <Card className="mx-auto" style={{ maxWidth: '75rem' }}>
                <Card.Body>
                    <Card className="ilearn-blue-btn">
                        <Card.Body>
                            <h4 style={{color:'#fff'}}>Wallet</h4>
                            <Card.Text className="text-center">
                            <span style={{color:'#fff', fontSize:'32px'}}>
                                <b>{(_wallet && _wallet.balance)?_wallet.balance:0}</b> &nbsp; 
                                <img class="wallet-coin" src="./assets/imgs/coins-64.png"/>            
                            </span>     
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card.Title>Recent</Card.Title>
                    <ul className="list-group">
                    {
                      _transactions.map((transaction, index) => {
                        return ( 
                        <li key={index} className="list-group-item wallet-item" >
                            <div className="ilearn-item-block ">
                                <div className={`${transaction.transactionType === 'C'? 'circle-plus' : 'circle-minus'}`}/>
                                <div className="ilearn-item-inner">
                                <h4>{transaction.name}</h4>
                                <p className="wallet-transaction-remarks"> {transaction.date} </p>
                                </div>
                                <div className="wallet-transaction-coins">{transaction.coins}</div>
                            </div>
                        </li>
                        );
                      })
                    }
                    </ul>
                </Card.Body>    
            </Card>
            </div>
        </>
    )
  }

  renderLoader() {
    console.log("Wallet -> renderLoader()... ");
    const _loadingText = 'Please wait...';
    return (
        <ILoader
          loadingText={_loadingText}
          isShow={this.state.showLoading}
        >
        </ILoader>
    )
  }

}

export {Wallet};
