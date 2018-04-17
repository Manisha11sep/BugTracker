module.exports = {
    user: req.session.user.username,

    createComment: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        const { description,issue_id, posted_by} = req.body;
    
        dbInstance.create_comment([description,issue_id, posted_by], )
          .then( () => res.status(200).send(message= "Issue created successfully") )
    
          .catch( error => console.log(error) );
      },
}