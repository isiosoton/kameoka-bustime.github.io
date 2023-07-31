// Selectタグの値を作成する関数
const generateOption = async (data) => {
  const selectBox = document.getElementById("breeds");

  const option = document.createElement("option");
  option.value = "";
  option.textContent = "";
  option.selected = true;
  selectBox.appendChild(option);

  // リストをループしてオプションを作成
  data.forEach(async (breed) => {
    const option = document.createElement("option");
    option.value = breed;
    option.textContent = breed;
    selectBox.appendChild(option);
  });
};

// HTML側に画像を表示する関数
const showImage = async (urls) => {
  const dog_image = document.getElementById("div_image");

  // 画像を表示する前に、前回の画像を削除
  while (dog_image.firstChild) {
    dog_image.removeChild(dog_image.firstChild);
  }

  // 画像を表示
  urls.forEach((url) => {
    const image = document.createElement("img");
    image.src = url;
    dog_image.appendChild(image);
  });
};
