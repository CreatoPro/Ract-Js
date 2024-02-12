import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ApiService from "../../_services/ApiService";
import Loader from './../../_components/loader/loader';
import Chart from "chart.js";

class AnalysisReportDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      message: null,
      loading: false,
      result: 0
    };
    this.reloadTestResult = this.reloadTestResult.bind(this);
  }
  chartRef = React.createRef();

  componentDidMount() {
    this.reloadTestResult();
    this.buildChart();
  }

  componentDidUpdate() {
    this.buildChart();
  }

  reloadTestResult() {
    var id = this.props.match.params.id;
    this.setState({ loading: true }, () => {
      ApiService.fetchTestResult(id)
      .then((res) => {
          this.setState({
            loading: false,
            list: res.data.data,
            result : res.data.result
          });
      });
    });	
  }

  routeChange(path) {
    this.props.history.push(path);
  }

  render() {
	let portlet = JSON.parse(localStorage.getItem('portlet'));
    const { loading } = this.state;
	let data = this.state.list;
    if(this.state.result==1){
    return (
      <div className="testlist">
        {
          <Container fluid>
          <div className="learn-header">
          <div className={`module-header-step2 AnalysisReport ${portlet.class ? portlet.class : 'orange-card'}`}>
					<div className="back">
					  <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
					</div>
					<h4>Online Tests Result</h4>
          </div>
          </div>
          <div className="testResult">
               {data.showAnalysisButtons==1 && <button className="resultbtn orange-card" onClick={() => this.routeChange('/test-result-detail/'+this.props.match.params.id)} >Detailed Profiling</button>}
               {/* {data.showAnalysisButtons==1 && <button className="resultbtn orange-card" onClick={() => this.routeChange('/test-result-question-wise/'+this.props.match.params.id)} >Question Wise Analysis</button>} */}
              {data.showAnalysisButtons==1 && <button className={`resultbtn ${portlet.class ? portlet.class : 'orange-card'}`}  onClick={()=> this.props.history.push({pathname: `/test-result/${this.props?.location?.state?.testId}/${this.props?.match?.params?.id}`, state: {showQuestionWiseAnalysis:true}})} >Question Wise Analysis</button>}
          </div>
          <div className="testResult">
              <div className="card_list">
                <h4>Your Performance in Test</h4>
                <div className="testgraph">
                  <canvas id="myChart" ref={this.chartRef} height="230vh"/>
                </div>
              </div>
          </div>

          {loading ?  <Loader />: this.renderCard()}           
          </Container>
        }
      </div>
    );
    }else{
      let msg = <h4>No Result Found</h4>;
      return (
        <div className="testlist">
          {
            <Container fluid>
            <div className={`module-header-step2 AnalysisReport ${portlet.class ? portlet.class : 'orange-card'}`}>
            <div className="AnalysisReport">
            <div className="back">
              <FontAwesomeIcon icon={ faArrowLeft } onClick={this.props.history.goBack} />
            </div>
            <h4>Online Tests Result</h4>
            </div>
            </div>
              <div className="testResult">
                {loading ?  <Loader />: msg}
              </div>
              <div className="testgraph" style={{display: "none"}}>
                  <canvas id="myChart" ref={this.chartRef} />
              </div>
            </Container>
          }
        </div>
      );
    }
  }

  renderCard() {
    let data = this.state.list;
    if(typeof(data) !== 'undefined' || data != null){
      return  <div className="testResult">
              <div className="card_list">
                <h4>Your Performance in Test</h4>
                <table>
                  <tr className="blue-card">
                    <th>Sec</th>
                    <th>Marks</th>
                    <th>Max</th>
                    <th>%</th>
                    <th>CH</th>
                    <th>CA</th>
                  </tr>
      {
        data.testTableData && data.testTableData.sort((a, b) => a.sortOrder - b.sortOrder)
            .map((item, index) => {
            if(item.sortOrder==100){ item.sectionName = "Test Total";  }
            return ( 
              <tr key={index}>
                <td><b>{item.sectionName}</b></td>
                <td>{item.marks}</td>
                <td>{item.totalMarks}</td>
                <td>{item.percentage}</td>
                <td>{item.testHighestPercentage}</td>
                <td>{item.testAveragePercentage}</td>
              </tr>
            )
          })
      }
      </table>
      </div><br />
      {this.renderLegends()} 
      </div>
    }
  }

  renderLegends() {
    return (
      <div className="card_list">
      <h4>Legends</h4>
      <table>  
      <tr>
        <td><b>Sec</b></td>
        <td>Section</td>        
      </tr>
      <tr>
        <td><b>Max</b></td>
        <td>Maximum Marks</td>        
      </tr>
      <tr>
        <td><b>%</b></td>
        <td>Percentage</td>        
      </tr>
      <tr>
        <td><b>CH</b></td>

        <td>Course Highest</td>        
      </tr>
      <tr>
        <td><b>CA</b></td>
        <td>Course Average</td>        
      </tr>
      </table> 
      </div>
    )
  }

  buildChart = () => {
    let t1 = {};
    t1.label = 'Marks';
    t1.data = [];
    t1.backgroundColor = [];
    t1.borderColor = [];
    t1.borderWidth = 1;

    let t2 = {};
    t2.label = 'Topper';
    t2.data = [];
    t2.backgroundColor = [];
    t2.borderColor = [];
    t2.borderWidth = 1;

    let t3 = {};
    t3.label = 'Total';
    t3.data = [];
    t3.backgroundColor = [];
    t3.borderColor = [];
    t3.borderWidth = 1;
    let labels = [];
    let barChartData = {};
    let data = this.state.list;
    if(typeof(data) !== 'undefined' || data != null){
      data.barGraphData && data.barGraphData.map((item, index) => {
		          if(index==0){ item.name = "Test"; }
                  labels.push(item.name);

                  t1.data.push(item.marks);
                  t1.backgroundColor.push('rgba(0, 128 ,0, 0.8)');
                  t1.borderColor.push('rgba(0, 128 ,0, 1)');

                  t2.data.push(item.toppermarks);
                  t2.backgroundColor.push('rgba(255, 0, 0, 0.8)');
                  t2.borderColor.push('rgba(255, 0, 0, 1)');

                  t3.data.push(item.totalmarks);
                  t3.backgroundColor.push('rgba(31, 119, 180, 0.8)');
                  t3.borderColor.push('rgba(31, 119, 180, 1)');
      });

      barChartData = {
          labels: labels,
          datasets: [t1,t2,t3]
      }


    const myChartRef = this.chartRef.current.getContext("2d"); 
	myChartRef.height = 700; 
    new Chart(myChartRef, {
        type: "bar",
        data:  barChartData,
        options: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              fontColor: "#000080",
            }
          },
          responsive: true,
          maintainAspectRatio: true
        }
    });
   }
  }

}

export default AnalysisReportDetails;
