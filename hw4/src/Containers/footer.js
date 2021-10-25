import "../index.css"

import React, { Component } from 'react';

class Footer extends React.Component {
    render() { 
        return (
            <footer className="todo-app__footer" id="todo-footer">
                <div className="todo-app__total"></div>
                <ul className="todo-app__view-buttons">

                </ul>
                <div className="todo-app__clean"></div>
            </footer>
        );
    }
}

export default Footer;