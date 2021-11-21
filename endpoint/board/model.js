const Model = require('../model');
const FileSystem = require('./file').BoardFileSystem;
class BoardModel extends Model {
  constructor(req) {
    super(req);

    this.start = req.query?.start ?? 0;
    this.end = req.query?.end ?? 15;
    this.keyword = req.query?.keyword ?? '';
    this.userId = req.query?.userId;

    this.content = req.body?.content;
    this.hashtags = req.body?.hashtags ?? [];
    if(!this.hashtags instanceof Array) {
      this.hashtags = [ this.hashtags ];
    }
    this.images = req.body?.images ?? [];

    if(req.files) {
      this.file = new FileSystem(null, req.files);
    } else if(req.method === 'DELETE') {
      this.file = new FileSystem(null, null);
    }
  }

  checkDuplicateHashtags(hashtags) {
    return Array.from(new Set(hashtags));
  }

  async create(res) {
    try {
      this.checkParameters(this.content);
      await this.dao.serialize(async db => {
        await this.checkAuthorized(db);
        const result = await db.run('insert into board(userId, content) values (?, ?)', [
          this.requestUserID, this.content
        ]);
        const boardId = result.lastID;
        if(!boardId) {
          throw new Error('???');
        }

        const nonDuplicateHashtags = this.checkDuplicateHashtags(this.hashtags);
        for(const hashtag of nonDuplicateHashtags) {
          await db.run('insert into boardHashtag(boardId, hashtag) values (?, ?)', [
            boardId, hashtag
          ]);
        }

        if(this.file) {
          this.file.id = boardId;
          await this.file.createIntegrityAssurance(db);
        }

        res.status(201);
        res.json({
          boardId
        });
      });
    } catch(err) {
      this.file && this.file.withdraw();
      throw err;
    }

    this.dao.serialize(async db => {
      await db.run(
`insert into notification(subscribeUserId, publishUserId, message, isAlert)
select
  userRelation.subscribeUserId,
  userRelation.publishUserId,
  ?,
  1
from
  userRelation
where
  userRelation.publishUserId=?`, [ this.content, this.requestUserID ]);
    }).catch(console.error);
  }

  async getBoardOfUserId(db) {
    this.checkParameters(this.userId);
    const metadata = await db.get('select count(distinct board.id) as lastEnd from board left join boardHashtag on board.id=boardHashtag.boardId left join user on board.userId=user.id where user.id=?', [
      this.userId
    ]);
    const lastEnd = metadata[0].lastEnd;
    const boards = await db.get(
      `select
  distinct board.id,
  user.name as userName,
  user.email as userEmail,
  concat('[', group_concat(distinct '{"', boardImage.id, '":"', boardImage.imageUrl, '"}'), ']') as images,
  concat('[', group_concat(distinct '"', boardHashtag.hashtag, '"'), ']') as hashtags,
  sum(case when boardLike.likeOrDislike=1 then 1 else 0 end) as likes,
  sum(case when boardLike.likeOrDislike=0 then 1 else 0 end) as dislikes,
  board.content,
  board.createdAt
from
  board left join boardHashtag on board.id=boardHashtag.boardId left join
  user on board.userId=user.id left join
  boardImage on board.id=boardImage.boardId left join
  boardLike on board.id=boardLike.boardId
where user.id=? group by board.id order by board.id desc limit ?,?`, [
      this.userId, this.start-0, this.end-0
    ]);
    return {
      boards: boards && boards.map(row => ({ ...row, images: row.images===null ? null : JSON.parse(row.images), hashtags: row.hashtags===null ? null : JSON.parse(row.hashtags) })),
      lastEnd,
    };
  }

  async getBoardOfKeyword(db) {
    const metadata = await db.get('select count(distinct board.id) as lastEnd from board left join boardHashtag on board.id=boardHashtag.boardId left join user on board.userId=user.id where user.name like ? or boardHashtag.hashtag like ?', [
      `%${this.keyword}%`, `%${this.keyword}%`
    ]);
    const lastEnd = metadata[0].lastEnd;
    const boards = await db.get(
      `select
  distinct board.id,
  user.name as userName,
  user.email as userEmail,
  concat('[', group_concat(distinct '{"', boardImage.id, '":"', boardImage.imageUrl, '"}'), ']') as images,
  concat('[', group_concat(distinct '"', boardHashtag.hashtag, '"'), ']') as hashtags,
  sum(case when boardLike.likeOrDislike=1 then 1 else 0 end) as likes,
  sum(case when boardLike.likeOrDislike=0 then 1 else 0 end) as dislikes,
  board.content,
  board.createdAt
from
  board left join boardHashtag on board.id=boardHashtag.boardId left join
  user on board.userId=user.id left join
  boardImage on board.id=boardImage.boardId left join
  boardLike on board.id=boardLike.boardId
where user.name like ? or boardHashtag.hashtag like ? group by board.id order by board.id desc limit ?,?`, [
      `%${this.keyword}%`, `%${this.keyword}%`, this.start-0, this.end-0
    ]);
    return {
      boards: boards && boards.map(row => ({ ...row, images: row.images===null ? null : JSON.parse(row.images), hashtags: row.hashtags===null ? null : JSON.parse(row.hashtags) })),
      lastEnd,
    };
  }

  async read(res) {
    if(this.userId) {
      await this.dao.serialize(async db => {
        const {boards, lastEnd} = await this.getBoardOfUserId(db);
        res.json({
          boards,
          requestEnd: this.end,
          lastEnd
        });
      });
    } else {
      await this.dao.serialize(async db => {
        const {boards, lastEnd} = await this.getBoardOfKeyword(db);
        res.json({
          boards,
          requestEnd: this.end,
          lastEnd
        });
      });
    }
  }
}
module.exports = BoardModel;
