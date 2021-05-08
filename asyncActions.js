const redux = require("redux");
const axios = require("axios");
const thunk = require('redux-thunk').default
const applyMiddleware = redux.applyMiddleware



const createStore = redux.createStore


const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILED = "FETCH_USER_FAILED";

const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
  };
};

const fetchUserFailed = (error) => {
  return {
    type: FETCH_USER_FAILED,
    payload: error,
  };
};


const initialState = {
    loading:false, 
    users: [], 
    error : ''
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case 'FETCH_USER_REQUEST':{
            return {
                loading:true
            }
        }

        case 'FETCH_USER_SUCCESS':{
            return {
                loading:false,
                data:action.payload
            }
        }

        case 'FETCH_USER_ERROR':{
            return {
                loading:false,
                error:action.payload
            }
        }
    }
}


const fetch = ()=>{
    return function(dispatch) {
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users').then(resp=>{

            const usersData = resp.data.map(element=>element.name)
            dispatch(fetchUserSuccess(usersData))
            // response
        }).catch(err=>{
            // error
            dispatch(fetchUserFailed(err.message))
        })
    }
}

const store = createStore(reducer, applyMiddleware(thunk))

store.dispatch(fetch())

const unsubscribe = store.subscribe(()=>console.log(store.getState()))



