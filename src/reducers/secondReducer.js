const initialState = {
    todos: ['test']
};

export const secondReducer = (state=initialState, action)=>{
    switch(action.type){
        case 'ADD_TODO':
            return Object.assign({}, state, {todos: action.text})
    }
    return state;
};