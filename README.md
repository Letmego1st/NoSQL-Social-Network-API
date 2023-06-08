# NoSQL-Social-Network-API

### Table of Contents:
1. [Description](#description)
2. [Technology](#technology)
3. [Acceptance Criteria](#acceptance-criteria)
4. [Mock Up](#mock-up)
4. [Walkthrough Videos](#walkthrough-videos)
5. [Installation](#installation)
6. [Tests](#tests)
7. [Contribution](#contribution)
8. [Questions](#questions)

### Description:

My task was to develop an API for a web-based social network application that enables users to share their thoughts, respond to their friends' thoughts, and manage their friend list. To accomplish this, I utilized Express.js for handling routing, MongoDB as the underlying database, and the Mongoose ODM for seamless interaction with the database.


### Technology:

Project is created with:

- Javascript
- Node.js
- Express.js
- MongoDB
- Mongoose


### Acceptance Criteria:

```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```


### Mock-Up

```
The following animations show examples of the application's API routes being tested in Insomnia.
```
![insomnia](./images/18-nosql-homework-demo-01%20(1).gif)

```
The following animation shows GET routes to return a single user and a single thought being tested in Insomnia:
```

![insomnia](./images/18-nosql-homework-demo-02.gif)

### Walkthrough Videos:

User Routes

Friend Routes

Thought Routes

Reaction Routes

### Installation:

This repo is not to be deployed. To run this project, install it locally using npm:

```
npm install
```

### Tests:

After installing npm packages, the application will be invoked by using the following command:
```
nodemon server
```
### Contribution
- Course curriculum
- Tutors
- UDEMY course

### Questions

- [Email](mailto:imcodong4real@gmail.com)
- [Github](https://github.com/Letmego1st)