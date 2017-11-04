var googleMapsApiKey = "AIzaSyAfSkp02Oolofi2mSnRYBJBNDI6nL--WyM";
var resasApiKey = "enEaijBPxOMF1ipXMXiKaey1nZwPpDpxEm4J1IsY";
var src = "https://maps.googleapis.com/maps/api/js?key=" + googleMapsApiKey + "&callback=initMap";
var sc = document.createElement('script');
sc.src = src; //関数などで処理したものでもOK
document.body.appendChild(sc);

function initMap() {

  // trueになると1回クリックしたこととなる
  var count = false;
  // マップの生成
  var map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(39.7018784, 141.1363000), // マップの中心
    zoom: 12 // ズームレベル
  });

  var d = new google.maps.DirectionsService(); // ルート検索オブジェクト
  var r = new google.maps.DirectionsRenderer({ // ルート描画オブジェクト
    map: map, // 描画先の地図
    preserveViewport: true, // 描画後に中心点をずらさない
  });

  // クリックイベントを追加
  map.addListener('click', function(e) {
    // document.getElementById('pos').textContent = position;
    var position1, position2, position3, position4;
    getClickLatLng(e.latLng, map);
    if (count == false) {
      position1 = e.latLng.lat(); // startの緯度
      position2 = e.latLng.lng(); // startの経度
      localStorage.setItem('Key1', position1);
      localStorage.setItem('Key2', position2);
      count = true;
    } else if (count == true) {
      position3 = e.latLng.lat(); // goalの緯度
      position4 = e.latLng.lng(); // goalの緯度

      localStorage.setItem('Key3', position3);
      localStorage.setItem('Key4', position4);
      // localStorage.saveKey = position1;
      // localStorage.saveKey = position2;
      // localStorage.saveKey = position3;
      // localStorage.saveKey = position4;
      window.location.href = 'root.html';
       count = false;
    }
  });
}

function getClickLatLng(lat_lng, map) {

  // 座標を表示
  document.getElementById('lat').textContent = lat_lng.lat();
  document.getElementById('lng').textContent = lat_lng.lng();

  // マーカーを設置
  var marker = new google.maps.Marker({
    position: lat_lng,
    map: map
  });


  // 座標の中心をずらす
  // http://syncer.jp/google-maps-javascript-api-matome/map/method/panTo/
  // map.panTo(lat_lng);
}
