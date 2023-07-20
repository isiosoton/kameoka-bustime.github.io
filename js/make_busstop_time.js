const soudai_busspot_list = ["創価大東京富士美術館（正門）", "創価大学栄光門"];

// jsonファイルをダウンロードする関数
function downloadJson() {
  const request = new XMLHttpRequest();
  // request.open("GET", `https://api.odpt.org/api/v4/odpt:BusTimetable?odpt:operator=odpt.Operator:NishiTokyoBus&acl:consumerKey=${API_Key}`, true);
  request.responseType = "blob";
  request.onload = function () {
    // レスポンスが帰ってきたら実行する処理
    const blob = request.response;
    const link = document.createElement("a");
    // ダウンロードリンクの作成
    link.href = window.URL.createObjectURL(blob);
    link.download = "busstop.json";
    // リンクをクリックさせる
    link.click();
  };
  request.send();
}

// 現在の時刻を取得する関数
function timeread() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  console.log(`${hour}:${minute}:${second}`);
  return now;
}
