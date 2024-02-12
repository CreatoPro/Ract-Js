import React from "react";
import Card from "react-bootstrap/Card";
import ApiService from "../../../_services/ApiService";
import './notes-mobile.styles.css';

class NotesMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // loading: false,
      groups: [],
    };
  }

  componentDidMount() {
    this.fetchNotes();
  }

  fetchNotes = () => {
    this.setState({ loading: true }, () => {
      ApiService.fetchStudyResourcesNotes(this.props.id).then((res) => {
        console.log(res.data);
        this.setState({
          // loading: false,
          groups: res.data.groups,
        });
      });
    });
  };

  render() {
    return (
      <div>
        {this.state.groups.map((group) =>
          group.steps.map((step) =>
            step.resources.map((resource, index) => (
              <Card key={index} id="notes-card">
                <Card.Body>
                  <h4 id="notes-heading">{group.name}</h4>
                  <h5 style={{color:group.color}}>{step.name}</h5>
                  <h6>{resource.name}</h6>
                  <div dangerouslySetInnerHTML={{__html: resource.note}} />
                </Card.Body>
              </Card>
            ))
          )
        )}
      </div>
    );
  }
}

export default NotesMobile;
