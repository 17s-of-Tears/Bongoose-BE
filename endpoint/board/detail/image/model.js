const BoardDetailModel = require('../model');
class BoardDetailImageModel extends BoardDetailModel {
  async update(res) {
    try {
      this.checkParameters(this.boardId, this.file);
      await this.dao.serialize(async db => {
        await this.checkAuthorized(db);
        await this.checkBoardOwned(db);

        this.file.id = this.boardId;
        await this.file.updateIntegrityAssurance(db);

        res.json({
          complete: true
        });
      });
    } catch(err) {
      this.file && this.file.withdraw();
      throw err;
    }
  }
}
module.exports = BoardDetailImageModel;
