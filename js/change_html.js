// divタグの中の要素を全て削除する関数
const removeElementAll = async (idname) => {
  const container = document.getElementById(idname);
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  return container;
};

const generateSelectBox = async (data, idname) => {
  const container = await removeElementAll(idname);

  const selectBox = document.createElement("select");
  selectBox.id = idname.replace("div_", "");

  // リストをループしてオプションを作成
  data.forEach(async (breed) => {
    const option = document.createElement("option");
    option.value = breed;
    option.textContent = breed;
    selectBox.appendChild(option);
  });

  container.appendChild(selectBox);

  // イベントリスナーを外部で定義しておく
  const previousListener = async () => {
    console.log("value:", selectBox.value);
    check_subbreeds(selectBox.value);
  };

  container.removeEventListener("change", previousListener);
  container.addEventListener("change", previousListener);
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
