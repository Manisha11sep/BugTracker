const cloudinary = require('cloudinary');
const bcrypt = require('bcrypt');
const saltRounds = 12;

module.exports ={
    imageUpload: (req, res) => {
        console.log("Inside server side")
        const timestamp = Math.round((new Date()).getTime() / 1000);
        const api_secret = process.env.CLOUDINARY_SECRET_API;
        const signature = cloudinary.utils.api_sign_request({ timestamp: timestamp }, api_secret);
        const payload = {
            signature: signature,
            timestamp: timestamp
        };
        console.log("payload is ", payload)
        res.json(payload);
    
    },

    createUser: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        const {username,password,email,profile_pic} = req.body;
        bcrypt.hash(password,saltRounds ).then(hashedPassword=>{
            dbInstance.create_user([username,hashedPassword,email,profile_pic]).then((data)=>{
            req.session.user = data[0];
            console.log("registered successfully");
            res.status(200).send('registered');
        }).catch(error => {
            res.status(500).json({ message: "An error occurred; for security reasons it can't be disclosed" });
          });
    })
            
        },
   
      
      getUsers: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
    
        dbInstance.select_users()
        .then( users => res.status(200).send(users))
        .catch(error => console.log(error));
      },
      session:(req,res,next)=>{
        res.status(200).send(req.session.user)
      
      },
      
  login: (req, res, next) => {
    const { username, password } = req.body;
    const dbInstance = req.app.get('db');
    dbInstance.find_user([username]).then(data => {
        if (data.length) {
          bcrypt.compare(password, data[0].password).then(passwordsMatch => {
            if (passwordsMatch) {
                req.session.user = { 
                    id:data[0].id,
                    username: data[0].username,
                    email: data[0].email,
                    profile_pic: data[0].profile_pic
                   };
                  res.status(200).send(req.session.user)
            } else {
              res.status(403).json({ message: 'Invalid password' });
            }
          }).catch(error => {
            res.status(500).json({ message: "An error occurred; for security reasons it can't be disclosed" });
          })
        } else {
          res.status(403).json({ message: 'Unknown user' });
        }
      }).catch(error => {
        res.status(500).json({ message: "An error occurred; for security reasons it can't be disclosed" });
      });
    },
    logout: (req, res) => {
        req.session.destroy();
        res.status(200).send('Session ended');
    },
}