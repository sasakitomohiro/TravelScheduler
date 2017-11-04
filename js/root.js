var src = "https://maps.googleapis.com/maps/api/js?key=" + googleMapsApiKey + "&callback=initMap";
var sc = document.createElement('script');
sc.src = src; //関数などで処理したものでもOK
document.body.appendChild(sc);

function initMap() {
  // ルート検索の条件
  let position1 = localStorage.getItem('Key1');
  let position2 = localStorage.getItem('Key2');
  let position3 = localStorage.getItem('Key3');
  let position4 = localStorage.getItem('Key4');


  var request = {
    origin: new google.maps.LatLng(position1, position2), // 出発地
    destination: new google.maps.LatLng(position3, position4), // 目的地
    waypoints: [ // 経由地点(指定なしでも可)
       { location: new google.maps.LatLng(39.630152,141.74044) },  // 例
    ],
    travelMode: google.maps.DirectionsTravelMode.DRIVING, // 交通手段(歩行。DRIVINGの場合は車)
  };

  // マップの生成
  var map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(39.7018784, 141.1363000), // マップの中心
    zoom: 12 // ズームレベル
  });

  var directionsService = new google.maps.DirectionsService(); // ルート検索オブジェクト
  var directionsDisplay = new google.maps.DirectionsRenderer({ // ルート描画オブジェクト
    map: map, // 描画先の地図
    preserveViewport: true, // 描画後に中心点をずらさない
  });
  // ルート検索
  directionsService.route(request, function(result, status){
    // OKの場合ルート描画
    if (status == google.maps.DirectionsStatus.OK) {

      directionsDisplay.setDirections(result);
      var currentDirections = directionsDisplay.getDirections();

      var route = currentDirections.routes[0];

      // 所要時間の計測
      for(var i = 0; i < route.legs.length; i++){

        //リクエストで指定されたUnitSystemを使用した、距離値の文字列表現
        route.legs[i].distance.text;
        document.getElementById('value').textContent = route.legs[i].distance.value; //メートル単位の距離
        route.legs[i].duration.text;  //所要時間の文字列
        document.getElementById('time').textContent = route.legs[i].duration.value; //秒単位の所要時間
      }
    }
  });
}
