// Description: バス停情報の取得
const read_buspole = async (busspot_list, operator) => {
  // バス停名のリストの結合
  const buspole_all_data = busspot_list.join();

  // API回りの処理
  // const API_Key = process.env.ODPT_ACCESS_TOKEN;
  const API_Key = read_env();
  // console.log(API_Key);

  // バス停情報の取得
  let buspole_data = await fetch(`https://api.odpt.org/api/v4/odpt:BusstopPole?dc:title=${buspole_all_data}&odpt:operator=${operator}&acl:consumerKey=${API_Key}`);
  buspole_data = await buspole_data.json();
  return buspole_data;
};

// Description: バス停情報の整形
const buspole_datashaping = async (list_buspole_data, use_list) => {
  let buspole_start = {};
  let buspole_goal = {};
  let buspole_route = {};
  let buspole_start_push = {};
  let buspole_goal_push = {};

  // バス停名のリストを1つずつ取得
  list_buspole_data.forEach(async (buspole) => {
    // バス停基準データの作成
    const start_check = use_list.list_start.includes(buspole["dc:title"]);
    const dict_buspole = {
      title: buspole["dc:title"],
      kana: buspole["odpt:kana"],
      busstopPoleSome: buspole["owl:sameAs"],
    };
    // 起点データか否かを判定
    let pole_dict_data = start_check ? buspole_start : buspole_goal;
    // バス停基準データの作成
    buspole["odpt:busroutePattern"].forEach(async (busroute) => {
      // バス停に発着するバスの系統リストの作成
      if (busroute in pole_dict_data) {
        pole_dict_data[busroute].push(dict_buspole);
      } else {
        pole_dict_data[busroute] = [dict_buspole];
      }
    });
    // 起点データか否かでデータの振り分け
    start_check ? (buspole_start = pole_dict_data) : (buspole_goal = pole_dict_data);
  });
  const list_buspole_start = Object.keys(buspole_start);
  const list_buspole_goal = Object.keys(buspole_goal);

  // list_buspole_goalとlist_busrouteの共通部分を抽出
  const list_busroute = list_buspole_start.filter((value) => list_buspole_goal.includes(value));

  // バス停基準データの作成
  list_busroute.forEach(async (busroute) => {
    buspole_start_push[busroute] = buspole_start[busroute];
    buspole_goal_push[busroute] = buspole_goal[busroute];
    buspole_route[busroute] = buspole_start[busroute].concat(buspole_goal[busroute]);
  });

  // バス停基準データとバス停に発着するバスの系統リストの結合
  const dict_buspole_data = { route_start: buspole_start_push, route_goal: buspole_goal_push, route: buspole_route };
  return dict_buspole_data;
};

const main_buspole = async (buspole_all_dict) => {
  // バス停データ一覧
  const buspole_all_list = buspole_all_dict.list_start.concat(buspole_all_dict.list_goal);

  // バス停情報の取得
  let buspole_data = await read_buspole(buspole_all_list, buspole_all_dict.busoperator);
  buspole_data = await buspole_datashaping(buspole_data, buspole_all_dict);
  return buspole_data;
};
