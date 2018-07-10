import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

let tableData = [
    {
        first_name: 'Mark',
        last_name: 'Otto',
        age: 15
    },
    {
        first_name: 'Varuj',
        last_name: 'Mikayelyan',
        age: 16
    },
    {
        first_name: 'Aram',
        last_name: 'Tigranyan',
        age: 56
    },
    {
        first_name: 'Varduhi',
        last_name: 'Ghazaryan',
        age: 28
    },
    {
        first_name: 'Hasmik',
        last_name: 'Qamalyan',
        age: 32
    },
    {
        first_name: 'Jacob',
        last_name: 'Botto',
        age: 8
    },
];

ReactDOM.render(
    <App data={tableData} />,
    document.getElementById('header')
);

registerServiceWorker();
