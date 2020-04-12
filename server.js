const express = require('express');
const cors = require('cors');
const app = express();
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'ashleycheung',
    password : '',
    database : 'smart-brain'
  }
});

app.use(express.json());
app.use(cors());

const database =  {
	user:[
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'banana',
			entries: 0,
			joined: new Date()
		}
	]
}

app.get('/', (req, res) => {
	res.json(database.user);
})

app.post('/signin', (req, res) => {
	if(req.body.email === database.user[0].email &&
		req.body.password === database.user[0].password) {
	  res.json(database.user[0]);
	} else {
	  res.status(404).json('error logging in');
	}	
})

app.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  db('users')
    .returning('*')
    .insert({
	  email: email,
	  name: name,
	  joined: new Date()
  	})
    .then(user => {
	  res.json(user[0]);  	
    })
    .catch(err => res.status(404).json('unable to register'))	
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	db.select('*').from('users').where({
		id: id})
	  .then(user => {
	  	if(user.length) {
	  		res.json(user[0])	
	  	} else {
	  		res.status(400).json('not found')
	  	}		
	  })	
	  .catch(err => res.status(400).json('error getting user'));
})

app.put('/image', (req, res) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries => {
	  	res.json(entries[0])
	  })
	  .catch(err => res.status(400).json('unable to get entries'))
})

app.listen(3000, () => {
	console.log('app is running on port 3000');
})

