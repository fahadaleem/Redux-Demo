const redux = require('redux')

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

function buyCake (){
    return {
        type:BUY_CAKE,
        info:'First Action'
    }
}

function buyIcecream (){
    return {
        type:BUY_ICECREAM,
        info:"BUY Icecream"
    }
}

// // const initial state
// const initialState = {
//     numberOfCakes:10, 
//     numberOfIcecream:15
// }


const initialCakeState = {
    numberOfCakes:10
}

const initialIcecreamState= {
    numberOfIcecream:15
}

const CakeReducers = (state=initialCakeState, action)=>{
    switch(action.type)
    {
        case BUY_CAKE:{
            return {
                ...state,
                numberOfCakes:state.numberOfCakes-1
            }
        }

        default:{
            return state
        }
    }
}

const IcecreamReducers = (state=initialIcecreamState, action)=>{
    switch(action.type)
    {
        case BUY_ICECREAM:{
            return {
                ...state,
                numberOfIcecream:state.numberOfIcecream-1
            }
        }

        default:{
            return state
        }
    }
}


const rootReducers = combineReducers({
    cake:CakeReducers,
    icecream:IcecreamReducers
})

const store = createStore(rootReducers);

console.log('Current State: ', store.getState())
const unsubscribe = store.subscribe(()=>console.log('current state: ', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())

unsubscribe()
