const express = require('express');
const app = express();
app.use(express.json());

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
	  res.json('success');
	} else {
	  res.status(404).json('error logging in');
	}	
})

app.post('/register', (req, res) => {
	const { email, password, name } = req.body;
	database.user.push(
		{
			id: '125',
			name: name,
			email: email,
			password: password,
			entries: 0,
			joined: new Date()
		}
	)
	res.json(database.user[database.user.length-1]);
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	database.user.forEach(user => {
		if(user.id === id) {
			return res.json(user);
		} 		
	})
	res.status(400).json('not found');
})

app.put('/image', (req, res) => {
	const { id } = req.body;
	database.user.forEach(user => {
		if(user.id === id) {
			user.entries++
			return res.json(user.entries);
		} 		
	})
	res.status(400).json('not found');
})

app.listen(3000, () => {
	console.log('app is running on port 3000');
})

/*
planning your endppoints - request, response
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user


*/