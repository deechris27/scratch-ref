import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


const renderApp = (Component) =>{
    ReactDOM.render(<Component />,
        document.getElementById('root'))
};

renderApp(App);

