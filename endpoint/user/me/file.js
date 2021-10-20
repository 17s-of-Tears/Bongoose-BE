const multer = require('multer');
const middleware = multer({
  dest: 'img/profile/',
  limits: {
    fieldSize: '2MB',
    fields: 5,
    fileSize: '10MB'
  }
}).single('image');
const path = require('path');

const FileSystem = require('../../file');
class UserFileSystem extends FileSystem {
  constructor(id, file) {
    super(id, file);
    if(this.file) {
      const oldPath = this.file.path;
      const extname = path.extname(this.file.originalname);
      const newPath = `${oldPath}${extname}`;
      this.rename(oldPath, newPath);
      this.file.path = newPath;
    }
    /*this.file = this.file.map(row => ({
      ...row
    }));*/
  }

  async updateIntegrityAssurance(db) {
    try {
      // 무결성을 위한 기존 파일 경로 획득
      const users = await db.get('select user.imageUrl from user where user.id=?', [
        this.id
      ]);
      const user = users[0];
      if(!user) {
        throw new Error('500 파일 업로드 오류');
      }

      if(this.file) {
        // 새 파일 DB에 등록
        const result = await db.run('update user set user.imageUrl=? where user.id=?', [
          this.file.path, this.id
        ]);
        if(!result.affectedRows) {
          throw new Error('500 파일 업로드 오류');
        }
      } else {
        const result = await db.run('update user set user.imageUrl=null where user.id=?', [
          this.id
        ]);
      }

      // 기존 파일 삭제
      if(user.imageUrl) {
        this.rm(user.imageUrl);
      }
    } catch(err) {
      if(this.file) {
        this.rm(this.file.path);
      }
      throw err;
    }
  }
}
module.exports = {
  middleware,
  UserFileSystem
};
