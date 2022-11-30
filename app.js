const app = () => {
    //Get default settings in the even the Play button is clicked first
    const video = document.querySelector(".vid-container video");
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const timeDisplay = document.querySelector(".time-display");
    let meditationDuration = 180; //Set an initial duration

    //Retrieve all the Sounds in the application
    const sounds = document.querySelectorAll(".sound-picker button");
 
    //Define what happens when a sound is clicked
    sounds.forEach(sound => {
        sound.addEventListener("click", function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlayingSong(song);
        }); 
    });
 
    //Retrieve all the Time options in the application
    const timeSelect = document.querySelectorAll(".time-select button");
 
    //Define what happens when a time button is clicked
    timeSelect.forEach(option => {
        option.addEventListener("click", function (){
            meditationDuration=this.getAttribute("data-time");
            timeDisplay.textContent=`${Math.floor(meditationDuration / 60)}:${Math.floor(meditationDuration % 60)}`;
        });
    });

    //Get the length of the outline
    const outline = document.querySelector(".moving-outline circle");
    const outlineLength = outline.getTotalLength();
    //Set the initial visibilty of the blue overlay to be hidden (or zero)
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //Define what happens when the Play button is clicked
    play.addEventListener("click", ()=>{
        checkPlayingSong(song);
    });

    //Create a function to stop and play the sounds
    const checkPlayingSong = function(song) {
        if(song.paused) {
            song.play();
            video.play();
            play.src = "./svg/pause.svg";
        } else {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
        };
    };

    //Animate the circle. The 'ontimeupdate' event occurs when the playing position of an audio/video has changed
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = meditationDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // Animate the circle 
        let progress = outlineLength - (currentTime / meditationDuration) * outlineLength;
        outline.style.strokeDashoffset = progress; 
        
        //animate the text
        timeDisplay.textContent = seconds>=10 ? `${minutes}:${seconds}` : `${minutes}:0${seconds}`;

        //prevent the time from going beyond 0 and into the negative
        if(currentTime >= meditationDuration) {
            song.pause();
            song.currentTime = 0;
            video.pause();
            play.src = "./svg/play.svg";
        };
    };
};

app();