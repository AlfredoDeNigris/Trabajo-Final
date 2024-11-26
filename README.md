# Table of Contents

- [Description](#Description)

- [Technical Requirements](#technical-requirements)

- [API Documentation](#api-documentation)

- [Highlights](#Highlights)

- [Installation](#Installation)


# Description

This is a web application designed to manage the creation and payment of fines related to vehicles owned by users registered in the database. 

# Technical Requirements

Programming language - JavaScript (Node.js)

Node.js - 18.16.0

Database - MySQL


## Base URL

http://localhost:8080

# API Documentation

## 1. Endpoint /login:

Endpoint: /login  
Standard: JWT

curl -X POST http://localhost:8080/login  
  -H 'Content-Type: application/json'  
  -d '{  
    "username": "johnA",
    "password": "pass123"
}'

Response:

"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJmdWxsX25hbWUiOiJKb2huIEFkbWluIiwibGljZW5zZSI6MTIzNDU2Nzg5LCJkYXRlX2JpcnRoIjoiMTk4NS0wNS0xNVQwMzowMDowMC4wMDBaIiwiYmlsbG
luZ19hZGRyZXNzIjoiMTIzNCBFbG0gU3RyZWV0IiwicGhvbmVfbnVtYmVyIjoiNTU1LTEyMzQiLCJlbWFpbCI6ImpvaG5BZG1pbkBleGFtcGxlLmNvbSIsInVzZX
JfaWQiOjEsInJvbGUiOiJhZG1pbiIsImV4cCI6MTczMjkwNzk3NH0.RUauIzAqS2uKpaKu4sFy3cuP4Z-zGleq24BwlBA1GzE"


## 2. Endpoint /user:

### GET /user - gets all users

curl -X GET http://localhost:8080/user 
  -H 'Accept: application/json'

Server should answer with status code 200 and all user records.

Server should answer with status code 404 and corresponding message if there are not registered users.

### GET /user/profile/:user_id - gets user by id

curl -X GET http://localhost:8080/user/profile/:user_id
  -H 'Accept: application/json'

Server should answer with status code 200 and record with id === user_id if it exists.

Server should answer with status code 400 and corresponding message if user_id is invalid.

Server should answer with status code 404 and corresponding message if record with id === user_id does not exist.


### POST user/register - creates new user

curl -X POST http://localhost:8080/user/register  
  -H 'Content-Type: application/json'  
  -d '{
    "full_name": "Ignacio De Nigris",  
    "username": "ignacioDeNigris",  
    "license": 9999685,  
    "date_birth": "1985-07-07",
    "password": "securePassword123",  
    "billing_address": "123 Main St, Anytown, USA",  
    "phone_number": "123-456-7890",  
    "email": "ignaciodenigris@gmail.com"  
}'

The request body should contain the required information for creating a new user, such as full_name, username, license, date_birth, 
password, billing_address, phone_number and email.

Server should answer with status code 200 and newly created record.

Server should answer with status code 400 and corresponding message if request body does not contain required fields.


### PUT user/profile/:user_id - updatess existing user's information

curl -X PUT http://localhost:8080/user/profile/{user_id}  
  -H 'Content-Type: application/json'  
  -d '{  
    "full_name": "Alfredo Ignacio Hernan De Nigris",  
    "username": "ignacioDeNigris",  
    "license": 9999685,  
    "date_birth": "1992-07-07",
    "password": "securePassword123",  
    "billing_address": "123 Main St, Anytown, USA",  
    "phone_number": "123-456-7890",  
    "email": "ignaciodenigris@gmail.com"  
}'


The request body should contain the required information for editing the existin user information, such as full_name, username, license,
date_birth, password, billing_address, phone_number and email.

Server should answer with status code 200 and record with id === user_id if it exists.

Server should answer with status code 400 and corresponding message if user_id is invalid.

Server should answer with status code 404 and corresponding message if record with id === user_id does not exist.


### DELETE user/profile/:user_id - deletes existing user

curl -X DELETE http://localhost:8080/user/profile/{user_id}


Server should answer with status code 200 if the record was found and deleted.

Server should answer with status code 400 and corresponding message if user_id is invalid.

Server should answer with status code 404 and corresponding message if record with id === user_id does not exist.


## 3. Endpoint /inspector

### GET /inspector - gets all inspectors

curl -X GET http://localhost:8080/inspector  
  -H 'Accept: application/json'


Server should answer with status code 200 and all inspector records.

Server should answer with status code 404 and corresponding message if there are not registered inspectors.


### GET /inspector/:badge_number - gets inspector by badge number

curl -X GET http://localhost:8080/inspector/:badge_number
  -H 'Accept: application/json'

Server should answer with status code 200 and record with badge number === badge_number if it exists.

Server should answer with status code 400 and corresponding message if badge number is invalid.

Server should answer with status code 404 and corresponding message if record with badge number === badge_number does not exist.

### POST inspector/register - creates new inspector

curl -X POST http://localhost:8080/inspector/register  
  -H 'Content-Type: application/json'  
  -d '{
    "full_name": "Ignacio De Nigris",  
    "username": "ignacioDeNigris",  
    "license": 9999685,  
    "date_birth": "1985-07-07",
    "password": "securePassword123",  
    "billing_address": "123 Main St, Anytown, USA",  
    "phone_number": "123-456-7890",  
    "email": "ignaciodenigris@gmail.com"  
}'

The request body should contain the required information for creating a new inspector, such as full_name, username, license, date_birth, 
password, billing_address, phone_number and email.

Server should answer with status code 200 and newly created record.

Server should answer with status code 400 and corresponding message if request body does not contain required fields.

### DELETE inspector/profile/:badge_number/:role - deletes the entry from inspector table

curl -X DELETE http://localhost:8080/profile/{badge_number}/{user_id}


Server should answer with status code 200 if the record was found and deleted.

Server should answer with status code 400 and corresponding message if either user_id or badge_number are invalid.

Server should answer with status code 404 and corresponding message if record with user id === user_id does not exist.


## 4. Endpoint /user:

### GET /vehicle - gets all vehicles

curl -X GET http://localhost:8080/vehicle 
  -H 'Accept: application/json'

Server should answer with status code 200 and all vehicle records.

Server should answer with status code 404 and corresponding message if there are not registered vehicles.

### GET /vehicle/information/:patent - gets vehicle by patent

curl -X GET http://localhost:8080/vehicle/information/{patent}
  -H 'Accept: application/json'

Server should answer with status code 200 and record with patent === patent if it exists.

Server should answer with status code 400 and corresponding message if patent is invalid.

Server should answer with status code 404 and corresponding message if record with patent === patent does not exist.


### POST vehicle/register - creates new vehicle

curl -X POST http://localhost:8080/vehicle/register  
  -H 'Content-Type: application/json'  
  -d '{
  "patent": "ABCD-2025",
  "information": "Camioneta Ford F-100",
  "user_id": 1
}'

The request body should contain the required information for creating a new vehicle, such as patent, information and user_id.

Server should answer with status code 200 and newly created record.

Server should answer with status code 400 and corresponding message if request body does not contain required fields.


### PUT vehicle/information/:patent - updatess existing vehicle's information

curl -X PUT http://localhost:8080/vehicle/information/{patent}  
  -H 'Content-Type: application/json'  
  -d '{  
  "information": "Automovil Ford Falcon" 
}'


The request body should contain the required information for editing the existin vehicles information.

Server should answer with status code 200 and record with patent === patent if it exists.

Server should answer with status code 400 and corresponding message if patent is invalid.

Server should answer with status code 404 and corresponding message if record with patent === patent does not exist.


### DELETE vehicle/information/:patent - deletes existing vehicle

curl -X DELETE http://localhost:8080/vehicle/information/{patent} 


Server should answer with status code 200 if the record was found and deleted.

Server should answer with status code 400 and corresponding message if patent is invalid.

Server should answer with status code 404 and corresponding message if record with patent === patent does not exist.


## 5. Endpoint /fine:

### GET /fine - gets all fines

curl -X GET http://localhost:8080/fine  
  -H 'Accept: application/json'  


Server should answer with status code 200 and all fine records.

Server should answer with status code 404 and corresponding message if there are not registered fines.

### GET /fine/:fine_id - gets fine by id

curl -X GET http://localhost:8080/fine/{fine_id}  
  -H 'Accept: application/json'  


Server should answer with status code 200 and record with id === fine_id if it exists.

Server should answer with status code 400 and corresponding message if id is invalid.

Server should answer with status code 404 and corresponding message if record with id === fine_id does not exist.

### POST fine/issue - creates new fine

curl -X POST http://localhost:8080/fine/issue  
  -H 'Content-Type: application/json'  
  -d '{
  "fine_description": "speeding",
  "patent": "ABCD-2025",
  "badge_number": 1,
  "reason_id": 1
}'

The request body should contain the required information for creating a new fine, such as fine_description, patent, badge_number and reason_id.

Server should answer with status code 200 and newly created record.

Server should answer with status code 400 and corresponding message if request body does not contain required fields.

### PATCH fine/pay/:fine_id - Updates an existing fine's "paid" status to true

curl -X POST http://localhost:8080/fine/pay/:fine_id  
  -H 'Content-Type: application/json'  
  -d '{
}'

The request body does not required information.

Server should answer with status code 200 and a success message.

Server should answer with status code 400 and corresponding message if id is invalid.

Server should answer with status code 404 and corresponding message if record with id === fine_id does not exist.

# Highlights

1. ### Connection Pool:

The application manages database connections using a connection pool, ensuring optimal resource usage and scalability.

2. ### Middleware Validation:

All routes that handle data submissions are processed through middleware that utilizes the express-validator module. Ensuring that required data is
present and correctly formatted before proceeding. The connection pool is checked asynchronously, ensuring that routes are only processed when the 
pool is successfully established..

3. ### Enhanced Validation with express-validator:

The application leverages the express-validator module for robust validation of incoming requests, ensuring data integrity and security.

4. ### Custom Utility Functions:

The "utilities.js" file contains custom functions like "globalError" for personalized error messaging and "readQuery" and "executeQuery" for 
executing database queries, facilitating the scalability and maintainability of the application.

5. ### View/Controller Design Pattern:

The application is structured using the view/controller design pattern, separating concerns and making the codebase easier to manage and extend.

# Installation

## Node.js:

To install Node.js version 18.16.0:

1. Using Node Version Manager (nvm):

sh

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

source ~/.nvm/nvm.sh

nvm install 18.16.0

nvm use 18.16.0

2. Using a package manager:

On Ubuntu/Debian:

sh

sudo apt update

sudo apt install -y nodejs npm

sudo npm install -g n

sudo n 18.16.0

On macOS:

sh

brew install node@18

On Windows:

Download the installer from Node.js official website and follow the instructions.


## Clone this repo with the command:

git clone <https://github.com/AlfredoDeNigris/Trabajo-Final>

## Go to the project folder:

cd Personal Proeject

## Install dependencies:

npm install --only=prod