
let displayImg = document.getElementById("largerPic");

let theArray = [];

function setImg(temp, id){
    displayImg.src = temp;
    let selected = document.getElementById(id);
    
    if(theArray.length !== 0){
        let prevImg = document.getElementById(theArray[0]);
        prevImg.classList.add("smallerPic");
        prevImg.classList.remove("selectedPic");
        theArray.shift();
    }
    theArray.push(id);
    selected.classList.add("selectedPic");
    selected.classList.remove("smallerPic");
}

setImg("images/idontknow.jpeg","one");