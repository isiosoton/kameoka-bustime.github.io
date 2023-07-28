const make_start = async () => {
  const dict_breeds_url = `https://dog.ceo/api/breeds/list/all`;
  const dict_breeds = await read_webapi(dict_breeds_url);
  const list_breeds = Object.keys(dict_breeds);
  await add_selsect_breeds(list_breeds);
  console.log("list_breeds:", list_breeds);
};

// APIからリストを取得する関数（async/awaitバージョン）
const getDogBreeds = async () => {
  const dict_breeds_url = `https://dog.ceo/api/breeds/list/all`;
  const dict_breeds = await read_webapi(dict_breeds_url);
  const breeds = Object.keys(dict_breeds); // リストを取得
  populateSelectBox(breeds); // 取得したデータを元にSelectボックスを作成
};

const make_dogdata = async () => {
  const dict_breeds_url = `https://dog.ceo/api/breeds/image/random`;
  const dict_breeds = await read_webapi(dict_breeds_url);
  //   add_selsect_breeds(list_breeds);
  //   let dict_subbreeds_absence = { true: [], false: [] };
  //   list_breeds.forEach(async (breeds) => {
  //     dict_breeds[breeds].length === 0 ? dict_subbreeds_absence.true.push(breeds) : dict_subbreeds_absence.false.push({ breeds: dict_breeds[breeds] });
  //   });
  //   console.log("dict_subbreeds_absence:", dict_subbreeds_absence);

  //   console.log("breeds_list:", breeds_list);
  const data = dict_breeds;
  return data;
};
