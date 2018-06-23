const express = require("express");
const bodyParser = require("body-parser");
const issue_controller = require("./issue_controller");
const comment_controller = require("./comment_controller");
const admin_controller = require("./admin_controller");
const email_controller = require("./email_controller");
const user_controller = require("./user_controller");
const massive = require("massive");

const session = require("express-session");
const nodeMailer = require("nodemailer");
require("dotenv").config();
const PORT = 80;
const app = express();
// const cors = require('cors');
// const checkForSession = require('./middlewares/checkForSession');

app.use( express.static( `${__dirname}/../build` ) );
app.use(bodyParser.json());
// app.use(cors());
massive(process.env.CONNECTION_STRING).then(dbInstance =>
  app.set("db", dbInstance)
);
app.use(
  session({
    secret: "nkjkjkl",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14
    }
  })
);

app.get("API");

app.get("/api/issue/getAll", issue_controller.getIssues);
app.post("/api/issue/create", issue_controller.createIssue);

app.get("/api/issue", issue_controller.searchIssue);

//****************login page//****************
app.post("/api/login", user_controller.login);
app.post("/api/logout", user_controller.logout);

//**************FILE UPLOAD************* */
app.get("/api/upload", user_controller.imageUpload);

//****************Signup page//****************
app.post("/api/signup", user_controller.createUser);

//**************** SESSION //****************
app.get("/api/session", user_controller.session);
app.get("/api/checkSession", user_controller.checkSession);

//**************** COMMENT page//****************
app.get("/api/comment/:issue_id", comment_controller.getComment);
app.post("/api/comment", comment_controller.createComment);
app.put("/api/comment/:comment_id", comment_controller.updateComment);
app.delete("/api/comment/:id", comment_controller.deleteComment);

//**************** ADMIN DASHBOARD page//****************
app.get("/api/admin/comment", admin_controller.commentByIssue);
app.get("/api/admin/issue", admin_controller.issueByUserId);
app.get("/api/admin/issuecount", admin_controller.issueCountByUser);
app.get("/api/admin/commentcount", admin_controller.commentCountByUser);
app.get("/api/admin/issuecomment", admin_controller.commentCountByIssue);
app.get("/api/admin/users", admin_controller.allUser);

//**************** Email//****************
app.post("/api/send-email", email_controller.sendMessage);

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

app.listen(PORT, () => console.log(`your server is running on : ${PORT}`));
