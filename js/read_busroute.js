const read_busroute = async (buspole) => {
  // API回りの処理
  // const API_Key = process.env.ODPT_ACCESS_TOKEN;
  const API_Key = read_env();
  // console.log(API_Key);

  // バスルートリストの結合
  const busroute_all_data = Object.keys(buspole.route).join();
  let busroute_data = await fetch(`https://api.odpt.org/api/v4/odpt:BusroutePattern?owl:sameAs=${busroute_all_data}&acl:consumerKey=${API_Key}`);
  busroute_data = await busroute_data.json();
  return busroute_data;
};

const busroute_datashaping = async (list_busroute_data, buspole) => {
  // console.log(buspole);
  const dict_busall_pole = await Promise.all(
    Object.keys(buspole.route_start).map(async (key) => {
      return { [key]: buspole.route_start[key].concat(buspole.route_goal[key]) };
    })
  );
  console.log(dict_busall_pole);
  // const dict_busall_pole = Object.assign(buspole.route_start, buspole.route_goal);
  // const dict_busall_pole = buspole.route_start;
  const busgoal_pole_list = buspole.route_goal;

  // console.log(busstart_pole_list);
  // console.log(busgoal_pole_list);

  let list_busroute = [];

  // console.log(list_busroute_data);
  // console.log(buspole);
  // console.log(busstart_pole_list);
  // console.log(busgoal_pole_list);

  list_busroute_data.forEach(async (busroute) => {
    let busstopPoleObject = {};
    let busstopPoleList = [];

    // バス停の固有識別子と順番の対応表を作成
    busroute["odpt:busstopPoleOrder"].forEach(async (busstopPoleOrder) => {
      busstopPoleObject[busstopPoleOrder["odpt:busstopPole"]] = { index: busstopPoleOrder["odpt:index"] };
    });

    // バス停と路線の情報から、路線情報にバス停情報を追加
    // const dict_bus_pole = { start_pole: busstart_pole_list[busroute["owl:sameAs"]], goal_pole: busgoal_pole_list[busroute["owl:sameAs"]] };
    // Object.keys(dict_bus_pole).forEach(async (buspole_key) => {
    //   dict_bus_pole[buspole_key].forEach(async (buspole) => {
    //     busstopPoleObject[buspole.busstopPoleSome][buspole_key] = buspole;
    //   });
    // });

    // バス停の情報のうち、必要なものを抽出
    // Object.keys(busstopPoleObject).forEach(async (busstopPole_key) => {
    //   if ("start_pole" in busstopPoleObject[busstopPole_key]) {
    //     busstopPoleList.push({ index: busstopPoleObject[busstopPole_key]["index"], pole: busstopPoleObject[busstopPole_key]["start_pole"] });
    //   } else if ("goal_pole" in busstopPoleObject[busstopPole_key]) {
    //     busstopPoleList.push({ index: busstopPoleObject[busstopPole_key]["index"], pole: busstopPoleObject[busstopPole_key]["goal_pole"] });
    //   }
    // });

    busgoal_pole_list[busroute["owl:sameAs"]].forEach(async (buspole) => {
      busstopPoleObject[buspole.busstopPoleSome]["pole"] = buspole;
    });
    Object.keys(busstopPoleObject).forEach(async (busstopPole_key) => {
      if ("pole" in busstopPoleObject[busstopPole_key]) {
        busstopPoleList.push({ index: busstopPoleObject[busstopPole_key]["index"], pole: busstopPoleObject[busstopPole_key]["pole"] });
      }
    });

    // バス停の情報のうち、必要なものを抽出
    let dict_busroute = {
      owlSameAs: busroute["owl:sameAs"],
      title: busroute["dc:title"],
      busstopPoleOrder: busstopPoleList,
    };

    // バス停一覧のリストに追加
    list_busroute.push(dict_busroute);
  });
  console.log(list_busroute);
};

const main_busroute = async (buspole) => {
  const busroute_data = await read_busroute(buspole);
  busroute_datashaping(busroute_data, buspole);
  //   console.log(buspole);
  return 0;
};
