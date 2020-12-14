function normalizeIncomes (incomes) {
  if (incomes.length > 0) {
    const items = [];
    const periods = new Set();
    incomes.map((item) => {
      periods.add(item.date)
    });
    let spentByPeriod1 = 0;

    for (let period of periods) {
      let item = incomes.filter((item) => item.date === period);
      let spentByDay = 0;
      for (let i of item) {
        spentByDay += i.amount;
        spentByPeriod1 += i.amount;
      }
      items.push({period, items: item, spentByDay, spentByThisMonth: spentByPeriod1})
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