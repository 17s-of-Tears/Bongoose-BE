const UserModel = require('../model');
class UserDetailModel extends UserModel {
  constructor(req) {
    super(req);
    this.nickname = req.body.nickname;
    this.description = req.body.description;
    this.defaultImage = req.body.defaultImage ?? false;
    if(req.file) {
      this.useFilesystem(req.file, 'img/profile');
    } else {
      this.useFilesystem(null, 'img/profile');
    }
  }

  async read(res) {
    await this.dao.serialize(async db => {
      await this.checkAuthorized(db);
      const users = await db.get('select user.id, user.name, user.email, user.createdAt, user.modifiedAt, user.imageUrl, user.description from user where user.id=?', [
        this.requestUserID
      ]);
      if(!users.length) {
        throw new UserDetailModel.Error403();
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

  async updateImage(db, file) {
    // 무결성을 위한 기존 파일 경로 획득
    const users = await db.get('select user.imageUrl from user where user.id=?', [
      this.requestUserID
    ]);
    const fileURI = users[0].imageUrl;
    if(file === null) {
      await db.run('update user set user.imageUrl=null where user.id=?', [
        this.requestUserID
      ]);
    } else {
      await db.run('update user set user.imageUrl=? where user.id=?', [
        `${file.saveDir}/${file.saveName}`, this.requestUserID
      ]);
    }
    // db가 모두 올바르게 작동하여야 파일 삭제
    fileURI && await this.file.del(remover => {
      remover(fileURI);
    });
  }

  async update(res) {
    await this.file.serialize(async files => {
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

        if(files.size()) {
          for(const file of files) {
            await this.updateImage(db, file);
            break;
          }
        } else if(this.defaultImage === true) {
          await this.updateImage(db, null);
        }

        res.json({
          complete: true
        });
      });
    });
  }
}
module.exports = UserDetailModel;
