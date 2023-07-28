// HTMLが読み込まれた際に実行する処理
document.addEventListener("DOMContentLoaded", () => {
  getDogBreeds(); // APIからリストを取得し、Selectボックスを作成
});

const succession = async () => {
  data = await make_dogdata();
  console.log("main:", data);
};
