const ID_COUNT = 9;
const MAX_ID = 50;

export const getRandomId: (ids: number[]) => number = (ids: number[]) => {
  const id = Math.floor(Math.random() * MAX_ID);
  if (ids.includes(id)) return getRandomId(ids);
  return id;
}
export const getInitialIds = () => {
  const ids: number[] = [];
  for(let i = 0; i < ID_COUNT; i++){
    const id = getRandomId(ids)
    ids.push(id);
  }
  return ids;
}