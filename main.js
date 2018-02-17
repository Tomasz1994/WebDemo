   var isChrome = navigator.userAgent.indexOf('Chrome')!==-1 ? true: false,
        isFirefox = navigator.userAgent.indexOf('Firefox')!==-1 ? true: false,
        play = document.getElementById("play");
        playIcon = document.querySelector("#play > span");
        cancel = document.getElementById("cancel");
        content = document.getElementsByClassName('content');
        synth = window.speechSynthesis;
        utterance = new SpeechSynthesisUtterance();
        utterance.lang = 'pl';
        utterance.volume = 0.5;
        utterance.rate = 1;
        utterance.pitch = 1;
        playing = false;
        paused = false;
        sentencesArray = [];
        sentencesString = "";
        counter = 0;
        n = content.length;
    if (isChrome) {
        for (var i = 0; i < n; i++){
            sentencesArray = sentencesArray.concat(content[i].innerHTML.replace(/<{1}[^<>]{1,}>{1}/g," ").split(/[.!?:;]/g));
        }
        utterance.text = sentencesArray[counter];
    }
    if (isFirefox){
        for (var i = 0; i < n; i++){
            sentencesString = sentencesString.concat(content[i].innerHTML).replace(/<{1}[^<>]{1,}>{1}/g," ");
        }
        utterance.text = sentencesString;
    }
    play.addEventListener('click', playClickHandler);
    function playClickHandler(){
        if (!playing){
            synth.speak(utterance);
        }
        else {
            if (!paused){
                synth.pause();
                playIcon.classList.remove('glyphicon-pause')
                playIcon.classList.add('glyphicon-play');
                paused = true;
            }
            else{
                synth.resume();
                playIcon.classList.remove('glyphicon-play')
                playIcon.classList.add('glyphicon-pause');
                paused = false;
            }
        }
    };
    cancel.addEventListener('click', cancelClickHandler);
    function cancelClickHandler(){
        if (playing){
            counter = sentencesArray.length;
            playIcon.classList.remove('glyphicon-pause')
            playIcon.classList.add('glyphicon-play');
            synth.cancel();
            playing = false;
        }
    }
    utterance.onstart = function(){
        playIcon.classList.remove('glyphicon-play')
        playIcon.classList.add('glyphicon-pause');
        playing = true;
    }
    utterance.onend = function(){
        counter ++;
        playing = false;
        paused = false;
        if (counter < sentencesArray.length){
            utterance.text = sentencesArray[counter];
            synth.speak(utterance);
        }
        else {
            counter = 0;
            utterance.text = sentencesArray[counter];
            playIcon.classList.remove('glyphicon-pause')
            playIcon.classList.add('glyphicon-play');
        }
    }
    if (isFirefox){
        cancel.classList.add('disabled');
        cancel.removeEventListener('click', cancelClickHandler);
    }
    if (!isChrome && !isFirefox){
        cancel.classList.add('disabled');
        cancel.removeEventListener('click', cancelClickHandler);
        play.classList.add('disabled');
        play.removeEventListener('click', playClickHandler);
    }

