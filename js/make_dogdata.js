const urltop_dogapi = `https://dog.ceo/api`;
let dict_breeds = {};

// APIからリストを取得する関数（async/awaitバージョン）
const make_start = async () => {
  const dict_breeds_url = `${urltop_dogapi}/breeds/list/all`;
  dict_breeds = await read_webapi(dict_breeds_url);
  const breeds = Object.keys(dict_breeds); // リストを取得
  populateSelectBox(breeds); // 取得したデータを元にSelectボックスを作成
};

const make_dogdata = async (url) => {
  const list_breeds = await read_webapi(url);
  showImage(list_breeds); // 取得したデータを元に画像を表示
};

const check_subbreeds = async (breed) => {
  if (breed === "") {
    const url = `${urltop_dogapi}/breeds/image/random`;
    make_dogdata(url);
  } else if (dict_breeds[breed].length === 0) {
    const url = `${urltop_dogapi}/breed/${breed}/images/random`;
    make_dogdata(url);
  } else {
    console.log("subbreeds:", dict_breeds[breed]);
  }
};
