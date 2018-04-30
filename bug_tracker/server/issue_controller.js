
module.exports = {


  createIssue: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const {title,description,last_updated} = req.body;
    const creater_id = req.session.user.id;

    dbInstance.create_issue([title,description,creater_id,last_updated])
      .then( () => res.json("Issue created successfully") )

      .catch( error => console.log(error) );
  },

  getIssues: ( req, res, next ) => {
    const dbInstance = req.app.get('db');

    dbInstance.select_issue().then( issues => res.status(200).send(issues))
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



  searchIssue: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const { search } = req.query;
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



};