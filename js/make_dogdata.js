const urltop_dogapi = `https://dog.ceo/api`;
let dict_breeds = {};

// APIからリストを取得する関数（async/awaitバージョン）
const make_start = async () => {
  const dict_breeds_url = `${urltop_dogapi}/breeds/list/all`;
  dict_breeds = await read_webapi(dict_breeds_url);
  const breeds = Object.keys(dict_breeds); // リストを取得
  // populateSelectBox(breeds, "breeds"); // 取得したデータを元にSelectボックスを作成
  await generateSelectBox(breeds, "div_breeds");
  await generateOption(breeds);
};

const check_input = async (input) => {
  console.log("check_input:", input);
};

const make_dogdata = async (url) => {
  let list_breeds = await read_webapi(url);
  list_breeds = typeof list_breeds === "string" || list_breeds instanceof String ? [list_breeds] : list_breeds; // 文字列の場合は配列に変換
  showImage(list_breeds); // 取得したデータを元に画像を表示
};

const check_subbreeds = (breed) => {
  const url = breed === "" ? `${urltop_dogapi}/breeds/image/random` : `${urltop_dogapi}/breed/${breed}/images/random`;
  make_dogdata(url);
};
