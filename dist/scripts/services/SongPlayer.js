(function() {
  function SongPlayer($rootScope, Fixtures) {
    var SongPlayer = {};
    /**
     * @desc current Album from Fixture.js using AlbumCtrl
     * @type {Object}
     */
    var currentAlbum = Fixtures.getAlbum();
    /**
     * @function getSongIndex
     * @desc get index of a song in current Album
     * @param {Object} song
     */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };
    /**
     * @desc Active song object from list of songs
     * @type {Object}
     */
    SongPlayer.currentSong = null; //bind to SongPlayer so that it can be accessed publically
    /**
     * @desc Current playback time (in seconds) of currently playing song
     * @type {Number}
     */
    SongPlayer.currentTime = null;
    /**
     * @desc Current volume level
     * @type {Number}
     */
    SongPlayer.volume = null;
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
      //Update time with Buzz library event by apply the fuction to rootScope so that song can be updated anytime
      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });
      //Update volume with Buzz library event by apply the fuction to rootScope so that volume will stay at current even when changing song
      // currentBuzzObject.bind('volumeupdate', function() {
      //   $rootScope.$apply(function() {
      //     SongPlayer.volume = currentBuzzObject.getVolume();
      //   });
      // });

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
      /**
       * @function stopSong
       * @desc stop current audio file as currentBuzzObject and update icon to 'Play'
       */
    var stopSong = function() {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
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
    /**
     * @function previous
     * @desc play previous song
     */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong); //Get the index of current song before clicking previous song
      currentSongIndex--; //Then change currentSongIndex to index-1
      if (currentSongIndex < 0) {
        stopSong();
      }
      else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };
    /**
     * @function next
     * @desc play next song
     */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong); //Get the index of current song before clicking next song
      currentSongIndex++; //Then change currentSongIndex to index+1
      if (currentSongIndex > currentAlbum.songs.length - 1) {
        stopSong();
      }
      else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };
    /**
     * @function setCurrentTime
     * @desc Set current time (in seconds) of currently playing song
     * @param {Number} time
     */
    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time); //setTime is Buzz library method, set the playback position in seconds
      }
    };
    /**
     * @function setVolume
     * @desc Set current time (in seconds) of currently playing song
     * @param {Number} level
     */
    SongPlayer.setVolume = function(level) {
      if (currentBuzzObject) {
        currentBuzzObject.setVolume(level);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
