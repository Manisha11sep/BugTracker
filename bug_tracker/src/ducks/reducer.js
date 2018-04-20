import axios from 'axios';
const initalState = {
    id:'',
    username:'',
    email:'',
    profile_pic:'',
    text:'',
    description:'',
    user:[],
    issues :[],
    text:'',
    comments:[]
}

const USERDETAIL = 'USERDETAIL';
const LOGOUT ='LOGOUT';
const WRITE_COMMENT = 'WRITE_COMMENT';

function reducer (state=initalState, action){
    console.log("inside switch", action.payload);
    switch(action.type){
        case USERDETAIL:
            return{
                ...state,
                // user:action.payload,
                username: action.payload.username,
                email: action.payload.email,
                profile_pic: action.payload.profile_pic 
        };
            case LOGOUT:
            return {
                ...state,
                name:'',
                email:'',
            picture:'',
            };

            case WRITE_COMMENT:
                return {
                    ...state,description:action.payload
                };
            

    default:
    return state;
}

}
export function userDetail(user){
    console.log("Inside reducer",user)
    return{
        type:USERDETAIL,
        payload:user
    };

}

// console.log("inside Login", {username,password})
    //   axios.post('/api/login',{username,password}).then(response => {
    //     console.log(response.data)
    //       this.setState({ user: response.data });

export function logout(){
    return{
        type:LOGOUT,
    }
}

//Comment 
export function writeComment(description){
    return {
        type: WRITE_COMMENT,
        payload:description
    };

}
export default reducer; 