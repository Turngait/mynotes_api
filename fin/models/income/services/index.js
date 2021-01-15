function normalizeIncomes (incomes) {
  if (incomes.length > 0) {
    const items = [];
    const periods = new Set();
    incomes.map((item) => {
      periods.add(item.date)
    });
    let gainByPeriod = 0;

    for (let period of periods) {
      let item = incomes.filter((item) => item.date === period);
      let gainByDay = 0;
      for (let i of item) {
        gainByDay += i.amount;
        gainByPeriod += i.amount;
      }
      items.push({period, items: item, gainByDay, gainByPeriod})
    }
    return items;
  }
  else {
    return incomes;
  }
}

function normalizeSourceData ({sources, incomes}) {
  const normalizedSources = [];
  for (let source of sources) {
    let sum = 0;
    for (const income of incomes) {
      for( const item of income.items) {
        if (source._id.toString() === item.id_source.toString()) {
          sum += +item.amount;
        }
      }

    }
    normalizedSources.push({
      _id: source._id,
      title: source.title,
      sum
    })
  }
  return normalizedSources;
}

module.exports = {
  normalizeIncomes,
  normalizeSourceData
}