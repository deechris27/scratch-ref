import {firstReducer} from './firstReducer';
import {secondReducer} from './secondReducer';
import {combineReducers} from 'redux';


const rootReducer = combineReducers({
    firstReducer,
    secondReducer
});

export default rootReducer;