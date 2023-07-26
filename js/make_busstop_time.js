// バス停情報とバス情報を呼び出す関数
const call_bus_data = async () => {
  const BusOperator = "odpt.Operator:NishiTokyoBus";
  const buspole_start_list = ["創価大東京富士美術館（正門）", "創価大学創大門", "創価大学栄光門"];
  const buspole_goal_list = ["八王子駅北口", "京王八王子駅"];
  const buspole_all_dict = { list_start: buspole_start_list, list_goal: buspole_goal_list, busoperator: BusOperator };

  const buspole_data = await main_buspole(buspole_all_dict);
  const busroute_data = await main_busroute(buspole_data);
  return buspole_data;
  // const bustime_data = await read_bustime(buspole_data.busroute_data);
  // console.log(bustime_data);
  // search_bustime(await buspole_data, await bustime_data);
  // return await bustime_data;
};

// バス情報を絞り込む関数
function search_bustime(buspole_data, bustime_data) {
  bustime_data.forEach((bustimes, bus_index) => {
    bustimes["odpt:busTimetableObject"].forEach((bustime, buspole_index) => {
      console.log(bus_index, bustime);
    });
  });
}

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
