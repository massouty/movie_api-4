
const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');


const app = express();

const users = [
  {  id: 1,
    name: 'Yousef Almassouty',
    userName: 'massouty22',
    password:'666666666',
    email:'massouty@outlook.com',
    favoriteMovie :'gone with the wind'
},
 {  id: 2 ,
  name :"Mona Aladeeb",
    userName: 'mona22',
    password:'de555',
    email:'mona1970@outlook.com',
    favoriteMovie :'peace and war'
  }
]

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
const genre = movies.find(movie => movie.genre.name === genreName).genre;
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

//get users/:id
app.get('/users/:id',(req,res)=>{res.json(users.find((user)=>{return user.id === req.params.id}));
});
// get  users/:userName
app.get('/users/:userName',(req,res)=>{const {userName} = req.params;
const users = users.find(user => user.username === userName).user;
if(user){res.status(200).json(user);}else{res.status(400).send('no such user');}
});
//get  users/:name
app.get('/users/:name',(req,res)=>{const {name} = req.params;
const users = users.find(user => user.name === name).user;
if(user){res.status(200).json(user);}else{res.status(400).send('no such user');}
});

//get  users/:favoriteMovie
app.get('/users/:favoriteMovie',(req,res)=>{const {favoriteMovie} = req.params;
const users = users.find(user => user.favoriteMovie === favoriteMovie).user;
if(user){res.status(200).json(user);}else{res.status(400).send('no such user');}
});

app.use(morgan('combined')); // setup the logger, Mildware function to the terminal

app.use(express.static('public')); // Automatically routes all requests for static files to their corresponding files within a certain folder on the server.

app.use(bodyParser.json()); // support parsing of application/json type post data
app.use(bodyParser.urlencoded({ extended: true })); //support parsing of application/x-www-form-urlencoded post data

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
