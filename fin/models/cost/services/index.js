function normalizeCosts (costs) {
  if (costs.length > 0) {
    const items = [];
    const periods = new Set();
    costs.map((item) => {
      periods.add(item.date)
    });
    let spentByPeriod1 = 0;

    for (let period of periods) {
      let item = costs.filter((item) => item.date === period);
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
    return costs;
  }
}

module.exports = {
  normalizeCosts
}