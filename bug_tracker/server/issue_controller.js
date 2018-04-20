module.exports = {

createUser: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const {username,password,email,profile_pic} = req.body;

    dbInstance.create_user([username,password,email,profile_pic])
      .then( () => res.status(200).send(message= "User Regestered successfully") )

      .catch( error => console.log(error) );
  },

  createIssue: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const {title,description,last_updated} = req.body;
    const creater_id = req.session.user.id;
 console.log("id is" ,req.session.user.id);

    dbInstance.create_issue([title,description,creater_id,last_updated])
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
session:(req,res,next)=>{
  console.log("inside session function ", req.session.user);
  res.status(200).send(req.session.user)

},


  searchIssue: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const { search } = req.query;
    console.log("inside controller", search)
    dbInstance.search_issue([ search])
      .then( product => res.status(200).send( product ) )
      .catch( error => console.log(error) );
  },

  // search: (req, res) => {
  //   console.log(req.query.city);
  //   if(req.query.city){
  //       req.app.get('db').search_property(req.query.city).then(data => {
  //           res.status(200).send(data)
  //       })
  //   }


  login: (req, res, next) => {
    const { username, password } = req.body;
    const dbInstance = req.app.get('db');
    dbInstance.find_user([username]).then(data => {
      console.log("user data is ",data);
    if (data.length) {
      if (data[0].password === password) {
        req.session.user = { 
          id:data[0].id,
          username: data[0].username,
          email: data[0].email,
          profile_pic: data[0].profile_pic
         };
        res.status(200).send(req.session.user)
        res.redirect('/dashboard');
    
      } else {
        res.status(403).json({ message: 'Invalid password' });
      }
    } else {
      res.status(403).json({ message: 'Unknown user' });
    }
  }).catch(error => {
    console.log('error', error);
    res.status(500).json({ message: "An error occurred; for security reasons it can't be disclosed" });
  });

  
  },

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