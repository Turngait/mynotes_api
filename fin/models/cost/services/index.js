const cost = require("../mongoose/schema/cost");

function normalizeCosts (costs) {
  costs.reverse();
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

    items.reverse();
    // let normalizedCosts = {
    //   period: '',
    //   items: [
    //   ],
    //   spentByPeriod: 0
    // };
    // let spentByPeriod = 0;

    // for (let cost of costs) {
    //   normalizedCosts.period = cost.period;
    //   normalizedCosts.items.push({
    //     title: cost.title,
    //     description: cost.descrition,
    //     amount: cost.amount,
    //     date: cost.date,
    //     id_group: cost.id_group,
    //     period: cost.period
    //   });
    //   spentByPeriod += cost.amount;
    // }
    // normalizedCosts.spentByPeriod = spentByPeriod;
    // normalizedCosts.items.reverse();

    return items;
  }
  else {
    return costs;
  }
}

function getCosts(costs) {
  const periods = new Set();
  costs.map((item) => {
    periods.add(item.date)
  })
  for (let period of periods) {
    let item = costs.filter((item) => item.date === period);
    let spentByDay = 0;
    for (let i of item) {
      spentByDay += i.amount;
      spentByPeriod += i.amount;
    }
    items.push({period, items: item, spentByDay, spentByThisMonth: spentByPeriod})
  }

  for (cost of costs) {

  }
}

module.exports = {
  normalizeCosts
}