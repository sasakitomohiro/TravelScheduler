var vm = new Vue({
  el: "#app", // Vue.jsを使うタグのIDを指定
  data: {
    // Vue.jsで使う変数はここに記述する
    name
  },
  methods: {
    // Vue.jsで使う関数はここで記述する

  },
  created: function() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    fetch(url + "/api/v1/tourism/attractions?prefCode=3&cityCode=-" , { //クエリストリング
      method: "GET",
      headers: {"X-API-KEY": qCZs5hGw3zFzzDwyxveXjMDRhBWHCS77DARwsKLt
}
    })
    .then(function(response) {
      if (response.status == 200) { //成功時
        return response.json();
      }
      // 200番以外のレスポンスはエラーを投げる
      return response.json().then(function(json) {
        throw new Error(json.message); //どういうエラーかわかる？
      });
    })
    .then(function(json) {
      // レスポンスが200番で返ってきたときの処理はここに記述する
      // console.log(JSON.stringify(json.posts));
      console.log(JSON.stringify(json.result.data));
      // vm.boards = json.posts;
      vm.name = json.result.data;
      // console.log(vm.boards);
    })
    .catch(function(err) {
      // レスポンスがエラーで返ってきたときの処理はここに記述する
      console.log(err);
      console.log("失敗しました");
    });
  },
  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    returnName: function() {
      var array = [];
      // console.log("aaaa");
      for(var i = 0; i < this.name.length; i++) {
        array[i] = this.name[i].resourceName;
        console.log(array[i]);
      }
      return array;
    }
  }
});
