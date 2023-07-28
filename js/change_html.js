const add_selsect_breeds = async (list_breeds) => {
  const select_breeds = document.getElementById("breeds");
  list_breeds.forEach(async (breeds) => {
    let option = await document.createElement(breeds);
    option.value = breeds;
    option.text = breeds;
    await select_breeds.appendChild(option);
    // console.log("option:", option);
  });
};
