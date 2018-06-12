const axios = require("axios");
const issueData = require("./issueData");
module.exports = {
  sum: (a, b) => {
    return a + b;
  },

  getIssue: url => {
    return issueData.get(url).then(res => {
      return res.data;
    });
  },
  deleteComment: url => {},

  createIssue() {},

  search: id => {
    console.log("insdie search function************************");
    return issueData.filter(issue => {
      return issue.id === id;
    });
  }
};
