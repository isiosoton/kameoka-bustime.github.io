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

async function request_dog() {
  // API回りの処理
  // const API_Key = process.env.ODPT_ACCESS_TOKEN;
  // const API_Key = read_env();
  // console.log(API_Key);

  // バス停情報
  const res = await fetch(`https://dog.ceo/api/breeds/image/random`);
  const dog_data = await res.json();
  return dog_data;
}
