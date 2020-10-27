import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Table, Button, Container ,Card, Row } from 'react-bootstrap'

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
    let card = this.state.fetchData.map((val, key)=>{
      return (
            <React.Fragment>
             <Card style={{ width: '18rem' }} className='m-2'>
              <Card.Body>
                 <Card.Title>{val.movie_name}</Card.Title>
                <Card.Text>
                 {val.movie_review}
                </Card.Text>
                <Button className='m-2'>Edit</Button>
                <Button>Delete</Button>
              </Card.Body>
            </Card>
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
          <Row>
           {card}
          </Row>
        </Container>
                
        
      </div>
      

    );
  }
}

export default App;
