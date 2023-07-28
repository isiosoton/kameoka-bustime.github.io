const read_webapi = async (api_url) => {
  const res = await fetch(api_url);
  const dog_data = await res.json();
  return dog_data.message;
};
