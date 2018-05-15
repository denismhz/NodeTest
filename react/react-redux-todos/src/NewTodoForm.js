import React, {Component} from "react";

export default class NewTodoForm extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      task: ""
    };
  }

  handleSubmit(e){
    e.preventDefault();
    if(this.state.task === ""){
      alert("no task")
      return;
    }
    this.props.handleSubmit(this.state.task);
    this.setState({...this.state, task:""});
    e.target.reset();
    this.props.history.push("/todo");
  }

  handleChange(e){
    this.setState({[e.target.name]:e.target.value});
  }


  render(){
    return(
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <label htmlFor="task">Task: </label>
          <input type="text" name="task" id ="task"/>
          <button>Add Todo!</button>
        </form>
    )
  }
}
