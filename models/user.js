const validator = require('joi');
const fs = require('fs');
const path = require('path');
const BaseModel = require('./_base_model');
const { editUser } = require('./validator');

class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  async getCurrent() {
      const user = await User.query().findById(1);
      return {
        ...user,
        avatar: `/avatars/${user.avatar}`
      }
  }

  getById(id) {
    if (isNaN(id)|| id <= 0) { throw new Error('Invalid id'); }
    return User.query().findById(id);
  }

  async edit(data) {
    const { error } = validator.validate(data, editUser);
    if (error) {
        throw new Error('Invalid data');
    }
    
    await User
        .query()
        .patchAndFetchById(1, {
            ...data,
            updatedAt: new Date() 
        });
      return this.getCurrent();
  }

  async updateAvatar(newAvatarUrl) {
    const currentUser = await User.query().findById(1);

    // remove old avatar
    if (currentUser.avatar && currentUser.avatar !== newAvatarUrl) {
      try {
        const filePath = path.join(__dirname, '../static/avatars')
        fs.unlinkSync(`${filePath}/${currentUser.avatar}`);
      } catch(err) {
        console.error(err);
      }
    }
    await this.edit({ avatar: newAvatarUrl });
    return {
      ...currentUser,
      avatar: `/avatars/${newAvatarUrl}`
    }
  }

}

module.exports = User;
