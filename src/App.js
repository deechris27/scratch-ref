import React from 'react';
import {connect} from 'react-redux';
import {testy, updateCounter} from './apiClient/apiCalls';
import './App.css';

class App extends React.Component{
    constructor(props){
        super(props);
        this.updateCounterToDB = this.updateCounterToDB.bind(this);
        this.state={
            test: '',
            statusFromDb: 'I will change to success message if DB updated'
        };
    }

    componentDidMount(){
        testy.then(res=>this.setState({test:res.data}))
              .catch(e=>console.trace(e));
    }

    updateCounterToDB(){
        updateCounter(`{"counter": ${this.props.counter}}`)
        .then(res=>this.setState({...this.state,statusFromDb:res.data.status}))
        .catch(e=>this.setState(e))
    }

    render(){
        return(
            <React.Fragment>
                <div>
                    <h4>{this.state.test}</h4>
                    <p>{`The counter value from the store is ${this.props.counter}`}</p>
                    <p>{`Things to do from the store are.... ${this.props.text}`}</p>
                    <button onClick={this.props.onIncrement} style={{color:"blue", margin:"5px 5px"}}>Increment</button>
                    <button onClick={this.props.onDecrement} style={{color:"green", margin:"5px 5px"}}>Decrement</button>
                    <button onClick={this.props.addTodo} style={{color:"orange", margin:"5px 5px"}}>ADD TODO</button>
                    <br />
                    <button onClick={this.updateCounterToDB} style={{color:"red", margin:"5px 5px"}}>Update counter to DB</button>
                    <h3>{`DB update status: - ${this.state.statusFromDb}`}</h3>
                </div>
            </React.Fragment>
        )
    }
}


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