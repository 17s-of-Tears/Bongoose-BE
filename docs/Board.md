## Board API

- GET /api/v1/board

|parameter|type|description|
|---|---|---|
|query.start|Number|검색 시작점|
|query.end|Number|검색 종료점|
|query.keyword|String|사용자 닉네임 또는 해시태그|

```json
{
  "boards": [{
    "id": 2,
    "userName": "봉구3499e3",
    "content": "우리집 개냥이들 넘 귀여어어어~~"
  }],
  "requestEnd": 15,
  "lastEnd": 1
}
```

- POST /api/v1/board

|parameter|type|description|
|---|---|---|
|body.content|String|게시글 본문|
|body.hashtags|Array<String>|해시태그 목록|

```json
{"boardId": 2}
```

- GET /api/v1/board/:boardId

```json
{
  "name": "봉구3499e3",
  "createdAt": "2021-10-01T01:32:36.000Z",
  "content": "우리집 개냥이들 넘 귀여어어어~~",
  "hashtags": [{
    "hashtag": "고양이"
  },{
    "hashtag": "개냥이"
  }],
  "images": [],
  "likes": 0,
  "dislikes": 0,
  "comments": 0
}
```

- PUT /api/v1/board/:boardId

|parameter|type|description|
|---|---|---|
|body.content|String|게시글 본문|
|body.addHashtags|Array<String>|추가할 해시태그 목록|
|body.deleteHashtags|Array<String>|삭제할 해시태그 목록|

```json
{"boardId": 2, "complete": true}
```

- DELETE /api/v1/board/:boardId

```json
{"boardId": 2, "complete": true}
```
