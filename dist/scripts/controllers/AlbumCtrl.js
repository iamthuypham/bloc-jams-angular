 (function() {
   function AlbumCtrl() {
     this.albumDatas = [];
     for (var i = 0; i < 5; i++) {
       this.albumDatas.push(angular.copy(albumPicasso));
     }
   }

   angular
     .module('blocJams')
     .controller('AlbumCtrl', AlbumCtrl);
 })();
 