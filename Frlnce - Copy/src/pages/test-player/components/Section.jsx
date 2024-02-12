import React, {Component} from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

export default class Section extends Component{
    constructor(props) {
        super(props);
	}
	
	changeSection (section_index) {
		this.props.changeSection(section_index);
	}

    render(){

		return  <div className={`col-md-9 col-sm-9 col-xs-12 test-section ${this.props.testObject?.sections?.length >= 5 ? 'aaaa' : 'bbbbb' }`}>
		          <div className="test-section-subjects">
                  {		  
					this.props.testObject && this.props.testObject.sections.map((section, index) => {
						var answeredLarge =[]; var notAnsweredLarge = []; var markedLarge = [];
						var total_ques = this.props.testObject.sections[index].questions.length;
						this.props.testObject.sections[index].questions.forEach(function(question) {
							if(question.class=='answered-large'){
								answeredLarge.push('answered-large') 
							}else if(question.class=='not-answered-large'){
								notAnsweredLarge.push('not-answered-large') 
							}else if(question.class=='answered-marked-large' || question.class=='marked-large'){
								markedLarge.push('marked-large') 
							}
						});
						total_ques = total_ques- answeredLarge.length-notAnsweredLarge.length-markedLarge.length;
						return (
							<ul>
								<OverlayTrigger placement="bottom" 
								overlay={ 
									<Popover id="popover-basic" className="popover">
										<Popover.Title as="h3">{section.name}</Popover.Title>
										<Popover.Content>
										<table align='center'>
										<tr><td>Answered</td><td><div className='answered-large '>{answeredLarge.length}</div></td>
										</tr><tr><td>Not Answered</td><td><div className='not-answered-large '>{notAnsweredLarge.length}</div></td></tr>
										<tr><td>Marked for Review</td><td><div className='marked-large '>{markedLarge.length}</div></td></tr>
										<tr><td>Not Visited</td><td><div className='not-visited-large '>{total_ques}</div></td></tr>
										</table>
										</Popover.Content>
									</Popover>
									}
								>
								<li onClick={(e) => this.changeSection(index)} className={index==this.props.sectionIndex ? "active" : "" }>{section.name}</li>
								</OverlayTrigger>
							</ul>
						);
					})
	              }
	              </div>	
		        </div>
    }
}