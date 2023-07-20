async function read_bustime() {
  // API回りの処理
  // const API_Key = process.env.ODPT_ACCESS_TOKEN;
  const API_Key = read_env();
  // console.log(API_Key);

  const res = await fetch(`https://api.odpt.org/api/v4/odpt:BusTimetable?odpt:operator=odpt.Operator:NishiTokyoBus&acl:consumerKey=${API_Key}`);
  const bustimes_list = await res.json();
  return bustimes_list;
}
