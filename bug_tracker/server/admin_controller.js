module.exports = {

  
commentByIssue: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
    
        dbInstance.comment_by_IssueId().then(issues => res.status(200).send(issues))
        .catch(error => console.log(error));
      },


      issueByUserId: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
    
        dbInstance.issue_by_userId().then(issues => res.status(200).send(issues))
        .catch(error => console.log(error));
      },

      commentCountByIssue: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
    
        dbInstance.comment_Count_byIssueId().then(issues => res.status(200).send(issues))
        .catch(error => console.log(error));
      },

      commentCountByUser: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
    
        dbInstance.comment_Count_byUsername().then(issues => res.status(200).send(issues))
        .catch(error => console.log(error));
      },
      
      issueCountByUser: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
    
        dbInstance.issue_Count_ByUsername().then(issues => res.status(200).send(issues))
        .catch(error => console.log(error));
      },



    }