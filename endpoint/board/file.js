const multer = require('multer');
const uuidv4 = require('uuid').v4;
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(process.cwd(), 'img/tmp'));
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

const BOONGOOSE_FILE_LIMIT = 4;
const middleware = multer({
  storage,
  limits: {
    fieldSize: '2MB',
    fields: 5,
    fileSize: '10MB'
  }
}).array('images', BOONGOOSE_FILE_LIMIT);

const FileSystem = require('../file');
class BoardFileSystem extends FileSystem {
  constructor(id, file) {
    super(id, file, 'img/board');
    this.maxFileLimit = BOONGOOSE_FILE_LIMIT;
  }

  async createIntegrityAssurance(db) {
    const files = this.file;
    for(const file of files) {
      await this.commit(file, async filename => {
        const result = await db.run('insert into boardImage(boardId, imageUrl) values (?, ?)', [
          this.id, filename
        ]);
        if(!result.affectedRows) {
          throw new Error('500 파일 업로드 오류');
        }
      });
    }
  }

  async updateIntegrityAssurance(db) {
    const files = await db.get('select count(boardImage.imageUrl) as currentExistsSize from boardImage where boardImage.boardId=?', [
      this.id
    ]);
    const currentExistsSize = files[0].currentExistsSize;
    if(currentExistsSize + this.file.length <= this.maxFileLimit) {
      await this.createIntegrityAssurance(db);
    } else {
      this.withdraw();
      throw new Error('400 파일 업로드 제한 초과');
    }
  }

  async deleteIntegrityAssurance(db, imageId) {
    const files = await db.get('select boardImage.imageUrl from boardImage where boardImage.id=? and boardImage.boardId=?', [
      imageId, this.id
    ]);
    const file = files[0];
    if(!file) {
      throw new Error('403 권한 없음');
    }
    this.rm(file.imageUrl);
    await db.run('delete from boardImage where boardImage.id=? and boardImage.boardId=?', [
      imageId, this.id
    ]);
  }
}
module.exports = {
  middleware,
  BoardFileSystem
};
