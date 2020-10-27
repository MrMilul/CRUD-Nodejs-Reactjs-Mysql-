import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Table, Button, Container } from 'react-bootstrap'

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
            <React.Fragment>
              <tr>
                <td>{val.id}</td>
                <td>{val.movie_name}</td>
                <td>{val.movie_review}</td>
              </tr>
            </React.Fragment>
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
        <Button className='my-2' variant="primary" onClick={this.submit}>Submit</Button> <br/><br/>

        <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Movie Name</th>
              <th>Movie Review</th>
            </tr>
          </thead>
          <tbody>
            {table}
          </tbody>
       </Table>
       </Container>
         
        
      </div>
      

    );
  }
}

export default App;
