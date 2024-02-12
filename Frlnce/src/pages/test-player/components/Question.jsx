import React, {Component} from 'react';
import {QUESTION_TYPES} from "./Types"

export default class Question extends Component{
    constructor(props) {
        super(props);
	}
    
    render(){
		let question = this.props.question;
        let opt =[];
		let list_choices = []; let list_matches = [];
		let aplpha =  ['A','B','C','D','E','F','G','H'];
		let aplpha2 = ['P','Q','R','S','T','U','V','W'];
		if(question.questionCategory == QUESTION_TYPES[5].value){
			question.choices.map((option,index) => 
				list_choices.push(<tr key={index}>
						<td className="choiceString"><p>{option.choiceString}. </p></td>
						<td><div dangerouslySetInnerHTML={{ __html:option.name}} /></td>
						</tr>
						)
			)

			question.matches.map((option,index) => 
				list_matches.push(<tr key={index}>
									<td className="choiceString"><p>{option.choiceString}.</p></td>
									<td><div dangerouslySetInnerHTML={{ __html:option.name}} /></td>
									</tr>
								)
			)

			opt.push(
				<div className="mtf_statement">
					<table className="mtf_statement_table">
					<tr className="mtf_statement_head">
						<td colspan="2">
								<tr align="center"><td colspan="2"><b>Column I</b></td></tr>
								{list_choices}
						</td>
						<td colspan="2">
								<tr align="center"><td colspan="2"><b>Column II</b></td></tr>
								{list_matches}
						</td>
					</tr>
					</table>
				</div>
			)
			
		}else{
			question.choices.map((option,i) => 
			opt.push(<li key={i}>
					<div className="optionsro">( {option.choiceString} )</div>
					<div><p dangerouslySetInnerHTML={{ __html:option.name}}></p></div>
				</li>)
			)
		}

		return(
			<div className="test-player">
				<div className="qstatement_div">
					<div>
						<div id="qstatement">
						<p dangerouslySetInnerHTML={{ __html:question.statement}}></p>
						</div>
						<ul className="options">
							{opt}
						</ul>
					</div>
				</div>
			</div>
		);
    }
}