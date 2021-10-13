let album1 = [
    "https://resources.matcha-jp.com/resize/720x2000/2020/11/17-109448.jpeg",
    "https://www.fotobeginner.com/wp-content/uploads/2015/02/landscape-photography-christian-richter-fb.jpg",
    "http://wportfolio.wzu.edu.tw/blog/attach/23/55023/24/bf_94793_1303482_98970_3.jpg",
    "https://www.erv-nsa.gov.tw/social-article/546",
    "https://image.cache.storm.mg/styles/smg-800x533-fp/s3/media/image/2020/11/07/20201107-092915_U13380_M651499_4ac4.jpg?itok=6KFZde7p",
    "https://icrvb3jy.xinmedia.com/solomo/article/142806/B10C3CF6-F3DB-6508-985E-DFD779D689EF.jpeg",
    "https://tw.pixtastock.com/blog/wp-content/uploads/2015/04/96",
    "https://i0.wp.com/www.tripresso.com/blog/wp-content/uploads/2021/02/7.jpeg?resize=640%2C360",
    "https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_680/fl_lossy.progressive,q_85/c_fill,w_680/blogtw/%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7-2017-01-20-%E4%B8%8B%E5%8D%884.30.59.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAqiJzB05hGdx9BmHsf_FJjre32yaH6h1q0A&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuRMdvdw36GSLq0T-CVqj_RL9CUJ4J4HyZpg&usqp=CAU"
]
album1["Name"] = "album1";

let album2 = [
    "images/idontknow.jpeg",
    "images/nochance.jpg",
    "images/sopoor.jpg",
    "images/waitttt.jpg",
    "images/what.jpg",
    "images/duck.jpg",
    "images/nice.jpeg",
    "images/oh.jpg"
]
album2["Name"] = "album2";

let album3 = [
    "https://obs.line-scdn.net/0h3wqvvei_bFhMD3rZLa8TD3ZZbzd_Y39bKDk9Ww9hMm9gaywJIj4kbm8HNz81bSsGIjkqP2gMd2k1PCgGcj0l/w644",
    "https://img.toy-people.com/member/161323534188.png",
    "https://pic2.zhimg.com/v2-d9fb81b5ab9493527b0aff09c2283973_1440w.jpg?source=172ae18b",
    "https://img.league-funny.com/imgur/160853369953_n.jpg",
    "https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2020/10/27/1/8845618.png&s=Y&x=36&y=0&sw=1906&sh=1271&sl=W&fw=1200",
    "https://bnextmedia.s3.hicloud.net.tw/image/album/2021-03/img-1617178718-87439@900.jpg",
    "https://img.league-funny.com/imgur/160344140393_n.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGtF9JwO0F854RVJmsj5oHNbmAAr94NaFRV8XYWAnmTCkSzFiYY2RJWnPna1pm27CvYgE&usqp=CAU"
]
album3["Name"] = "album3";
let album4 = []
album4["Name"] = "album4";

let displayImg = document.getElementById("largerPic");

let picArray = [];
function setImg(temp, id){
    displayImg.src = temp;
    
    if(picArray.length !== 0){
        let prevImg = document.getElementById(picArray[0]);
        prevImg.classList.remove("selectedPic");
        picArray.shift();
    }
    let selected = document.getElementById(id);
    picArray.push(id);
    selected.classList.add("selectedPic");
}

function clearImg(){
    displayImg.src = "";
}

let albArray = [];
function setAlbum(album, id){
    let len = album.length;
    if(len === 0){
        alert("This album is empty!");
        if(albArray.length !== 0){
            let prevAlb = document.getElementById(albArray[0]);
            prevAlb.classList.remove("selectedAlbum");
            albArray.shift();
        }
        let selected = document.getElementById(id);
        albArray.push(id);
        selected.classList.add("selectedAlbum");
        deleteChild();
        clearImg();
    }
    else{
        deleteChild();
        for(var i = 0; i < len; i++){
            add_img(album[i], i);
        }
        setImg(album[0], "smallerPic0");

        if(albArray.length !== 0){
            let prevAlb = document.getElementById(albArray[0]);
            prevAlb.classList.remove("selectedAlbum");
            albArray.shift();
        }
        let selected = document.getElementById(id);
        albArray.push(id);
        selected.classList.add("selectedAlbum");
    }
}

function add_img(target, index) { 
	var img = document.createElement('img'); 
    img.src = target;
    img.classList.add("smallerPic");
    img.id = "smallerPic" + index;
    img.onclick = function() {setImg(this.src,this.id);};
	document.getElementById('smallContainer').appendChild(img);
}

function deleteChild() { 
    let e = document.getElementById('smallContainer'); 
    
    let child = e.lastElementChild;  
    while (child) { 
        e.removeChild(child); 
        child = e.lastElementChild; 
    } 
} 

function add_new_img(){
    let newURL = prompt("What is the path of the new photo?")

    if(album1.Name === albArray[0]){
        add_img(newURL, album1.length);
        setImg(newURL, "smallerPic" + album1.length);
        album1.push(newURL);
    }
    else if(album2.Name === albArray[0]){
        add_img(newURL, album2.length);
        setImg(newURL, "smallerPic" + album2.length);
        album2.push(newURL);
    }
    else if(album3.Name === albArray[0]){
        add_img(newURL, album3.length);
        setImg(newURL, "smallerPic" + album3.length);
        album3.push(newURL);
    }
    else if(album4.Name === albArray[0]){
        add_img(newURL, album4.length);
        setImg(newURL, "smallerPic" + album4.length);
        album4.push(newURL);
    }
}

setAlbum(album1, "album1");