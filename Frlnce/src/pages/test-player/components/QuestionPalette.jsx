import React, {Component} from 'react';

export default class QuestionPalette extends Component{
    constructor(props) {
        super(props);
	}
	
	showQuestion (e,section_index,question_index) {
		e.preventDefault();
		this.props.showQuestion(section_index,question_index);
	}

    render(){

        // answered-large   not-answered-large   answered-marked-large  marked-large  not-visited-large section_div
        return(
			<div className="question_palette_no_div">
				<div className="col-12">
					{this.props.testObject && this.props.testObject.sections.map((section,section_index) =>
						<div className={this.props.showSection==section_index ? "section_div show" : "section_div"} >
							<div className="section-info">
								You are viewing <b>{section.name}</b> section.
								<div className="pt10">Question Palette:</div>
							</div>
							{
								section.questions.map((question,question_index) =>
									<div className="question_palette_no" onClick={(e) => this.showQuestion(e,section_index,question_index)}>
										<div className={
											question.class ? question.class 
											: this.props.curentQuestion==question_index ? "not-answered-large" 
											: "not-visited-large"
											}
										>
											{question.questionNumber}
										</div>
									</div>
								)
							}
						</div>                                
					)} 
				</div>
			</div>
          );
    }
}