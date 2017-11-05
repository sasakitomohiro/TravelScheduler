var src = "https://maps.googleapis.com/maps/api/js?key=" + googleMapsApiKey + "&callback=initMap";
var sc = document.createElement('script');
sc.src = src; //関数などで処理したものでもOK
document.body.appendChild(sc);

var lat = 39.67231336658968;
var lng = 141.14032745361328;

var restaurant = [];
var latitude = [];
var longitude = [];
var latlng = [];

function restaurantVal(result) {
  for( var i in result.rest ) {
    restaurant[i] = result.rest[i].name;
    latitude[i] = result.rest[i].latitude;
    longitude[i] = result.rest[i].longitude;
    // latlng[i] = { lat: result.rest[i].latitude, lng: result.rest[i].longitude }

    localStorage.setItem('Restraunts', JSON.stringify(result.rest));
    // console.log(localStorage.getItem("Restraunts"));

  }
}

function getRestaurantVal() {
  return latitude;
}


function initMap() {
  (function(){

    var url = 'https://api.gnavi.co.jp/RestSearchAPI/20150630/?callback=?';
    var params = {
      keyid: gurunaviApiKey,
      format: 'json',
      latitude: lat,
      longitude: lng,
      range: 1
    };

    var showResult = function(result){
      if ( result.total_hit_count > 0 ) {
        var res = '';
        alert( result.total_hit_count + '件の結果が見つかりました。\n' );
        for ( var i in result.rest ){
          res += result.rest[i].id + ' ' + result.rest[i].name + ' ' + result.rest[i].access.line + ' ' + result.rest[i].access.station + ' ' + result.rest[i].access.walk + '分\n';
        }
        // alert(res);
      } else {
        // alert( '検索結果が見つかりませんでした。' );
      }
    }

    $.getJSON(url, params, function(result){
      restaurantVal(result);
      showResult(result);
    });
  })(jQuery);

  // console.log(restaurant, latlng);

  // var lat = 39.67231336658968;
  // var lng = 141.14032745361328;

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
  // trueになると1回クリックしたこととなる
  var count = false;
  // マップの生成
  var map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(39.67231336658968, 141.14032745361328), // マップの中心
    zoom: 15 // ズームレベル
  });

  var d = new google.maps.DirectionsService(); // ルート検索オブジェクト
  var r = new google.maps.DirectionsRenderer({ // ルート描画オブジェクト
    map: map, // 描画先の地図
    preserveViewport: true, // 描画後に中心点をずらさない
  });

  // console.log(latitude, longitude);
  var b = getRestaurantVal();
  // console.log(restaurant);
  // console.log(b);
  // console.log(latitude.length);
  // for (var i in latitude) {
  //   console.log(latitude[i]);
  // }
  var restraunts = JSON.parse(localStorage.getItem('Restraunts'));
  console.log(restraunts);
  var marker = [];
  for( var i in restraunts ) {
    // getClickLatLng((latitude,longitude))
    marker[i] = new google.maps.Marker({
      position: new google.maps.LatLng(restraunts[i].latitude, restraunts[i].longitude),
      map: map
    });
  }

  // ルート検索
  // d.route(request, function(result, status){
  //   // OKの場合ルート描画
  //   if (status == google.maps.DirectionsStatus.OK) {
  //     r.setDirections(result);
  //   }
  // });
  // クリックイベントを追加
  map.addListener('click', function(e) {
    // document.getElementById('pos').textContent = position;
    var position1, position2, position3, position4;
    getClickLatLng(e.latLng, map);
    // if (count == false) {
    //   position1 = e.latLng.lat();
    //   position2 = e.latLng.lng();
    //   localStorage.setItem('Key1', position1);
    //   localStorage.setItem('Key2', position2);
    //   count = true;
    // } else if (count == true) {
    //   position3 = e.latLng.lat();
    //   position4 = e.latLng.lng();
    //
    //   localStorage.setItem('Key3', position3);
    //   localStorage.setItem('Key4', position4);
    //   // localStorage.saveKey = position1;
    //   // localStorage.saveKey = position2;
    //   // localStorage.saveKey = position3;
    //   // localStorage.saveKey = position4;
    //   // window.location.href = 'root.html';
    //    count = false;
    // }
  });
}

// function getClickLatLng(lat_lng, map) {

  // 座標を表示
  // document.getElementById('lat').textContent = lat_lng.lat();
  // document.getElementById('lng').textContent = lat_lng.lng();
  // document.getElementById('position').textContent = position;
  // console.log(lat_lng);
  // マーカーを設置
  // var marker = new google.maps.Marker({
  //   position: lat_lng,
  //   map: map
  // });


  // 座標の中心をずらす
  // http://syncer.jp/google-maps-javascript-api-matome/map/method/panTo/
  // map.panTo(lat_lng);
// }
