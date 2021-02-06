import namor from "namor";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const titles = ["METEOR", "Dynamite", "Blueming"];
const artists = ["CHANGMO", "BTS", "IU"];

const newPerson = (rank) => {
  const statusChance = Math.random();
  return {
    // title: namor.generate({ words: 1, numbers: 0 }),
    // artist: namor.generate({ words: 1, numbers: 0 }),
    title: titles[rank],
    artist: artists[rank],
    number: rank + 1,
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    let rank = 0;
    return range(len).map((d) => {
      return {
        ...newPerson(rank++),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
