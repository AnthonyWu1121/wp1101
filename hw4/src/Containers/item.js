import React, { Component } from 'react';

import "../index.css";
import x from "../img/x.png"

class Item extends React.Component {

    doneTodo = (e) => {
        if(e.target.checked === true){
            e.target.parentNode.nextSibling.style="text-decoration: line-through; opacity: 0.5;";
        }else if(e.target.checked === false){
            e.target.parentNode.nextSibling.style="text-decoration: none; opacity: 1;";
        }
    }

    render() { 
        return (
            <li className="todo-app__item">
                <div className="todo-app__checkbox">
                    <input type="checkbox" id={this.props.idNow} onClick={this.doneTodo}/>
                    <label htmlFor={this.props.idNow}/>
                </div>
                <h1 className="todo-app__item-detail">{this.props.text}</h1>
                <img src={x} className="todo-app__item-x"/>
            </li>
        );
    }
}

export default Item;