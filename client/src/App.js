import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
class App extends Component {
  constructor(props){
    super(props),
    this.state = {
      setMovieName: '', 
      setReview: ''
    }
  }
  handleChange = (event) =>{
  let nam = event.target.name; 
  let val = event.target.value
  this.setState({
    [nam]: val
})

}
submit = ()=>{
  axios.post('http://localhost:3001/api/insert', this.state)
  .then(()=>{alert('success post')})
  console.log(this.state)
}
  render() {
   
    return (
      <div className='App'>
        <h1 >CRUD Application</h1>
        <div className='form'>
          <label>Movie Name:</label>
          <input name='setMovieName' placeholder='MoveName' onChange={this.handleChange}/>
          <label>Review:</label>
          <input name='setReview' placeholder='Review' onChange={this.handleChange}/>
        </div>

        <button onClick={this.submit}>Submit</button>
      </div>
      

    );
  }
}

export default App;
