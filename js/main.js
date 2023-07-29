// SelectボックスIDリスト一覧
const id_list = ["breeds"];

// HTMLが読み込まれた際に実行する処理
document.addEventListener("DOMContentLoaded", () => {
  make_start(); // APIからリストを取得し、Selectボックスを作成
  // showImage("https://images.dog.ceo/breeds/weimaraner/n02092339_289.jpg"); // HTML側に画像を表示
});

// Selectボックスの値が変更された際に実行する処理
id_list.forEach(async (id) => {
  const elementid_data = document.getElementById(id);
  elementid_data.addEventListener("change", async () => {
    check_subbreeds(elementid_data.value);
  });
});

const succession = async () => {
  data = await make_dogdata();
  console.log("main:", data);
};
