import React, {Component} from 'react';
import ApiService from "../../../_services/ApiService";
import Loader from './../../../_components/loader/loader';
import "./Notes.css";

export default class Notes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: null,
            loading: false,
        };
        this.fetchNotes = this.fetchNotes.bind(this);
    }

    componentDidMount() {
        this.fetchNotes()
    }

    fetchNotes() {
        this.setState({ loading: true }, () => {
          ApiService.fetchStudyResourcesNotes(this.props.id)
          .then((res) => {
              console.log(res.data);
              this.setState({
                loading: false,
                groups : res.data.groups
              });
          });
        });	
    }    

    render(){

        const groups = this.state.groups; 

        return (
            <div>
                {groups && 
                    <div className="learningNotes">
                        <table>
                            {/* <thead className="headings">
                                <th className="groups">Group</th>
                                <th className="steps">Steps</th>
                                <th className="resource">Learning Material</th>
                                <th className="notes">Notes</th>
                            </thead> */}
                            <tbody>
                                {this.renderTableBody(groups)}
                            </tbody>
                        </table>
                    </div>
                
                }
            </div>
        )
    } 


     renderTableBody (groups) {
       
       return groups.map(group => {
           let stepName = ''; 
           let resources = [];
           let notes = [];
           {group.steps.map(step => {
                stepName = step.name;
                {step.resources.map(resource => {
                    notes.push(
                        <table className="notesTable">
                            <tr className="resources3" key={resource.id}>
                                <td className="resources1" >{resource.name}</td>
                                <td className="notes1"><div dangerouslySetInnerHTML={{__html: resource.note}} /></td>
                            </tr>
                        </table>
                    )
                })}
            })}

           return(
               <>
               <tr>
                   <td style={{background: group.color}} colspan="3" className="groups1 group-name">{group.name}</td>
               </tr>
               <tr key={group.id}>
                   <td className="groups1">{stepName}</td>
                   <td className="groups2" colspan="2">{notes}</td>
               </tr>
               </>
           )
    })}
}

