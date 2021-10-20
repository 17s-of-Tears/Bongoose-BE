const multer = require('multer');
const diskStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'static/file/');
  },
  filename(req, file, cb) {
    cb(null, uuidv4());
  }
});
const middleware = multer({
  dest: 'static/file/',
  limits: {
    fieldSize: '2MB',
    fields: 5,
    fileSize: '10MB'
  }
}).array('images', 4); //.array('', 4); // .single()

const FileSystem = require('../file');
class BoardFileSystem extends FileSystem {
  async integrityAssurance(db) {
    const files = (this.multiple) ? this.file : [ this.file ];
    try {
      for(const file of files) {
        const result = await db.run('insert into boardImage(boardId, imageUrl) values (?, ?)', [
          this.id, file.path
        ]);
        if(!result.affectedRows) {
          throw new Error('500 파일 업로드 오류');
        }
      }
    } catch(err) {
      for(const file of files) {
        this.rm(file.path);
      }
      throw err;
    }
  }
}
module.exports = {
  middleware,
  BoardFileSystem
};
