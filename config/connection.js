const mongoose = require('mongoose');

// After you create your Heroku application, visit https://dashboard.heroku.com/apps/ select the application name and add your Atlas connection string as a Config Var
// Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume that you are running this application locally
// The process.env.MONGODB_URI variable will exist on the deployed application, but not when you run it locally
// If it's not there, it will use the local MongoDB server

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useNewURLParser: true,
    useUnifiedTopology: true,
}
);

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

module.exports = mongoose.connection;
