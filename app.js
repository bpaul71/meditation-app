const app = () => {
    //Get default settings in the even the Play button is clicked first
    const video = document.querySelector(".vid-container video");
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const timeDisplay = document.querySelector(".time-display");
    let meditationDuration = 120; //Set an initial duration
    setTimeDisplay(meditationDuration);

    function setTimeDisplay(timeToDisplay){
        let seconds = Math.floor(timeToDisplay % 60);
        let minutes = Math.floor(timeToDisplay / 60);
        timeDisplay.textContent = seconds==0 ? `${minutes}:00` : seconds>=10 ? `${minutes}:${seconds}` : `${minutes}:0${seconds}`;
    }

    //Create a function to stop and play the sounds
    function checkPlayingSong(song){
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
 
    //Retrieve all the Time buttons in the application
    const timeSelect = document.querySelectorAll(".time-select button");
    let selectedTimeButton = timeSelect[0];
    setButtonProperties(selectedTimeButton);
 
    function setButtonProperties(timeSelectButton){
        selectedTimeButton.style.color = 'white';
        selectedTimeButton.style.background = 'none';
        selectedTimeButton = timeSelectButton;

        timeSelectButton.style.color = 'black';
        timeSelectButton.style.background = 'white';
    }

    //Define what happens when a time button is clicked
    timeSelect.forEach(timeSelectButton => {
        timeSelectButton.addEventListener("click", function (){
            meditationDuration=this.getAttribute("data-time");
            setTimeDisplay(meditationDuration);
            setButtonProperties(timeSelectButton);
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

    //Animate the circle. The 'ontimeupdate' event occurs when the playing position of an audio/video has changed
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;

        // Animate the circle 
        let progress = outlineLength - (currentTime / meditationDuration) * outlineLength;
        outline.style.strokeDashoffset = progress; 
        
        let elapsedTime = meditationDuration - currentTime;
        setTimeDisplay(elapsedTime);

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