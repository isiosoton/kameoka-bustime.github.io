// SelectボックスIDリスト一覧
const id_list = ["breeds"];

// HTMLが読み込まれた際に実行する処理
document.addEventListener("DOMContentLoaded", () => {
  make_start(); // APIからリストを取得し、Selectボックスを作成
});

const succession = async () => {
  data = await make_dogdata();
  console.log("main:", data);
};
