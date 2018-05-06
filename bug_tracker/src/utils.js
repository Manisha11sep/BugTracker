module.exports = {

 filterIssueByUser: (issues,filterIssue) =>{
     console.log("insdide filter function")
    return issues.filter(issue => {
      return (
        issue.posted_by
          .toLowerCase()
          .indexOf(filterIssue.toLowerCase()) >= 0
      );
    });
  }
}