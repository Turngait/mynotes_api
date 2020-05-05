const DAO = require('./dao');
const User = require('./User');

class Wlist extends DAO {
  constructor(userModel, wlistGroupModel) {
    super('User');
    this.userModel = userModel;
    this.wlistGroupModel = wlistGroupModel;
  }

  async getAllWlistItems(token) {
    const user = new User(this.userModel);
    const iUser = await user.getUser(token);
    if(iUser) {
      const wlistGroup = await this.wlistGroupModel.findOne({id_user: iUser._id});
      const wlists = iUser.wlist;
      wlists.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });
      return {groups: wlistGroup.groups, wlists};
    } else {
      return false;
    }
  }

  async addWlistItem(wlistItem, token) {
    const user = new User(this.userModel);
    const iUser = await user.getUser(token);
    iUser.wlist.push(wlistItem);
    return iUser.save();
  }

  async deleteWlistitem(itemId, token) {
    const user = new User(this.userModel);
    const iUser = await user.getUser(token);
    if (iUser) {
      let items = iUser.wlist;
      items = items.filter(i => i._id.toString() !== itemId);
      iUser.wlist = items;
      return iUser.save();
    } else {
      return false;
    }
  }

  async addWlistGroup (title, token) {
    const user = new User(this.userModel);
    const iUser = await user.getUser(token);
    const Candidate = await this.wlistGroupModel.findOne({id_user: iUser._id});
    let result = null;

    if (Candidate) {
      const group = {title};
      Candidate.groups.push(group);
      result = await Candidate.save();
    } else {
      const Wgroup = new wgroups_model({
        id_user: iUser._id,
        groups: [{title}]
      });
      result = await Wgroup.save();
    }

    return result;

  }
}

module.exports = Wlist;
