     module.exports = {


        createComment: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        const { description,issue_id} = req.body;
        const posted_by =  req.session.user.username;
        console.log("username is" ,req.session.user.username);
         dbInstance.create_comment([description, issue_id,posted_by])
        .then( (comment) => res.status(200).send(comment ))
        .catch( error => console.log(error) );
        },


        getComment: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        const id = req.params.issue_id;
         dbInstance.select_comment([id])
        .then( comment => res.status(200).send(comment) )
        .catch( error => console.log(error) );
        },
        
        updateComment: ( req, res, next ) => {
            const dbInstance = req.app.get('db');
            const { params, query } = req;

            dbInstance.update_comment([ params.posted_by, query.description ])
            .then( () => res.status(200).send(message = "comment is updated") )
            .catch( error => console.log(error) );
        },

        deleteComment: ( req, res, next ) => {
            const dbInstance = req.app.get('db');
            console.log(req.params.id);
            const deleteID = req.params.id

            dbInstance.delete_comment([deleteID])
            .then( () => res.status(200).send(message = "comment is deleted") )
            .catch( error => console.log(error) );
        },
        }
