// divタグの中の要素を全て削除する関数
const removeElementAll = async (idname) => {
  const container = document.getElementById(idname);
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  return container;
};

const generateOption = async (data) => {
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
const showImage = async (urls) => {
  const dog_image = document.getElementById("dog_image");

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
