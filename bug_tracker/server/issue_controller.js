module.exports = {
  createIssue: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { title, description, last_updated } = req.body;
    const creater_id = req.session.user.id;

    dbInstance
      .create_issue([title, description, creater_id, last_updated])
      .then(issue => res.status(200).send(issue))
      .catch(error => console.log(error));
  },
  getIssues: (req, res, next) => {
    const dbInstance = req.app.get("db");

    dbInstance
      .select_issue()
      .then(issues => res.status(200).send(issues))
      .catch(error => console.log(error));
  },

  updateIssue: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params, query } = req;

    dbInstance
      .update_issue([params.id, query.content])
      .then(updatedissue => res.status(200).send(updatedissue))
      .catch(error => console.log(error));
  },

  deleteIssue: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .delete_issue([params.id])
      .then(deletedissue => res.status(200).send(deletedissue))
      .catch(error => console.log(error));
  },

  searchIssue: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { search } = req.query;
    dbInstance
      .search_issue([search])
      .then(searchedissue => res.status(200).send(searchedissue))
      .catch(error => console.log(error));
  }
};
