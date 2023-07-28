// Selectボックスを動的に作成する関数
const populateSelectBox = async (data) => {
  const selectBox = document.getElementById("breeds");
  // リストをループしてオプションを作成
  data.forEach(async (breed) => {
    const option = document.createElement("option");
    option.value = breed;
    option.textContent = breed;
    selectBox.appendChild(option);
  });
};
