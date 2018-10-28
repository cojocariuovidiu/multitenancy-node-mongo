This Project uses [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/) so please make sure you've these installed before trying to run the application.
### Running the application

Clone the repo and navigate to the root folder of the project.  
Run `npm install` -- this will install all the dependencies required for the project to start.  
Run `npm start` -- this will start the server on `port 3050` using nodemon.  

### Testing in a Local Environment

`Start Mongodb on multiple instances` (use different ports).  
Using `POSTMAN` (or a similar tool to test the requests) use the `/register` API to create a new Tenant.  
Using `Robo3t` or a similar tool connect to the running mongodb instances and check if the new DB has been created with a single user insterted in the user collection.  