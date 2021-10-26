import React, { Component } from 'react';

import "../index.css";
import x from "../img/x.png";

class Item extends React.Component {
    render() { 
        return (
            <li className="todo-app__item">
                <div className="todo-app__checkbox">
                    <input type="checkbox" id={this.props.idNow} onClick={this.props.doneTodo}/>
                    <label htmlFor={this.props.idNow}/>
                </div>
                <h1 className="todo-app__item-detail">{this.props.text}</h1>
                <img src={x} className="todo-app__item-x" onClick={this.props.removeItem}/>
            </li>
        );
    }
}

export default Item;