 (function() {
   function AlbumCtrl(Fixtures) {
     this.albumData = [];
     for (var i = 0; i < 5; i++) {
       this.albumData = Fixtures.getAlbum();
     }
   }

   angular
     .module('blocJams')
     .controller('AlbumCtrl',['Fixtures', AlbumCtrl]);
 })();
 