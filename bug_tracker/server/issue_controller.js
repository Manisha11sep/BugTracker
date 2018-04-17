module.exports = {

createUser: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const { id,username,password,email,profile_pic } = req.body;

    dbInstance.create_user([id,username,password,email,profile_pic])
      .then( () => res.status(200).send(message= "Post created successfully") )

      .catch( error => console.log(error) );
  },

  createIssue: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const { name,description,creater_id_last_updated } = req.body;

    dbInstance.create_issue([name,description,creater_id_last_updated])
      .then( () => res.status(200).send(message= "Issue created successfully") )

      .catch( error => console.log(error) );
  },

  getIssues: ( req, res, next ) => {
    const dbInstance = req.app.get('db');

    dbInstance.select_issue().then( issues => res.status(200).send(issues))
    .catch(error => console.log(error));
  },

  getUsers: ( req, res, next ) => {
    const dbInstance = req.app.get('db');

    dbInstance.select_users()
    .then( users => res.status(200).send(users))
    .catch(error => console.log(error));
  },

  updateIssue: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const { params, query } = req;

    dbInstance.update_issue([ params.id, query.content ])
      .then( () => res.status(200).send(message = "post is updated") )
      .catch( error => console.log(error) );
  },

  deleteIssue: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const { params } = req;

    dbInstance.delete_issue([ params.id ])
      .then( () => res.status(200).send(message = "post is deleted") )
      .catch( error => console.log(error) );
  },



  // getIssue: ( req, res, next ) => {
  //   const dbInstance = req.app.get('db');
  //   const { params } = req;

  //   dbInstance.read_product([ params.id ])
  //     .then( product => res.status(200).send( product ) )
  //     .catch( error => console.log(error) );
  // },


  // login: (req, res, next) => {
  //   const { username, password } = req.body;
  //   const dbInstance = req.app.get('db');
  //   dbInstance.find_user([username]).then(data => {
  //   if (data.length) {
  //     if (data[0].password === password) {
  //       req.session.user = { username };
  //       res.json({message: `Login successfully ${username}` });
  //     } else {
  //       res.status(403).json({ message: 'Invalid password' });
  //     }
  //   } else {
  //     res.status(403).json({ message: 'Unknown user' });
  //   }
  // }).catch(error => {
  //   console.log('error', error);
  //   res.status(500).json({ message: "An error occurred; for security reasons it can't be disclosed" });
  // });

  
  // },

  logout : (req,res)=>{
    const name = req.session.user.username;
    req.session.destroy();
    res.json({message: 'you have successfully logged out, ${name}'});

},

// signout: ( req, res, next ) => {
//   const {session} =req;
//   session.destroy();
//   res.status(200).send("your loggedout");


// },

};