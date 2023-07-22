// Description: バス停情報の取得
const read_buspole = async (busspot_list) => {
  // バス停名のリストの結合
  const buspole_all_data = busspot_list.join();

  // API回りの処理
  // const API_Key = process.env.ODPT_ACCESS_TOKEN;
  const API_Key = read_env();
  // console.log(API_Key);

  // バス停情報の取得
  let buspole_data = await fetch(`https://api.odpt.org/api/v4/odpt:BusstopPole?dc:title=${buspole_all_data}&acl:consumerKey=${API_Key}`);
  buspole_data = await buspole_data.json();
  return buspole_data;
};

// Description: バス停情報の整形
const buspole_datashaping = async (list_buspole_data) => {
  let dict_buspole = {};
  let list_busroute = [];

  list_buspole_data.forEach(async (buspole) => {
    // バス停基準データの作成
    dict_buspole[buspole["owl:sameAs"]] = {
      title: buspole["dc:title"],
      kana: buspole["odpt:kana"],
      busstopPoleNumber: buspole["odpt:busstopPoleNumber"],
      busroutePattern: buspole["odpt:busroutePattern"],
    };

    // バス停に発着するバスの系統リストの作成
    buspole["odpt:busroutePattern"].forEach(async (busroute) => {
      if (list_busroute.indexOf(busroute) === -1) {
        list_busroute.push(busroute);
      }
    });
  });

  // バス停基準データとバス停に発着するバスの系統リストの結合
  const dict_buspole_data = { buspole_data: dict_buspole, busroute_data: list_busroute };
  console.log(dict_buspole_data);
  return dict_buspole_data;
};

const buspole_main = async () => {
  // バス停データ一覧
  const buspole_soudai_list = ["創価大東京富士美術館（正門）", "創価大学創大門", "創価大学栄光門"];
  // const busspot_hachioji_list = ["八王子駅（北口）", "京王八王子駅"];

  // バス停情報の取得
  let buspole_sodai_data = await read_buspole(buspole_soudai_list);
  console.log(buspole_sodai_data);
  buspole_sodai_data = await buspole_datashaping(buspole_sodai_data);
  return buspole_sodai_data;
};
