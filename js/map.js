function initMap() {

  // ルート検索の条件
  // var request = {
  //   origin: new google.maps.LatLng(35.681382,139.766084), // 出発地
  //   destination: new google.maps.LatLng(34.73348,135.500109), // 目的地
  //   waypoints: [ // 経由地点(指定なしでも可)
  //     { location: new google.maps.LatLng(35.630152,139.74044) },
  //     { location: new google.maps.LatLng(35.507456,139.617585) },
  //     { location: new google.maps.LatLng(35.25642,139.154904) },
  //     { location: new google.maps.LatLng(35.103217,139.07776) },
  //     { location: new google.maps.LatLng(35.127152,138.910627) },
  //     { location: new google.maps.LatLng(35.142365,138.663199) },
  //     { location: new google.maps.LatLng(34.97171,138.38884) },
  //     { location: new google.maps.LatLng(34.769758,138.014928) },
  //   ],
  //   travelMode: google.maps.DirectionsTravelMode.WALKING, // 交通手段(歩行。DRIVINGの場合は車)
  // };
  var position = [];
  // マップの生成
  var map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(39.7018784, 141.1363000), // マップの中心
    zoom: 15 // ズームレベル
  });

  var d = new google.maps.DirectionsService(); // ルート検索オブジェクト
  var r = new google.maps.DirectionsRenderer({ // ルート描画オブジェクト
    map: map, // 描画先の地図
    preserveViewport: true, // 描画後に中心点をずらさない
  });
  // ルート検索
  // d.route(request, function(result, status){
  //   // OKの場合ルート描画
  //   if (status == google.maps.DirectionsStatus.OK) {
  //     r.setDirections(result);
  //   }
  // });
  // クリックイベントを追加
  map.addListener('click', function(e) {
    position += e.latLng;
    document.getElementById('pos').textContent = position;
    getClickLatLng(e.latLng, map);
  });
}
function getClickLatLng(lat_lng, map) {

  // 座標を表示
  document.getElementById('lat').textContent = lat_lng.lat();
  document.getElementById('lng').textContent = lat_lng.lng();
  // document.getElementById('position').textContent = position;
  // マーカーを設置
  var marker = new google.maps.Marker({
    position: lat_lng,
    map: map
  });


  // 座標の中心をずらす
  // http://syncer.jp/google-maps-javascript-api-matome/map/method/panTo/
  // map.panTo(lat_lng);
}
