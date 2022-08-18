
const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

const app = express();

let topMovies = [
  {
    title: 'The Shawshank Redemption',
    story:'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    director: 'Frank Darabont',
    stars: 'Tim Robbins-Morgan Freeman-Bob Gunton'

  },
  {
    title: 'Al-arraab',
    story:'The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.',
    director: 'Francis Ford Coppola',
    stars: 'Marlon Brando - Al Pacino -James Caan'

  },
  {
    title: 'The Dark Knight',
    story:'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    director: 'Christopher Nolan',
    stars: 'christian Bale - Heath Ledger - Aaron Eckhart'

  },
  {
    title: 'The Matrix',
    story:'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
    director: 'Lana Wachowski - Lilly Wachowski',
    stars: 'Keanu Reeves - Laurence Fishburne - Carrie-Anne Moss'

  },
  {
    title: ' Gladiator',
    story:'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
    director: 'Ridley Scott',
    stars: 'Russell Crowe -Joaquin Phoenix - Connie Nielsen'


  },
  {
    title: 'Casablanca',
    story:'A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.',
    director: 'Michael Curtiz',
    stars: 'Humphrey Bogart - Ingrid Bergman - Paul Henreid'

  },
  {
    title: 'Braveheart',
    story:'Scottish warrior William Wallace leads his countrymen in a rebellion to free his homeland from the tyranny of King Edward I of England.',
    director: 'Mel Gibson',
    stars: 'Mel Gibson - Sophie Marceau - Patrick McGoohan'

  },
  {
    title: 'Casino',
    story:'A tale of greed, deception, money, power, and murder occur between two best friends: a mafia enforcer and a casino executive compete against each other over a gambling empire, and over a fast-living and fast-loving socialite.',
    director: 'Martin Scorsese',
    stars: 'Robert De Niro - Sharon Stone - Joe Pesci'

  },
  {
    title: 'Jurassic Park',
    story:"A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose",
    director: 'Steven Spielberg',
    stars: 'Sam Neill -Laura Dern - Jeff Goldblum'

  },
  {
    title: 'Chinatown',
    story:'A private detective hired to expose an adulterer in 1930s Los Angeles finds himself caught up in a web of deceit, corruption, and murder.',
    director: 'Roman Polanski',
    stars: 'Jack Nicholson - Faye Dunaway - John Huston'

  },
  {
    title: 'The Terminator',
    story:"A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine, sent from the same year, which has been programmed to execute a young woman whose unborn son is the key to humanity's future salvation.",
    director: 'James Cameron',
    stars: 'Arnold Schwarzenegger - Linda Hamilton - Michael Biehn'

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

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use(morgan('combined')); // setup the logger, Mildware function to the terminal

app.use(express.static('public')); // Automatically routes all requests for static files to their corresponding files within a certain folder on the server.

app.use(bodyParser.json()); // support parsing of application/json type post data
app.use(bodyParser.urlencoded({ extended: true })); //support parsing of application/x-www-form-urlencoded post data

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
