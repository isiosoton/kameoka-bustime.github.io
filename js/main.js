// HTMLが読み込まれた際に実行する処理
document.addEventListener("DOMContentLoaded", () => {
  make_start(); // APIからリストを取得し、Selectボックスを作成
});

document.getElementById("breeds").addEventListener("change", (e) => {
  check_breeds(e.target.value); // 入力された値を元に画像を表示
});

// inputタグが入力された際に実行する処理
document.getElementById("sheets").addEventListener("change", (e) => {
  check_input(e.target.value); // 入力された値を元に画像を表示
});

// 更新ボタンが押された際に実行する処理
const succession = async () => {
  const input_int = document.getElementById("sheets").value;
  const input_breed = document.getElementById("breeds").value;
  check_dubble(input_breed, input_int);
};
