import axios from "axios";
const initalState = {
  id: "",
  username: "",
  email: "",
  profile_pic: "",
  text: "",
  description: "",
  user: [],
  issues: [],
  text: "",
  search: "",
  commentList: []
};

const USERDETAIL = "USERDETAIL";
const LOGOUT = "LOGOUT";

const SEARCH = "SEARCH";
const ISSUELIST = "ISSUELIST";
const COMMENTLIST = "COMMENTLIST";

function reducer(state = initalState, action) {
  console.log("inside switch", action.payload);
  switch (action.type) {
    case USERDETAIL:
      return {
        ...state,
        // user:action.payload,
        username: action.payload.username,
        email: action.payload.email,
        profile_pic: action.payload.profile_pic
      };
    case LOGOUT:
      return {
        ...state,
        username: "",
        email: "",
        profile_pic: ""
      };

    case SEARCH:
      return {
        ...state,
        search: action.payload
      };
    case ISSUELIST:
      return {
        ...state,
        issues: action.payload
      };
    case COMMENTLIST:
      return {
        ...state,
        commentList: action.payload
      };

    default:
      return state;
  }
}
export function userDetail(user) {
  console.log("Inside reducer", user);
  return {
    type: USERDETAIL,
    payload: user
  };
}
export function logout() {
  return {
    type: LOGOUT
  };
}

export function issueList(issueList) {
  return {
    type: ISSUELIST,
    payload: issueList
  };
}
export function commentList(commentList) {
  return {
    type: COMMENTLIST,
    payload: commentList
  };
}

//Comment


// Search
export function search(searchText) {
  return {
    type: SEARCH,
    payload: searchText
  };
}
export default reducer;
