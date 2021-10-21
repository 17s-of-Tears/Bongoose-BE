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

<table>
<tr><th>parameter</th><th>type</th><th>description</th><th>optional</th></tr>
<tr><th colspan="4">application/json</th></tr>
<tr><td>content</td><td>String</td><td>게시글 본문</td><td></td></tr>
<tr><td>hashtags</td><td>Array&lt;String&gt;</td><td>해시태그 목록</td><td>✓</td></tr>
<tr><th colspan="4">multipart/form-data</th></tr>
<tr><td>content</td><td>String</td><td>게시글 본문</td><td></td></tr>
<tr><td>hashtags</td><td>Array&lt;String&gt;</td><td>해시태그 목록</td><td>✓</td></tr>
<tr><td>images</td><td>Array&lt;File&gt;</td><td>게시글 사진(최대 4개)</td><td>✓</td></tr>
</table>

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
  "images": [{
      "id": 9,
      "imageUrl": "img/board/6e08fbaf13f3444ebef95b22a3036d9c.png"
  },{
      "id": 13,
      "imageUrl": "img/board/d7633e39ce8047af8e95f7a754f82811.png"
  }],
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
{"complete": true}
```

- DELETE /api/v1/board/:boardId

```json
{"complete": true}
```

- PUT /api/v1/board/:boardId/image

<table>
<tr><th>parameter</th><th>type</th><th>description</th></tr>
<tr><th colspan="3">multipart/form-data</th></tr>
<tr><td>images</td><td>Array&lt;File&gt;</td><td>게시글 사진(최대 4개)</td></tr>
</table>

- DELETE /api/v1/board/:boardId/image/:imageId

```json
{"complete": true}
```
