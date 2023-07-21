const soudai_busspot_list = ["創価大東京富士美術館（正門）", "創価大学創大門", "創価大学栄光門"];

async function read_buspole() {
  // API回りの処理
  // const API_Key = process.env.ODPT_ACCESS_TOKEN;
  const API_Key = read_env();
  // console.log(API_Key);

  const buspole_list = await Promise.all(
    soudai_busspot_list.map(async (spot) => {
      let res = await fetch(`https://api.odpt.org/api/v4/odpt:BusstopPole?dc:title=${spot}&acl:consumerKey=${API_Key}`);
      res = await res.json();
      console.log("a", res);
      return res;
    })
  );
  return buspole_list;
}
