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

// HTML側に画像を表示する関数
const showImage = async (url) => {
  const dog_image = document.getElementById("dog_image");

  // 画像を表示する前に、前回の画像を削除
  while (dog_image.firstChild) {
    dog_image.removeChild(dog_image.firstChild);
  }

  const image = document.createElement("img");
  image.src = url;
  dog_image.appendChild(image);
};
