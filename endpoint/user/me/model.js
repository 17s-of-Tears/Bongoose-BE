const UserModel = require('../model');
const FileSystem = require('./file').UserFileSystem;
class UserDetailModel extends UserModel {
  constructor(req) {
    super(req);
    this.nickname = req.body.nickname;
    this.description = req.body.description;
    if(req.file) {
      this.file = new FileSystem(this.requestUserID, req.file);
    } else if(req.body.image === null) {
      this.file = new FileSystem(this.requestUserID, null);
    }
  }

  async read(res) {
    await this.dao.serialize(async db => {
      await this.checkAuthorized(db);
      const users = await db.get('select user.name, user.createdAt, user.modifiedAt, user.imageUrl, user.description from user where user.id=?', [
        this.requestUserID
      ]);
      if(!users.length) {
        throw new Error('???');
      }
      const user = users[0];

      const images = await db.get('select boardImage.id as imageId, boardImage.imageUrl, board.id as boardId from board left join boardImage on board.id=boardImage.boardId where board.userId=? and boardImage.boardId is not null order by board.createdAt desc limit 8', [
        this.requestUserID
      ]);
      res.json({
        ...user,
        images
      });
    });
  }

  async update(res) {
    await this.dao.serialize(async db => {
      await this.checkAuthorized(db);

      if(this.nickname) {
        await db.run('update user set user.name=? where user.id=?', [
          this.nickname, this.requestUserID
        ]);
      }

      if(this.description) {
        await db.run('update user set user.description=? where user.id=?', [
          this.description, this.requestUserID
        ]);
      }

      if(this.file) {
        await this.file.updateIntegrityAssurance(db);
      }

      res.json({
        complete: true
      });
    });
  }
}
module.exports = UserDetailModel;
