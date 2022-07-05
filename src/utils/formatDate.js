export function handleData(data) {
   const date = new Date(data);
   const day = date.toLocaleString();
   return day
}