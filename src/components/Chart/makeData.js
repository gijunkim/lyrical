import namor from 'namor'

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}



const newPerson = (rank) => {
  const statusChance = Math.random()
  return {
    title: namor.generate({ words: 1, numbers: 0 }),
    artist: namor.generate({ words: 1, numbers: 0 }),
    number: rank + 1,
    // visits: Math.floor(Math.random() * 100),
    // progress: Math.floor(Math.random() * 100),
    // status:
    //   statusChance > 0.66
    //     ? 'relationship'
    //     : statusChance > 0.33
    //     ? 'complicated'
    //     : 'single',
  }
}

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    let rank = 0;
    return range(len).map(d => {
      return {
        ...newPerson(rank++),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
