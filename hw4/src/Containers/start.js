import '../index.css';
import Main from "./main"
import Footer from "./footer"

import React, { Component } from 'react';

class Starter extends Component {
    state = {
        
    }

    render() { 
        return (
            <div id="root_2" className="todo-app__root">
                <header className="todo-app__header">
                    <h1 className="todo-app__title">todos</h1>
                </header>
                <Main />
                <Footer />
            </div>
        );
    }
}

export default Starter;