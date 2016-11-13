(function() {
  function SongPlayer() {
    var SongPlayer = {};
    /**
     * @desc Active song object from list of songs
     * @type {Object}
     */
    SongPlayer.currentSong = null; //bind to SongPlayer so that it can be accessed publically
    /**
     * @desc Buzz object audio file
     * @type {Object}
     */
    var currentBuzzObject = null;
    /**
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
    var setSong = function(song) {
      if (currentBuzzObject) { //if current Buzz file is not null 
        //*Side-note: the current Buzz file could be null in case user just landed on Album page
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }
      //Then program updates currentSong by
      currentBuzzObject = new buzz.sound(song.audioUrl, { //Find the link to the clicked song
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song; //Finally, set the current song to the clicked song and play it
    };
    /**
     * @function playSong
     * @desc play current audio file as currentBuzzObject and update icon to 'Pause'
     */
    var playSong = function() {
      currentBuzzObject.play();
      SongPlayer.currentSong.playing = true;
    }

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      //For every click, program decides to play or stop a song
      if (SongPlayer.currentSong !== song) { //Case1: if the song was clicked is not the current playing song
        setSong(song); // Set state for the current and clicked song
        playSong(); //Play the clicked song
      }
      else if (SongPlayer.currentSong === song) { //Case2: if the song was clicked is the current playing song
        if (currentBuzzObject.isPaused()) {
          currentBuzzObject.play();
        }
      }
    };

    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };
    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
