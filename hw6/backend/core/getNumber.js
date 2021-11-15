/*my turn*/

var num = 0;

const genNumber = () => {
    num = Math.floor(Math.random() * 100);
    console.log('generate ', num);
}

const getNumber = () => {
    console.log('get', num);
    return num;
}

export {genNumber, getNumber};

/*my turn*/