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

module.exports = {
  normalizeIncomes
}