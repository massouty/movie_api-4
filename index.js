
const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');
const { rest } = require('lodash');


const app = express();

app.use(bodyParser.json()); // support parsing of application/json type post data

const users = [
  {
    "id":1,
    "name":"kim",
    "password":"frank45",
    "favoriteMovie":"The Dark Knight"
  },
  {
    "id":2,
    "name":"lee",
    "password":"lewis45",
    "favoriteMovie":""
  }

];

let movies = [
  {
    "title": 'The Shawshank Redemption',
    "genre": {
      "name": 'drama'
    },
    "story":'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    "director": {
      "name":"Frank Darabont"
    },
    "stars": {
      "name":'Tim Robbins'
    },

  },
  {
    "title": 'Al-arraab',
   "genre": {
      "name": 'action'
    },
  
    "story":'The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.',
    "director": {
      "name":'Francis Ford Coppola'
    },
    "stars": {
    "name" : 'Marlon Brando' 
    },

  },
  {
    "title": 'The Dark Knight',
   "genre": {
      "name": 'drama'
    },
    "story":'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    "director": {
      "name":'Christopher Nolan'
    },
    "stars": {
      "name":'christian Bale'
    },

  },
  {
    "title": 'The Matrix',
    "genre": {
      "name": 'action'
    },
    "story":'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
    "director": { 
      "name":'Lana  Wachowski'
    },
    "stars": {"name":'Keanu Reeves'},

  },
  {
    "title": ' Gladiator',
    "genre": {
      "name": 'action'
    },
    "story":'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
    "director": { "name":'Ridley Scott'
  },
    "stars": {"name":'Russell Crowe'},


  },
  {
    "title": 'Casablanca',
  "genre": {
      "name": 'drama'
    },
   "story":'A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.',
    "director": { "name":'Michael Curtiz'},
    "stars": {"name": 'Humphrey Bogart' },
  },
  {
    "title": 'Braveheart',
   "genre": {
      "name": 'action'
    },
    "story":'Scottish warrior William Wallace leads his countrymen in a rebellion to free his homeland from the tyranny of King Edward I of England.',
    "director": { "name":'Mel Gibson'},
    "stars": {"name":'Mel Gibson'},
  },

];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my website for movies!');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/index', (req, res) => {                  
  res.sendFile('public/index.html', { root: __dirname });
});
//get all movies

app.get('/movies', (req, res) => {
  res.json(movies);
});
//get movies/:title
app.get('/movies/:title',(req,res)=>{res.json(movies.find((movie)=>{return movie.title === req.params.title}));
});

//get movies/director/:directorName
app.get('/movies/director/:directorName',(req,res)=>{const {directorName} = req.params;
const director = movies.find(movie => movie.director.name === directorName);
if(director){res.status(200).json(director);}else{res.status(400).send('no such director');}
});

//get movies/genre/:genreName
app.get('/movies/genre/:genreName',(req,res)=>{const {genreName} = req.params;
const genre = movies.find(movie => movie.genre.name === genreName);
if(genre){res.status(200).json(genre);}else{res.status(400).send('no such genre');}
});

// get  movies/stars/:starsName
app.get('/movies/stars/:starsName',(req,res)=>{const {starsName} = req.params;
const stars = movies.find(movie => movie.stars.name === starsName).stars;
if(stars){res.status(200).json(stars);}else{res.status(400).send('no such genre');}
});

// Adds data for a new movie to our list of movies.
app.post('/movies', (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = 'Missing movie title in request body';
    res.status(400).send(message);
  } else {
    movies.push(newMovie);
    res.status(201).send(newMovie);
  }
});
// delete one movie by its title
app.delete('/movies/:title', (req, res) => {
  let movie = movies.find ((movie) => { return movie.title === req.params.title });

  if (movie) {
    movies = movies.filter((obj) => { return obj.title !== req.params.title });
    res.status(201).send('Movie :' + req.params.title + ' was deleted.');
  }
});
//get all users

app.get('/users', (req, res) => {
  res.json(users);
});

// create newUser
app.post('/users' , (req,res)=> {const newUser = req.body;
if(newUser.name){
  newUser.id = uuid.v4();
users.push(newUser);
res.status(201).json(newUser)}else{res.status(400).send('user needs name')}
});

//get users/:id
app.get('/users/:id',(req,res)=>{const {id} = req.params;
let user = users.find(user => user.id == id);
if(user){res.status(200).send(user);}
else{res.status(400).send('no such user');}
});


//get  users/:favoriteMovie
app.get('/users/:favoriteMovie',(req,res)=>{const {favoriteMovie} = req.params;
const user = users.find(user => user.favoriteMovie === favoriteMovie).user;
if(user){res.status(200).json(user);}else{res.status(400).send('no such user');}
});


//update user
app.put('/users/:id', (req,res)=> {const{id}= req.params;
const updateUser = req.body;
let user = users.find(user => user.id == id);
if(user){user.name = updateUser.name;
rest.status(200).json(user);}else{res.status(400).send('no such user')}
});

//create  favoriteMovie
app.post('/users/:id/:movieTitle', (req,res)=>{const{id,movieTitle}= req.params;
let user = users.find(user => user.id == id);
if(user){user.favoriteMovie.push(movieTitle);
res.status(200).send('${movieName} has been added to user')}
});

// delete user by id

app.delete('/users/:id',(req,res)=> {const{id} = req.params;
let user = users.find(user => user.id != id);res.status(200).send('user ${id} has been deleted');
if (user) {
    users = users.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).send('user :' + req.params.id + ' was deleted.');
  }
});

// delet user by email

app.delete('/users/:email',(req,res)=> {const{email} = req.params;
let user = users.find(user => user.email != email);res.status(200).send('user ${email} has been deleted');
if (user) {
    users = users.filter((obj) => { return obj.email !== req.params.email});
    res.status(201).send('user :' + req.params.id + ' was deleted.');
  }

});



app.use(morgan('combined')); // setup the logger, Mildware function to the terminal

app.use(express.static('public')); // Automatically routes all requests for static files to their corresponding files within a certain folder on the server.


app.use(bodyParser.urlencoded({ extended: true })); //support parsing of application/x-www-form-urlencoded post data

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
