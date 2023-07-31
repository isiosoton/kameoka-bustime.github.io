const urltop_dogapi = `https://dog.ceo/api`;
let dict_breeds = {};
let input_int = null;
let input_breed = null;

// APIからリストを取得する関数（async/awaitバージョン）
const make_start = async () => {
  const dict_breeds_url = `${urltop_dogapi}/breeds/list/all`;
  dict_breeds = await read_webapi(dict_breeds_url);
  const breeds = Object.keys(dict_breeds); // リストを取得
  await generateOption(breeds);
};

const make_dogdata = async () => {
  let url = null;
  let list_breeds = null;
  console.log(input_breed, input_int);
  url = input_breed == null ? `${urltop_dogapi}/breeds/image/random` : `${urltop_dogapi}/breed/${input_breed}/images/random`;
  url = input_int == null ? url : `${url}/${input_int}`;
  list_breeds = await read_webapi(url);
  list_breeds = typeof list_breeds === "string" || list_breeds instanceof String ? [list_breeds] : list_breeds; // 文字列の場合は配列に変換
  showImage(list_breeds); // 取得したデータを元に画像を表示
};

const check_dubble = (breed, input) => {};

const check_input = async (input) => {
  if (isNaN(Number(input))) {
    alert(`${input}は入力できません。\n半角数字で入力してください。`);
    document.getElementById("sheets").value = "";
  } else {
    input_int = Number(input);
    make_dogdata();
  }
};

const check_breeds = (breed) => {
  input_breed = breed;
  make_dogdata();
};
