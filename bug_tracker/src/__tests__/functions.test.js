const functions = require('./../test_utils/function')
const issueData = require('./../test_utils/issueData');
const utils = require('./../utils');

test('adds 1 + 2 to equal 3', () => {
  expect(functions.sum(1, 2)).toBe(3);
});


test("search the issue by id", ()=>{
  let issueToSearch = functions.search(2);
  console.log(issueToSearch);
  expect(issueToSearch[0].id).toEqual(2);
})


test("Test the filter/search by username", ()=>{
  let filteredResults = utils.filterIssueByUser(issueData, 'manisha');
  expect(filteredResults.length).toEqual(2);
  expect(filteredResults[0].posted_by).toEqual('manisha')
})


describe("Get all the issues", ()=>{
  test('getIssue return all the issues', ()=>{
    const url=issueData;
    expect(functions.getIssue(url)).then(res=>{
      expect(res).toEqual( {
        "id": 1,
        "name": "System error",
        "description": "Application is crashing",
        "creater_id": 1,
        "last_updated": "2018-04-29T01:06:00.383Z"
    },
    {
        "id": 2,
        "name": "Function is not adding 2 numbers",
        "description": "Function is not adding two number after calling.",
        "creater_id": 4,
        "last_updated": "2018-04-29T01:07:52.256Z"
    },
    {
        "id": 3,
        "name": "axios failed",
        "description": "axios call is rejected from server ",
        "creater_id": 2,
        "last_updated": "2018-04-29T01:09:20.301Z"
    },
    {
        "id": 4,
        "name": "form is not clearning",
        "description": "After submitting the form its not clearning",
        "creater_id": 1,
        "last_updated": "2018-04-29T01:14:17.679Z"
    },
    {
        "id": 5,
        "name": "Fluffy not eating ",
        "description": "Fluffy creating a lot of fuss while eating food.",
        "creater_id": 6,
        "last_updated": "2018-04-29T01:20:03.628Z"
    },
    )
    })
  })
})