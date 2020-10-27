import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
class App extends Component {
  constructor(props){
    super(props),
    this.state = {
      setMovieName: '', 
      setReview: '', 
      fetchData:[], 
    }
  }
  handleChange = (event) =>{
  let nam = event.target.name; 
  let val = event.target.value
  this.setState({
    [nam]: val
})
}
componentDidMount(){
  axios.get("http://localhost:3001/api/get")
  .then((response)=>{
    this.setState({
      fetchData: response.data
    })
  })
}
submit = ()=>{
  axios.post('http://localhost:3001/api/insert', this.state)
  .then(()=>{alert('success post')})
  console.log(this.state)
}
  render() {
    let table = this.state.fetchData.map((val, key)=>{
      return (
        <table>
          <tr>
            <td key={val.id}>{val.movie_name}</td>
            <td >{val.movie_review}</td>
          </tr>
        </table>
      )
    })
    return (
      <div className='App'>
        <h1 >CRUD Application</h1>
        <div className='form'>
          <label>Movie Name:</label>
          <input name='setMovieName' placeholder='MoveName' onChange={this.handleChange}/>
          <label>Review:</label>
          <input name='setReview' placeholder='Review' onChange={this.handleChange}/>
        </div>
        <button onClick={this.submit}>Submit</button> <br/><br/>

          {table}
        
      </div>
      

    );
  }
}

export default App;
