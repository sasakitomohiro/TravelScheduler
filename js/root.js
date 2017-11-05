var src = "https://maps.googleapis.com/maps/api/js?key=" + googleMapsApiKey + "&callback=initMap";
var sc = document.createElement('script');

var m = 0; //秒数（時間の加算で使用）

sc.src = src; //関数などで処理したものでもOK
document.body.appendChild(sc);

$('#timepicker1').timepicker();  // timePicker

let items = JSON.parse(localStorage.getItem('Items'));

function initMap() {
  // ルート検索の条件
  var position1 = localStorage.getItem('Key1');
  var position2 = localStorage.getItem('Key2');
  var position3 = localStorage.getItem('Key3');
  var position4 = localStorage.getItem('Key4');



  // console.log(items);

  m = 0; //秒数

  var waypoint = [
    // {
    //   location: new google.maps.LatLng(39.7018784, 141.1363000)
    // }
  ];

  var way = JSON.parse(localStorage.getItem("waypoint1"));

  if(way) {
    waypoint.push({location: new google.maps.LatLng(way.lat,way.lng)});
    console.log(way.lat,way.lng);
    localStorage.removeItem("waypoint1");
  }

  // waypoint.push({
  //   location: new google.maps.LatLng(39.7018784, 141.1363000)
  // })

  var request = {
    origin: new google.maps.LatLng(position1, position2), // 出発地
    destination: new google.maps.LatLng(position3, position4), // 目的地
    waypoints: waypoint,
    travelMode: google.maps.DirectionsTravelMode.DRIVING, // 交通手段(歩行。DRIVINGの場合は車)
  };

  // request.waypoints = "location:" + new google.maps.LatLng(39.7018784, 141.1363000);
  // マップの生成
  var map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(39.7018784, 141.1363000), // マップの中心
    zoom: 12 // ズームレベル
  });
  var marker = [];
  // ResasAPIを参照
  for(var i in items) {
    // console.log(items[i].lat);
    marker[i] = new google.maps.Marker({
      position: new google.maps.LatLng(items[i].lat, items[i].lng),
      map: map
    });
    //クリックしたら指定したurlに遷移するイベント
    marker[i].addListener('click', (function(argument){
      // return function(){ location.href = url; };


      localStorage.setItem('waypoint1', JSON.stringify(items[i]));

      console.log(localStorage.getItem("waypoint1"));

      window.location.href = 'root.html';
    }));
  }

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
        document.getElementById('value').textContent = route.legs[i].distance.value / 1000; //メートル単位の距離
        route.legs[i].duration.text;  //所要時間の文字列
        document.getElementById('time').textContent = Math.ceil((route.legs[i].duration.value) / 60); //分単位の所要時間
        m = route.legs[i].duration.value;　//秒単位の所要時間
      }
    }
  });
}

// 時間の加算結果を表示
function getValue(idname){
  // value値を取得する
  var result = document.getElementById(idname).value;
  // var array = result.match(/[0-9]+\.?[0-9]*/g);
  var str = result.slice(0, 4);
  // for(var i = 0; i < array.length; i++) {
  //     str += array[i];
  // }
  str += ":00";
  // console.log(str);
  // console.log(result);
  let addTime = timeMath.toTimeFormat(m);
  let resultSum = timeMath.sum(str, addTime);
  // console.log(resultSum);
  // // Alertで表示する
  alert("最終目的地到着時間は「" + resultSum + "」です");
}

// 時間の計算
var timeMath = {
    // 加算
    sum : function() {
        var result, times, second, i,
            len = arguments.length;

        if (len === 0) return;

        for (i = 0; i < len; i++) {
            if (!arguments[i] || !arguments[i].match(/^[0-9]+:[0-9]{2}:[0-9]{2}$/)) continue;

            times = arguments[i].split(':');

            second = this.toSecond(times[0], times[1], times[2]);

            if ((!second && second !== 0)) continue;

            if (i === 0) {
                result = second;
            } else {
                result += second;
            }
        }

        return this.toTimeFormat(result);
    },

    // 減算
    sub : function() {
        var result, times, second, i,
            len = arguments.length;

        if (len === 0) return;

        for (i = 0; i < len; i++) {
            if (!arguments[i] || !arguments[i].match(/^[0-9]+:[0-9]{2}:[0-9]{2}$/)) continue;

            times = arguments[i].split(':');

            second = this.toSecond(times[0], times[1], times[2]);

            if (!second) continue;

            if (i === 0) {
                result = second;
            } else {
                result -= second;
            }
        }

        return this.toTimeFormat(result);
    },

    // 乗算
    multiply : function() {
        var result, times, second, i,
            len = arguments.length;

        if (len === 0) return;

        for (i = 0; i < len; i++) {
            if (!arguments[i] || !arguments[i].match(/^[0-9]+:[0-9]{2}:[0-9]{2}$/)) continue;

            times = arguments[i].split(':');

            second = this.toSecond(times[0], times[1], times[2]);

            if (!second) continue;

            if (i === 0) {
                result = second;
            } else {
                result *= second;
            }
        }

        return this.toTimeFormat(result);
    },

    // 除算
    division : function() {
        var result, times, second, i,
            len = arguments.length;

        if (len === 0) return;

        for (i = 0; i < len; i++) {
            if (!arguments[i] || !arguments[i].match(/^[0-9]+:[0-9]{2}:[0-9]{2}$/)) continue;

            times = arguments[i].split(':');

            second = this.toSecond(times[0], times[1], times[2]);

            if (!second) continue;

            if (i === 0) {
                result = second;
            } else {
                result /= second;
            }
        }

        return this.toTimeFormat(result);
    },

    // 時間を秒に変換
    toSecond : function(hour, minute, second) {
        if ((!hour && hour !== 0) || (!minute && minute !== 0) || (!second && second !== 0) ||
            hour === null || minute === null || second === null ||
            typeof hour === 'boolean' ||
            typeof minute === 'boolean' ||
            typeof second === 'boolean' ||
            typeof Number(hour) === 'NaN' ||
            typeof Number(minute) === 'NaN' ||
            typeof Number(second) === 'NaN') return;

        return (Number(hour) * 60 * 60) + (Number(minute) * 60) + Number(second);
    },

    // 秒を時間（hh:mm:ss）のフォーマットに変換
    toTimeFormat : function(fullSecond) {
        var hour, minute, second;

        if ((!fullSecond && fullSecond !== 0) || !String(fullSecond).match(/^[\-0-9][0-9]*?$/)) return;

        var paddingZero = function(n) {
            return (n < 10)  ? '0' + n : n;
        };

        hour   = Math.floor(Math.abs(fullSecond) / 3600);
        minute = Math.floor(Math.abs(fullSecond) % 3600 / 60);
        second = Math.floor(Math.abs(fullSecond) % 60);

        minute = paddingZero(minute);
        second = paddingZero(second);

        return ((fullSecond < 0) ? '-' : '') + hour + ':' + minute + ':' + second;
    }
};
