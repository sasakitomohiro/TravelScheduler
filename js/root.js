function initMap() {
    // ルート検索の条件
    let position1 = localStorage.getItem('Key1');
    let position2 = localStorage.getItem('Key2');
    let position3 = localStorage.getItem('Key3');
    let position4 = localStorage.getItem('Key4');

    // console.log(position1);
    // console.log(position2);
    // console.log(position3);
    // console.log(position4);


    var request = {
        origin: new google.maps.LatLng(position1, position2), // 出発地
        destination: new google.maps.LatLng(position3, position4), // 目的地
        waypoints: [ // 経由地点(指定なしでも可)
        ],
        travelMode: google.maps.DirectionsTravelMode.WALKING, // 交通手段(歩行。DRIVINGの場合は車)
    };

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
    // ルート検索
    d.route(request, function(result, status){
        // OKの場合ルート描画
        if (status == google.maps.DirectionsStatus.OK) {
            r.setDirections(result);
        }
    });
}
