const read_busroute = async (buspole) => {
  // API回りの処理
  // const API_Key = process.env.ODPT_ACCESS_TOKEN;
  const API_Key = read_env();
  // console.log(API_Key);

  // バスルートリストの結合
  const busroute_all_data = await buspole.route_list.join();
  let busroute_data = await fetch(`https://api.odpt.org/api/v4/odpt:BusroutePattern?owl:sameAs=${busroute_all_data}&acl:consumerKey=${API_Key}`);
  busroute_data = await busroute_data.json();
  return busroute_data;
};

const busroute_datashaping = async (list_busroute_data) => {
  list_busroute_data.forEach(async (busroute) => {
    console.log(busroute["odpt:busstopPoleOrder"]);
  });
};

const main_busroute = async (buspole) => {
  const busroute_data = await read_busroute(buspole);
  busroute_datashaping(busroute_data);
  //   console.log(buspole);
  return 0;
};
