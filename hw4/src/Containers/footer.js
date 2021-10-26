import "../index.css";
import Clear_Button from "../Components/clearButton";

import React, { Component } from 'react';

class Footer extends React.Component {  
    render() { 
        if(this.props.itemCount !== 0){
            return(
                <footer className="todo-app__footer" id="todo-footer">
                    <div className="todo-app__total">{this.props.todoCount} left</div>
                    <ul className="todo-app__view-buttons">
                        <button onClick={this.props.showAll}>All</button>
                        <button onClick={this.props.showActive}>Active</button>
                        <button onClick={this.props.showCompleted}>Completed</button>
                    </ul>
                    <Clear_Button completedCount={this.props.completedCount} clearCompleted={this.props.clearCompleted}/>
                </footer>
            );
        }else if(this.props.itemCount === 0){
            return<></>;
        }
    }
}

export default Footer;