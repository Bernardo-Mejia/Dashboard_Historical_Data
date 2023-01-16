let fecha = new Date();
/*
console.log(
  `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`
);
*/

/* 
    ? AMZN
    ? BTC
    ? DIS
    ? GM
    ? SONY
*/

let symbols = "SONY",
  // date_from = `${fecha.getFullYear()-1}-${fecha.getMonth() + 1}-${fecha.getDate()}`,
  // date_to = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`,
  limit = 500;

export default {
  access_key: "c0a81cfdae174c044ab61c1aaa42018d2", // * 5c63f8853f55f1b2ba5dab160c3d782f // * c0a81cfdae174c044ab61c1aaa42018d
  symbols,
  date_from:"2022-01-13",
  date_to:"2023-01-13",
  limit,
};
