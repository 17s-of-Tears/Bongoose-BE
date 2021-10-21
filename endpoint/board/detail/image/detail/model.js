const BoardDetailImageModel = require('../model');
class BoardDetailImageDetailModel extends BoardDetailImageModel {
  constructor(req) {
    super(req);
    this.imageId = req.params?.imageId;
  }

  async delete(res) {
    this.checkParameters(this.boardId, this.imageId);
    await this.dao.serialize(async db => {
      await this.checkAuthorized(db);
      await this.checkBoardOwned(db);

      this.file.id = this.boardId;
      await this.file.deleteIntegrityAssurance(db, this.imageId);

      res.json({
        complete: true
      });
    });
    this.file && this.file.withdraw();
    throw err;
  }
}
module.exports = BoardDetailImageDetailModel;
