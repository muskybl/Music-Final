import React from 'react';
import ReactDOM from 'react-dom';
import './main/index.css';
import App from './main/App';
// import Dark from './main/Dark'
import * as serviceWorker from './main/serviceWorker';
//eslint-disable-next-line
ReactDOM.render(
    
        <App />
    
    , document.getElementById('root'));

//{/* <link rel="icon" href="%PUBLIC_URL%" /> */}
serviceWorker.register();
{/* <React.StrictMode>
        <App />
    </React.StrictMode> */}