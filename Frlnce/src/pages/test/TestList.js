import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import test_icon from "./images/test.png";
import test_list_icon from "./images/test-list.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card'
import ApiService from "../../_services/ApiService";
import Loader from './../../_components/loader/loader';
import UserService from '../../_services/UserService';
import Config from '../../_config/config';
import './testList.styles.css';

class TestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      message: null,
      loading: false
    };
    this.reloadTestList = this.reloadTestList.bind(this);
  }

  componentDidMount() {
    let paramsString = this.props.location.search;
    const params = new URLSearchParams(paramsString);
    let enquiryId =  params.get('enquiryId');
    if(enquiryId){
      localStorage.setItem('enquiryId', enquiryId);
    }
    this.reloadTestList(this.props?.location?.state?.portlet?.targeturl);
  }

  reloadTestList(url) {
    //var testlist = JSON.parse(localStorage.getItem('testlist')) || [];
    /*if(testlist.length > 0){
      this.setState({
        loading: false,
        list: testlist
      }); 
    }else{*/

    if(url){
      console.log(url);
      url = url.replace('{enquiryId}',UserService.getEnquiryId);
    }

      this.setState({ loading: true }, () => {
        ApiService.fetchTestList(url)
        .then((res) => {
            this.setState({
              loading: false,
              list: res.data
            });
            localStorage.setItem('testlist', JSON.stringify(res.data));
        });
      });	
    /*}*/
  }

  routeChange(path,test_parentcat_id) {
    localStorage.setItem('test_parentcat_id',test_parentcat_id);
    this.props.history.push(path);
  }

  downloadSolution(){
    let token = UserService.getToken();
    // https://unacademy.edusquares.com/unacademy/popup/studentTestResult.do?reqCode=generateStudentDosier&token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNDciLCJqdGkiOiIxNDciLCJpYXQiOjE2MTM5OTY0NzAsInVzZXJuYW1lIjoiMjIxMDAwNzAwIiwiZW5xdWlyeUlkIjoxNDEsInJvbGVzIjpbIlN0YW5kYXJkU3R1ZGVudCJdLCJ0ZW5hbnQiOiJ1bmFjYWRlbXkifQ.w4DRLK_1HwSfxQy_LU5lCLZ-UR6vGsZKVaD3C4lAsYg
    window.open(`${Config.siteUrl}${Config.siteTitle}/popup/studentTestResult.do?reqCode=generateStudentDosier&token=${token}`);

  }

  render() {
	let portlet = JSON.parse(localStorage.getItem('portlet')) || [];
    const { loading } = this.state;
    return (
      <div className="TestList">
        {
          <Container fluid>
              <div className="module-header">
                <div className={`module-header-inner ${portlet.class ? portlet.class : 'orange-card'}`}>
                <div className="back">
                  <FontAwesomeIcon icon={ faArrowLeft } onClick={() => this.routeChange('/')} />
                </div>
                  <img src={test_icon} alt="test icon" /> 
                </div>
                <div className="arrow-set test-listing-arrow-set">
                  <h4>Online Tests</h4>
                  <span className="view-solution test-listing-download-solution" onClick={this.downloadSolution}>My dossier </span>
                </div>
              </div>
              {loading ?  <Loader />: this.renderCard()}           
          </Container>
        }
      </div>
    );
  }

  renderCard() {
	  let data = this.state.list;
		return  <div className="card_list"> 
		{
			  data.map((item, index) => {
					return ( 
					  <div>
            { 
              data[index].categoryBased===true ?
                data[index].categoryBeans.map((c, i) =>
                  <Card onClick={() => this.routeChange('/TestList/' + c.id, data[index].id)}>
                    <Card.Body>
                      <div className="cardbody">
                        <img src={test_list_icon} alt={c.name} />
                        <h4 className="head">{c.name}</h4>
                        <FontAwesomeIcon icon={ faArrowRight }  />
                      </div>
                    </Card.Body>
                  </Card>
                )
              :
                <Card onClick={() => this.routeChange('/TestList/' + data[index].id,0)}>
                  <Card.Body>
                    <div className="cardbody">
                      <img src={test_list_icon} alt={data[index].name} />
                      <h4 className="head">{data[index].name}</h4>
                      <FontAwesomeIcon icon={ faArrowRight }  />
                    </div>
                  </Card.Body>
                </Card>
            }
					   </div>
					)
			  })
    }
    </div>
  }
}

export default TestList;
