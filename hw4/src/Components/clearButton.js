import "../index.css";

import React, {Fragment} from "react";

function Clear_Button(props) {
    function renderElement(){
        if(props.completedCount !== 0){
            return(
                <button style={{visibility: "visible"}} onClick={props.clearCompleted}>Clear completed</button>
            );
        }else{
            return(
                <button style={{visibility: "hidden"}} onClick={props.clearCompleted}>Clear completed</button>
            );
        }
    }

    return(
        <div className="todo-app__clean">
            {renderElement()}
        </div>
    );
}

export default Clear_Button;



// class Clear_Button extends React.Component {
//     renderElement(){
//         console.log(this.props.completedCount);
//         if(this.props.completedCount !== 0){
//             return(
//                 <button style={{visibility: "visible"}}>Clear completed</button>
//             );
//         }else if(this.props.completedCount === 0){
//             return(
//                 <button style={{visibility: "hidden"}}>Clear completed</button>
//             );
//         }
//     }
    
//     render() { 
//         return(
//             <div className="todo-app__clean">
//                 {this.renderElement}
//             </div>
//         );
//     }
// }

// export default Clear_Button;