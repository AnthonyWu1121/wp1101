import '../index.css';
import Main from "./main";
import Footer from "./footer";

import React, { Component } from 'react';

class Starter extends Component {
    state = {
        itemList: [],
        idCount: 0,
        itemCount: 0,
        todoCount: 0,
        completedCount: 0,
        toShow: "All",
    }

    clearCompleted = () => {
        let temp = [];
        let tempComCnt = this.state.completedCount;
        let tempItemCnt = this.state.itemCount;
        let len = this.state.itemList.length;
        for(let i = 0; i < len; i++){
            if(this.state.itemList[i].status === "Completed"){
                let completedItem = document.getElementById(i).parentNode.parentNode;
                completedItem.remove();
                tempComCnt--;
                tempItemCnt--;
                let tempValue = this.state.itemList[i].value;
                temp.push({value: tempValue, status: "Deleted"});
            }else{
                temp.push(this.state.itemList[i]);
            }
        }
        this.setState({ itemList: temp });
        this.setState({ completedCount: tempComCnt });
        this.setState({ itemCount: tempItemCnt });
    }

    showAll = () => {
        this.setState({ toShow: "All" });
        let len = this.state.itemList.length;
        for(let i = 0; i < len; i++){
            if(this.state.itemList[i].status === "Todo" || this.state.itemList[i].status === "Completed"){
                let completedItem = document.getElementById(i).parentNode.parentNode;
                completedItem.style.display = "";
            }
        }
    }
    showActive = () => {
        this.setState({ toShow: "Active" });
        let len = this.state.itemList.length;
        for(let i = 0; i < len; i++){
            if(this.state.itemList[i].status === "Completed"){
                let completedItem = document.getElementById(i).parentNode.parentNode;
                completedItem.style.display = "none";
            }else if(this.state.itemList[i].status === "Todo"){
                let completedItem = document.getElementById(i).parentNode.parentNode;
                completedItem.style.display = "";
            }
        }
    }
    showCompleted = () => {
        this.setState({ toShow: "Completed" });
        let len = this.state.itemList.length;
        for(let i = 0; i < len; i++){
            if(this.state.itemList[i].status === "Todo"){
                let completedItem = document.getElementById(i).parentNode.parentNode;
                completedItem.style.display = "none";
            }else if(this.state.itemList[i].status === "Completed"){
                let completedItem = document.getElementById(i).parentNode.parentNode;
                completedItem.style.display = "";
            }
        }
    }

    removeItem = (e) => {
        if(e.target.parentNode.firstChild.firstChild.checked === true){
            this.setState({ completedCount: this.state.completedCount - 1 });
        }else{
            this.setState({ todoCount: this.state.todoCount - 1 });
        }
        let index = parseInt(e.target.parentNode.firstChild.firstChild.id);
        this.setState({ itemList: [...this.state.itemList.slice(0, index),
            {...this.state.itemList[index], status:"Deleted"}, ...this.state.itemList.slice(index + 1)] });
        e.target.parentNode.remove();
        this.setState({ itemCount: this.state.itemCount - 1 });
    }

    doneTodo = (e) => {
        if(e.target.checked === true){
            e.target.parentNode.nextSibling.style="text-decoration: line-through; opacity: 0.5;";
            this.setState({ todoCount: this.state.todoCount - 1 });
            this.setState({ completedCount: this.state.completedCount + 1 });
            let index = parseInt(e.target.id);
            this.setState({ itemList: [...this.state.itemList.slice(0, index),
                {...this.state.itemList[index], status:"Completed"}, ...this.state.itemList.slice(index + 1)] });
        }else if(e.target.checked === false){
            e.target.parentNode.nextSibling.style="text-decoration: none; opacity: 1;";
            this.setState({ todoCount: this.state.todoCount + 1 });
            this.setState({ completedCount: this.state.completedCount - 1 });
            let index = parseInt(e.target.id);
            this.setState({ itemList: [...this.state.itemList.slice(0, index),
                {...this.state.itemList[index], status:"Todo"}, ...this.state.itemList.slice(index + 1)] });
        }
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            this.setState({ itemList: [...this.state.itemList, {value: e.target.value, status:"Todo"}] });
            this.setState({ itemCount: this.state.itemCount + 1 });
            this.setState({ todoCount: this.state.todoCount + 1 });
            this.setState({ idCount: this.state.idCount + 1 });
            e.target.value = "";
        }
    }

    render() { 
        console.log(this.state.itemList);
        console.log(this.state.todoCount);
        return (
            <div id="root_2" className="todo-app__root">
                <header className="todo-app__header">
                    <h1 className="todo-app__title">todos</h1>
                </header>
                <Main itemList={this.state.itemList} doneTodo={this.doneTodo} handleKeyDown={this.handleKeyDown} removeItem={this.removeItem}
                    toShow={this.state.toShow}/>
                <Footer itemCount={this.state.itemCount} todoCount={this.state.todoCount} completedCount={this.state.completedCount}
                    clearCompleted={this.clearCompleted} showAll={this.showAll} showActive={this.showActive} showCompleted={this.showCompleted}/>
            </div>
        );
    }
}

export default Starter;