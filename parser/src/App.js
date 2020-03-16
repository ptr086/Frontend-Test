import React, { Component } from 'react';
import './App.css';
import { evaluate } from 'mathjs';

class App extends Component {
	constructor(props){
		super(props);
		this.state = { output: '', pastedSign: ''};
		this.calculations = [];
	}
	calculateResult = (ev) => {
		let code = null;
		try{
			code = evaluate(ev);
			console.log(code);
			if(typeof code != "number" || code=== Infinity) code = 'Expression not valid.';
		}
		catch(err){
			code = 'Expression not valid.';
		}
		this.setState({output: code, pastedSign: this.state.pastedSign});
		return code;
	}
	handleKeyUp = (event) => {
		this.calculateResult(event.target.value);
	}
	handleChange = (event) => {
		 this.setState({pastedSign: event.target.value});
	}
	handleClick = (event) => {
		if(event.target.innerHTML==="="){
			if(this.state.pastedSign!==""){
				let calculated = this.calculateResult(this.state.pastedSign);
				this.calculations.unshift(this.state.pastedSign+" = "+calculated);
				if(this.calculations.length>5) this.calculations.pop();
			}
			this.setState({ pastedSign: '' });
		}
		else this.setState({ pastedSign: this.state.pastedSign + event.target.innerHTML });
	}
	handleSubmit = (event) => {
		event.preventDefault();
	}
	createCalc = () => {
		let calc = [], numbers = [], operators = [];
		let ops = ["+","-","*","/","="];
		for(let i = 0; i < 10; i++){
			numbers.push(<div className="btn btn-primary mr-2 mb-2" onClick={this.handleClick}>{i}</div>);
		}
		for(let i = 0; i < ops.length; i++){
			operators.push(<div className="btn btn-primary mr-2 mb-2" onClick={this.handleClick}>{ops[i]}</div>);
		}
		calc.push(numbers);
		calc.push(operators);
		return calc;
	}
	createCalculations = () => {
		return this.calculations.map((calculation) => <li>{calculation}</li>);;
	}
	render() {
		let showCalculations;
		if(this.calculations.length>0){
			showCalculations = <div className="showCalculations" ><p className="resultHeader mx-auto">Last calculations: </p>
			<ul className="calculcations mx-auto w-50">
				{this.createCalculations()}		
			</ul>
			</div>
		}
		else{
			showCalculations = "";
		}
		return (
		   <div className="App container">
				<form className="form-inline mx-auto w-50 my-4" onSubmit={this.handleSubmit}>	
					<label htmlFor="putText" className="mr-sm-2 mr-2">Type an expression to validate: </label>
					<input type="text" className="form-control" name="putText" onKeyUp={this.handleKeyUp} value={this.state.pastedSign} onChange={this.handleChange}/>
				</form>
				<div className="calc">	
					{this.createCalc()}
				</div>
				<p className="resultHeader mx-auto">Result: </p>	
				<div id="output" className="p-5 mt-2 my-3">
					{this.state.output}
				</div>
				{showCalculations}
			</div>
		);
	}
}




export default App;
