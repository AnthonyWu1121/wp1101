import React, { Component } from 'react';

import Item from './item';

class Main extends React.Component {
    render() { 
        return (
            <section className="todo-app__main">
                <input className="todo-app__input" type="text" placeholder="What needs to be done?" onKeyDown={this.props.handleKeyDown} />
                <ul className="todo-app__list" id="todo-list">
                    {this.props.itemList.map((i, index) => <Item text={i.value} key={index} idNow={index} doneTodo={this.props.doneTodo} 
                        removeItem={this.props.removeItem}/>)}
                </ul>
            </section>
        );
    }
}

export default Main;


