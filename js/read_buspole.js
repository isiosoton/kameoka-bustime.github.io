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
  let buspole_goal_push = {};
  let list_busroute = [];

  // バス停名のリストを1つずつ取得
  list_buspole_data.forEach(async (buspole) => {
    // バス停基準データの作成
    const dict_buspole = {
      title: buspole["dc:title"],
      kana: buspole["odpt:kana"],
    };

    // 創価大学周辺のバス停か否かを判定
    if (use_list.true_list.includes(buspole["dc:title"])) {
      // データの結合
      const plus_poledata = { busstopPoleNumber: buspole["odpt:busstopPoleNumber"], busroutePattern: buspole["odpt:busroutePattern"] };
      buspole_start[buspole["owl:sameAs"]] = Object.assign(dict_buspole, plus_poledata);
      // バス停に発着するバスの系統リストの作成
      buspole["odpt:busroutePattern"].forEach(async (busroute) => {
        if (list_busroute.indexOf(busroute) === -1) {
          list_busroute.push(busroute);
        }
      });
    } else {
      const goal_poledata = Object.assign(dict_buspole, { busstopPoleSome: buspole["owl:sameAs"] });
      buspole["odpt:busroutePattern"].forEach(async (busroute) => {
        if (busroute in buspole_goal) {
          buspole_goal[busroute].push(goal_poledata);
        } else {
          buspole_goal[busroute] = [goal_poledata];
        }
      });
    }
  });
  const list_buspole_goal = Object.keys(buspole_goal);

  // list_buspole_goalとlist_busrouteの共通部分を抽出
  list_busroute = list_busroute.filter((value) => list_buspole_goal.includes(value));

  // バス停基準データの作成
  list_busroute.forEach(async (busroute) => {
    buspole_goal_push[busroute] = buspole_goal[busroute];
  });

  // バス停基準データとバス停に発着するバスの系統リストの結合
  const dict_buspole_data = { route_true: { buspole_data: buspole_start, busroute_data: list_busroute }, route_false: { buspole_data: buspole_goal_push } };
  return dict_buspole_data;
};

const main_buspole = async () => {
  // バス停データ一覧
  const NishiTokyoBus = "odpt.Operator:NishiTokyoBus";
  const buspole_sodai_list = ["創価大東京富士美術館（正門）", "創価大学創大門", "創価大学栄光門"];
  const buspole_hachi_list = ["八王子駅北口", "京王八王子駅"];
  const buspole_all_list = buspole_sodai_list.concat(buspole_hachi_list);
  const buspole_all_dict = { true_list: buspole_sodai_list, false_list: buspole_hachi_list };

  // バス停情報の取得
  let buspole_data = await read_buspole(buspole_all_list, NishiTokyoBus);
  buspole_data = await buspole_datashaping(buspole_data, buspole_all_dict);
  return buspole_data;
};
