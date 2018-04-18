const express = require('express')
const bodyParser = require('body-parser')
const issue_controller = require('./issue_controller');
const comment_controller = require('./comment_controller');
const massive = require('massive');
const session = require('express-session');
require('dotenv').config();
const PORT=4000;
const app = express();
// const cors = require('cors');

app.use(bodyParser.json());
// app.use(cors());
massive( process.env.CONNECTION_STRING ).then( dbInstance => app.set('db', dbInstance) );
app.use(session({
    secret: 'nkjkjkl',
    saveUninitialized: false,
    resave: false,
    cookie :{
     maxAge: 1000 * 60 * 60 * 24 * 14,
    },

}));

app.get( '/api/issue/getAll',issue_controller.getIssues );
app.post('/api/issue/create', issue_controller.createIssue);
app.delete('/api/issue/:id', issue_controller.deleteIssue);
app.put('/api/issue/:id', issue_controller.updateIssue);
// app.get( '/api/issue/:id', issue_controller.getIssue );


//login page
// app.get('/api/users', issue_controller.getUsers);
app.post('/api/login', issue_controller.login);

app.post( '/api/logout', issue_controller.logout );

//Signup page
app.post( '/api/signup', issue_controller.createUser );


//**************** COMMENT page */
app.get('/api/comment/:issue_id', comment_controller.getComment);
app.post('/api/comment', comment_controller.createComment);

app.listen(PORT, ()=> console.log(`you are running on : ${PORT}`))
