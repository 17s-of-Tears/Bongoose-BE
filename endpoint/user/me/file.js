const multer = require('multer');
const uuidv4 = require('uuid').v4;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '/tmp/boongoose');
  },
  filename(req, file, cb) {
    const extname = checkMimetype(file);
    if(extname) {
      const uuid = uuidv4().replace(/-/gi, '');
      cb(null, `${uuid}.${extname}`);
    } else {
      cb(new Error('400 허용되지 않는 파일 타입'));
    }
  }
});
function checkMimetype(file) {
  let type;
  if(file.mimetype === 'image/png') {
    return 'png';
  }
  if(file.mimetype === 'image/jpeg') {
    return 'jpg';
  }
  if(file.mimetype === 'image/gif') {
    return 'gif';
  }
  return false;
}
const middleware = multer({
  storage,
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
    super(id, file, 'img/profile');
    /*
    if(this.file) {
      const oldPath = this.file.path;
      const extname = path.extname(this.file.originalname);
      const newPath = `${oldPath}${extname}`;
      this.rename(oldPath, newPath);
      this.file.path = newPath;
    }
    */
    /*this.file = this.file.map(row => ({
      ...row
    }));*/
  }

  async updateIntegrityAssurance(db) {
    // 무결성을 위한 기존 파일 경로 획득
    const users = await db.get('select user.imageUrl from user where user.id=?', [
      this.id
    ]);
    const user = users[0];
    if(!user) {
      throw new Error('500 파일 업로드 오류');
    }
    if(this.file) {
      await this.commit(this.file, async serverPath => {
        // 아래 과정에서 오류가 발생하면
        // commit 함수 내부의 핸들러에 의해 임시파일, 실제파일 모두 삭제됨
        const result = await db.run('update user set user.imageUrl=? where user.id=?', [
          serverPath, this.id
        ]);
        if(!result.affectedRows) {
          throw new Error('500 파일 업로드 오류');
        }
        // 기존 파일 삭제
        if(user.imageUrl) {
          this.rm(user.imageUrl);
        }
      });
    } else {
      const result = await db.run('update user set user.imageUrl=null where user.id=?', [
        this.id
      ]);
      // 기존 파일 삭제
      if(user.imageUrl) {
        this.rm(user.imageUrl);
      }
    }
  }
}
module.exports = {
  middleware,
  UserFileSystem
};
