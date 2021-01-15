function normalizeCosts (costs) {
  if (costs.length > 0) {
    const items = [];
    const periods = new Set();
    costs.map((item) => {
      periods.add(item.date)
    });
    let spentByPeriod = 0;

    for (let period of periods) {
      let item = costs.filter((item) => item.date === period);
      let spentByDay = 0;
      for (let i of item) {
        spentByDay += i.amount;
        spentByPeriod += i.amount;
      }
      items.push({period, items: item, spentByDay, spentByThisMonth: spentByPeriod})
    }
    return items;
  }
  else {
    return costs;
  }
}

function normalizeGroupData ({groups, costs}) {
  const normalizedGroups = [];
  for (let group of groups) {
    let sum = 0;
    for (const cost of costs) {
      for( const item of cost.items) {
        if (group._id.toString() === item.id_group.toString()) {
          sum += +item.amount;
        }
      }

    }
    normalizedGroups.push({
      _id: group._id,
      title: group.title,
      sum
    })
  }
  return normalizedGroups;
}

module.exports = {
  normalizeCosts,
  normalizeGroupData
}