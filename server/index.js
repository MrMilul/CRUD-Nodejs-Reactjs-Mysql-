const express = require('express'); 
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'password', 
    database: 'film_review'
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/get', (req, res)=>{
  
  const SelectQuery = " SELECT * FROM  movie_review" ;

  db.query(SelectQuery, (err, result)=>{
    res.send(result)
  })
})

app.post("/api/insert", (req, res)=>{

    const movieName = req.body.setMovieName;
    const movieReview = req.body.setReview;
  
    const InsertQuery = "INSERT INTO movie_review (movie_name, movie_review) VALUES (?, ?)";

    db.query(InsertQuery,[movieName,movieReview],(err, result)=>{
      console.log(result)
    })
   
})

app.delete("/api/delete/:movieId", (req, res)=>{

  const movieId = req.params.movieId;

  const DeleteQuery = "DELETE FROM movie_review WHERE id = ?";

  db.query(DeleteQuery, movieId, (err, result) => {
    if(err) console.log(err);
  })
})

app.put("/api/update/:movieId", (req, res)=>{

  const movieReview = req.body.reviewUpdate;
  const movieId = req.params.movieId;
  const UpdateQuery = "UPDATE movie_review SET  movie_review = ? WHERE id = ?";

  db.query(UpdateQuery, [movieReview, movieId], (err, result)=>{
    if(err) console.log(err)
  })
})

app.listen('3001', ()=>{})