 (function() {
   function SongPlayer() {
     var SongPlayer = {};

     var currentSong = null;
     var currentBuzzObject = null;

     SongPlayer.play = function(song) {
       //For every click, program decides to play or stop a song

       if (currentSong !== song) { //Case1: if the song was clicked is not the current playing song
         if (currentBuzzObject) { //if current Buzz file is not null 
           //*Side-note: the current Buzz file could be null in case user just landed on Album page
           currentBuzzObject.stop();
           currentSong.playing = null;
         }
         else if (currentSong === song) { //Case2: if the song was clicked is the current playing song
           if (currentBuzzObject.isPaused()) {
             currentBuzzObject.play();
           }
         }

         //Then program updates currentSong by
         currentBuzzObject = new buzz.sound(song.audioUrl, { //Find the link to the clicked song
           formats: ['mp3'],
           preload: true
         });
         currentSong = song; //Finally, set the current song to the clicked song and play it
         currentBuzzObject.play();
         song.playing = true;
       }
     };
     
     SongPlayer.pause = function(song) {
       currentBuzzObject.pause();
       song.playing = false;
     };
     return SongPlayer;
   }

   angular
     .module('blocJams')
     .factory('SongPlayer', SongPlayer);
 })();
 