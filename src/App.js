import React from 'react';
import {connect} from 'react-redux';

const App = ({counter, onIncrement,onDecrement, addTodo, text})=>{
    return(
        <div>
            <h4>Hello Deepak</h4>
            <p>{`The counter value is ${counter}`}</p>
            <p>{`Thing to do are.... ${text}`}</p>
            <button onClick={onIncrement}>Increment</button>
            <button onClick={onDecrement}>Decrement</button>
            <button onClick={addTodo}>ADD TODO</button>
        </div>
    )
};


const mapStateToProps = (state) => ({
    counter: state.firstReducer.counter,
    text: state.secondReducer.todos
})

const mapDispatchToProps = dispatch => ({
   onIncrement: ()=>dispatch({type: 'INCREMENT'}),
   onDecrement: ()=>dispatch({type: 'DECREMENT'}),
   addTodo: ()=>dispatch({type: 'ADD_TODO', text: 'Chumma Kizhi'})
});


export default connect(mapStateToProps, mapDispatchToProps)(App);