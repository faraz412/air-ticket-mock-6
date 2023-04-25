## AIR TICKET BOOKING

## Tech Stacks Used
- node.js, express.js, mongoose, mongodb

## Features 
-  Authentication
-  Register/Login
-  Crud operations on flights schema

### Environment Variables Required
`mongoURL`

`key`

`port` 
   
## API Endpoints
   #### Welcome
```javascript
GET  /api/
```

  #### User Register
```javascript
POST  /api/register

`Request body:

    {
        name: String,
        email: String,
        password: String
    }
`

Process:
- Hashing the password.
- Saving user data in database
- Respond with status 201

```
  #### User Login
```javascript
POST  /api/login

`Request body:
    {
        email: String,
        password: String
    }
`
Process:
- Compare password with hashed password in database
- Generate accesToken
- Respond with status 201

```

  #### Fetching all flights data
```javascript
GET  /api/flights

Process:
- Fetch data from flights collection in database
- Respond with status 200

```

  #### Fetching flight with desired id
```javascript
GET  /api/flights/:id

Process:
- Fetch data from flights collection in database
- Respond with status 200

```

  #### Add new flights
```javascript
POST  /api/flights

Process:
- Check if user logged in using "authenticate" middleware
- Add new flight data flights collection in database
- Respond with status 201

`Request body:

    {
        airline: String,
        flightNo: String,
        departure: String,
        arrival: String,
        departureTime: Date,
        arrivalTime: Date,
        seats: Number,
        price: Number
    }
`

```

  #### Edit flights data
```javascript
PATCH  /api/flights/:id

Process:
- Check if user logged in using "authenticate" middleware
- Update flight data with id providing in params and save in flights collection in database
- Respond with status 204

`Request body:

    {
        airline: String,
        flightNo: String,
        departure: String,
        arrival: String,
        departureTime: Date,
        arrivalTime: Date,
        seats: Number,
        price: Number
    }
`
```

  #### Delete flights data
```javascript
DELETE  /api/flights/:id

Process:
- Check if user logged in using "authenticate" middleware
- DElete flight data with id providing in params and save in flights collection in database
- Respond with status 202

```

  #### Book flights
```javascript
POST  /api/booking

Process:
- Check if user logged in using "authenticate" middleware.
- Get userID from token.
- Create a booking with userID and flightID
- Respond with status 201

`Request body:

    {
        flightID:ObjectId, ref: 'Flight'
    }
`
```

  #### Book flights
```javascript
GET  /api/dashboard

Process:
- Fetch all bookings data from booking collection in database
- Respond with status 200

`Request body:

    {
        flightID:ObjectId, ref: 'Flight'
    }
`
```
