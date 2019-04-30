Fetch this code
- git clone https://github.com/smanji/express-auth-api.git

Install required packages
- sudo npm install
- sudo npm install -g nodemon

Make sure mongo is running
- mongod

Run server
- nodemon app.js

Use Postman to:
- Register a new user: POST http://localhost:8000/api/users
```
{
	"user": {
		"email": "test@test.com",
		"password": "test"
	}
}
```

- Login that user: POST http://localhost:8000/api/users/login
```
{
	"user": {
		"email": "test@test.com",
		"password": "test"
	}
}
```
