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

const buspole_datashaping = async () => {
  const buspole_data = await read_buspole();
  // console.log(buspole_data);
  const buspole_data_shaping = buspole_data.map((buspole) => {
    return {
      title: buspole["dc:title"],
      lat: buspole["geo:lat"],
      long: buspole["geo:long"],
      busstopPoleNumber: buspole["odpt:busstopPoleNumber"],
    };
  });
  return buspole_data_shaping;
};

const buspole_main = async () => {
  // バス停データ一覧
  const busspot_soudai_list = ["創価大東京富士美術館（正門）", "創価大学創大門", "創価大学栄光門"];
  // const busspot_hachioji_list = ["八王子駅（北口）", "京王八王子駅"];

  // バス停情報の取得
  let buspole_sodai_data = await read_buspole(busspot_soudai_list);
  return buspole_sodai_data;
};
