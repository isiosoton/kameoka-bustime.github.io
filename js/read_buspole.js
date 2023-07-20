function buspole_data(json_data) {
  buspole_list = [];
  json_data.forEach((buspole) => {
    if (buspole["dc:title"].match(/創価/)) {
      buspole_list.push(buspole);
    }
  });
  return buspole_list;
}

async function read_buspole() {
  // API回りの処理
  // const API_Key = process.env.ODPT_ACCESS_TOKEN;
  const API_Key = read_env();
  // console.log(API_Key);

  // バス停情報
  const res = await fetch(`https://api.odpt.org/api/v4/odpt:BusstopPole?odpt:operator=odpt.Operator:NishiTokyoBus&acl:consumerKey=${API_Key}`);
  const users = await res.json();
  const buspole_list = await buspole_data(users);
  return buspole_list;
}
