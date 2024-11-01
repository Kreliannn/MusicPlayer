let get = (id) => document.getElementById(id);

let audio = get("audio");

let page1 = get("page1");
let page2 = get("page2");

let allSongs = get("songContainer");

let musicBottom = get("musicBottom");
let back = get("back");

let left = get("left");
let center = get("center");
let right = get("right");

let bottomPause = get("bpause");

let index;

let body = document.body;

//display
displaySongs();
bgGenerator();


function displaySongs()
{
  let selectedSong = Song;
  for(i = 0; i < Song.length; i++)
  {
    allSongs.innerHTML += `
      <div class="songs" id="songs">
        <div class="songImg">
          <img src="${selectedSong[i].img}">
        </div>
        <div class="songName">
       <h2 id="title">${selectedSong[i].title}</h2>
          <p>by ${selectedSong[i].author}</p>
        </div>
        <div class="dot">
          <img src="imgWebsite/dot.png">
        </div>
      </div>
   `
  }
  
}

let child = allSongs.getElementsByClassName("songs");
let lastSong = 0;
allSongs.addEventListener("click",(event)=>{
    let target = event.target;
    
    

    while (target && !target.classList.contains('songs')) 
    {
      target = target.parentElement;
    }

   if (target && target.classList.contains('songs'))
   {
    const indexNum = Array.prototype.indexOf.call(child, target);
   
    lastSong = indexNum;
    
    setTimeout(()=>{
      
      setPage2();
      setInfo(indexNum);
      playSong();
      Circle();
      
    },300)
    
   }
   
})






function setPage2()
{
    page2.style.zIndex = 1;
    musicBottom.style.display = "grid";
    page1.style.height = "100dvh";
}

function setInfo(i)
{
  index = i;
  
  let img = get("p2Img");
  let title = get("p2Title");
  let author = get("p2Author");
  
  let bImg = get("bImg");
  let bTitle = get("bTitle");
  let bAuthor = get("bAuthor");
 
  img.src = Song[index].img;
  title.innerHTML = Song[index].title;
  author.innerHTML = Song[index].author;
  audio.src = Song[index].audio;
  
  bImg.src = Song[index].img;
  bTitle.innerHTML = Song[index].title;
  bAuthor.innerHTML = Song[index].author;
}

function playSong()
{
  audio.play();
}

let duration;

function Circle()
{
  let element = document.getElementById("circle");
 
  setTimeout(()=>{
    duration = audio.duration;
    element.style.animationDuration = duration+"s";
    setTimer();
    kaltas = 0;
     //add and remove circle
    element.classList.remove("circle");
    void element.offsetWidth;
    element.classList.add("circle");
  },100)
  

}

function setTimer()
{
  let num2 = get("num2");
  let time;
  let duration = parseInt(audio.duration);
 
  if(duration >= 360){
    if(duration-360< 10)time = `6:0${duration- 360}`;
    else time = `6:${duration- 360}`
  }else if(duration >= 300){
    if(duration-300<10) time = `5:0${duration- 300}`;
    else time = `5:${duration- 300}`
  }else if(duration >= 240){
    if(duration-240< 10)time = `6:0${duration- 240}`;
    else time = `4:${duration- 240}`
  }else if(audio.duration >= 180){
    if(duration-180<10) time = `3:0${duration- 180}`;
    else time = `3:${duration- 180}`
  }else if (duration >= 120) {
    if(duration-120<10) time = `2:0${duration- 120}`;
    else time = `2:${duration- 120}`
  }else if (duration >= 60) {
    time = `1:${duration-60}`;
  }
  
  num2.innerHTML = time;
  
}


 
let kaltas = 0;
audio.addEventListener('timeupdate', ()=>{
  
  let num1 = get("num1");
  let duration = parseInt(audio.currentTime.toFixed(2)-kaltas);
  let time;
  
  if(duration < 60){
    if(duration < 10)time = `0:0${duration}`
    else time = `0:${duration}`
  }else if(duration < 120){
    if(duration-60 < 10)time = `1:0${duration-60}`
    else time = `1:${duration-60}`
  }else if(duration < 180){
    if(duration-120 < 10)time = `2:0${duration-120}`
    else time = `2:${duration-120}`
  }else if(duration < 240){
    if(duration-180 < 10)time = `3:0${duration-180}`
    else time = `3:${duration-180}`
  }else if(duration < 300){
    if(duration-240 < 10)time = `4:0${duration-240}`
    else time = `4:${duration-240}`
  }else if(duration < 360){
    if(duration-300 < 10)time = `5:0${duration-300}`
    else time = `5:${duration-300}`
  }
  
  num1.innerHTML = time;
  
})


circle.addEventListener("animationend",()=>{
  nextSong();
})



back.addEventListener("click",()=>{
  page2.style.zIndex = 0;
  //page1.style.height = "170dvh"
  bgGenerator();
})

left.addEventListener("click",()=>{
  index--;
  if(index < 0) index = Song.length-1;
  let updatedIndex = index;
  setInfo(updatedIndex);
  playSong();
  Circle();
})



center.addEventListener("click",()=>{
  pauseBtn()
})

bottomPause.addEventListener("click", () => {
  pauseBtn();
})

let pauseImg = true;

function pauseBtn()
{
  if(pauseImg)
  {
    center.src = "imgWebsite/resume.png";
    bottomPause.src = "imgWebsite/resume.png";
    pauseImg = false;
    audio.pause();
  }
  else 
  {
    center.src = "imgWebsite/pause.png";
    bottomPause.src = "imgWebsite/pause.png";
    pauseImg = true;
    audio.play();
  }
  circle.classList.remove('animate')
}


right.addEventListener("click", () => {
  index++;
  if(index >= Song.length) index = 0;
  let updatedIndex = index;
  setInfo(updatedIndex);
  playSong();
  Circle();
})

function nextSong()
{
  index ++;
  if(index >= Song.length) index = 0;
  let updatedIndex = index;
  setInfo(updatedIndex);
  playSong();
  Circle();
}


musicBottom.addEventListener("click",()=>{
  
  page2.style.zIndex = 1;
  page1.style.height = "100dvh"
  
})


function bgGenerator()
{
  let BG = get("songContainer");
  let P = get("page1");
  let bgSize = 50;
  
  for(i = 1; i < Song.length; i++){bgSize += 10;}
  
  BG.style.height = bgSize + "dvh";
  P.style.height = bgSize + "dvh";
}