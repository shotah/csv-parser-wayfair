export const getFavIcon = async (item) => {
  const res = await fetch('/api/post', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(item)
  });
  return await res.json();
};

export default async function AddFavIcon(data, setData) {
  if (!data.data || data?.data?.length < 1) {
    return null;
  }
  data.data.forEach(async (e) => {
    await setData(
      await getFavIcon(e)
        .then((r) => r)
        .catch((err) => console.log(err))
    );
  });
}
