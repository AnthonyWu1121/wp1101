import React, { Component } from 'react';

import Item from './item';

class Input_Bar extends React.Component {
    state = {
        idCount: 0,
        itemList: [],
        itemCount: 0,
        todoCount: 0,
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            this.setState({ itemList: [...this.state.itemList, e.target.value] });
            this.setState({ idCount: this.state.idCount++ });
            e.target.value = "";
        }
    }

    render() { 
        return (
            <section className="todo-app__main">
                <input className="todo-app__input" type="text" placeholder="What needs to be done?"
                onKeyDown={this.handleKeyDown} />
                <ul className="todo-app__list" id="todo-list">
                    {this.state.itemList.map((i, index) => <Item text={i} key={index} idNow={index}/>)}
                </ul>
            </section>
        );
    }
}

export default Input_Bar;


