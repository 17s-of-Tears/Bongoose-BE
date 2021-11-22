## Board API

### board

- GET /api/v1/board

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>start</td><td>Number</td><td>검색 시작점</td><td>0</td><td>✅</td></tr>
<tr><td>end</td><td>Number</td><td>검색 개수</td><td>15</td><td>✅</td></tr>
<tr><td>keyword</td><td>String</td><td>사용자 닉네임 또는 해시태그</td><td></td><td>✅</td></tr>
<tr><td>userId</td><td>Number</td><td>사용자 ID</td><td></td><td>✅</td></tr>
</table>

```js
//request
{ "start": 1, "end": 3 }

//response
{
   "boards": [
      {
         "id": 131,
         "userName": "찬규",
         "userEmail": "changyu5533@naver.com",
         "images": [
            { "57": "img/board/6ab108bba3094028b59ae4efa7143146.png" },
            { "58": "img/board/b3b1cda1bdab4bd3b78ac3925da99bf8.png" },
            { "59": "img/board/eeb1d6a7cc70427c9ffb59cfad145005.png" }
         ],
         "hashtags": [ "수정", "테스트", "테스트2" ],
         "likes": 0,
         "dislikes": 0,
         "content": "테스트수정          ",
         "createdAt": "2021-11-21T13:26:36.000Z"
      },
      {
         "id": 128,
         "userName": "찬규",
         "userEmail": "changyu5533@naver.com",
         "images": null,
         "hashtags": [ "test" ],
         "likes": 0,
         "dislikes": 0,
         "content": "test ",
         "createdAt": "2021-11-21T13:12:29.000Z"
      },
      {
         "id": 36,
         "userName": "코스삭제",
         "userEmail": "b@b.com",
         "images": null,
         "hashtags": null,
         "likes": 1,
         "dislikes": 0,
         "content": "",
         "createdAt": "2021-11-10T10:47:27.000Z"
      }
   ],
   "requestEnd": 3,
   "lastEnd": 5
}
```

- POST /api/v1/board

<table>
<tr><th colspan="2" rowspan="2">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><td colspan="3">multipart/form-data</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>content</td><td>String</td><td>게시글 본문</td><td>❌</td><td>❌</td></tr>
<tr><td>hashtags</td><td>Array&lt;String&gt;</td><td>해시태그 목록</td><td>[]</td><td>✅</td></tr>
<tr><td>images</td><td>Array&lt;File&gt;</td><td>게시글 사진(최대 4개)</td><td>[]</td><td>✅</td></tr>
</table>

```js
//request
{ "content": "우리집 개냥이들 넘 귀여어어어~~", "hashtags": [ "개냥이", "단또" ] }

//response
{ "boardId": 137 }
```

### board-rating

- GET /api/v1/board/rating

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
</table>

```js
//request
{}

//response
[
   { "hashtag": "1234", "total": 3 },
   { "hashtag": "ㅎㅇ", "total": 2 },
   { "hashtag": "123", "total": 1 }
]
```

### board-content

- GET /api/v1/board/:boardId

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:boardId</td><td>Number</td><td>게시글 번호</td><td>❌</td><td>❌</td></tr>
</table>

```js
//request
{}

//response
{
   "name": "ky",
   "createdAt": "2021-11-21T15:39:03.000Z",
   "content": "우리집 개냥이들 넘 귀여어어어~~",
   "hashtags": [ { "hashtag": "개냥이" }, { "hashtag": "단또" } ],
   "images": [],
   "likes": 0,
   "dislikes": 0,
   "comments": 0
}
```

- PUT /api/v1/board/:boardId

<table>
<tr><th colspan="2" rowspan="2">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><td colspan="3">multipart/form-data</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>content</td><td>String</td><td>게시글 본문</td><td>❌</td><td>❌</td></tr>
<tr><td>hashtags</td><td>Array&lt;String&gt;</td><td>해시태그 목록(덮어쓰기)</td><td>[]</td><td>✅</td></tr>
<tr><td>images</td><td>Array&lt;File&gt;</td><td>게시글 사진(덮어쓰기/최대 4개)</td><td>[]</td><td>✅</td></tr>
</table>

```js
{"complete": true}
```

- DELETE /api/v1/board/:boardId

```js
{"complete": true}
```

### board-like

- GET /api/v1/board/:boardId/like

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:boardId</td><td>Number</td><td>게시글 번호</td><td>❌</td><td>❌</td></tr>
</table>

```js
//request
{}

//response
{ "like": true }
```

- PUT /api/v1/board/:boardId/like

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:boardId</td><td>Number</td><td>게시글 번호</td><td>❌</td><td>❌</td></tr>
<tr><td>like</td><td>Boolean</td><td>true: like, false: dislike</td><td>❌</td><td>❌</td></tr>
</table>

```js
//request
{ "like": true }

//response
{ "complete": true }
```

- DELETE /api/v1/board/:boardId/like

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:boardId</td><td>Number</td><td>게시글 번호</td><td>❌</td><td>❌</td></tr>
</table>

```js
//request
{}

//response
{ "complete": true }
```

### board-comment

- GET /api/v1/board/:boardID/comment

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:boardID</td><td>Number</td><td>게시글 번호</td><td>❌</td><td>❌</td></tr>
<tr><td>page</td><td>Number</td><td>페이지 번호</td><td>0</td><td>✅</td></tr>
<tr><td>pageSize</td><td>Number</td><td>페이지 당 표시 개수</td><td>10</td><td>✅</td></tr>
</table>

```js
//request
{}

//response
{
   "_meta": { "page": { "current": 1, "last": 1 } },
   "comments": [
      {
         "commentID": 3,
         "name": "찬규",
         "email": "changyu5533@naver.com",
         "imageUrl": null,
         "content": "댓글을 달아봐요!",
         "createdAt": "2021-11-22T06:41:38.000Z"
      },
      {
         "commentID": 4,
         "name": "찬규",
         "email": "changyu5533@naver.com",
         "imageUrl": null,
         "content": "댓글 두번째 테스트!",
         "createdAt": "2021-11-22T07:00:14.000Z"
      }
   ]
}
```

- POST /api/v1/board/:boardID/comment

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:boardID</td><td>Number</td><td>게시글 번호</td><td>❌</td><td>❌</td></tr>
<tr><td>content</td><td>String</td><td>답글</td><td>❌</td><td>❌</td></tr>
</table>

```js
//request
{ "content": "좋은 하루입니다." }

//response
{ "complete": true }
```

- PUT /api/v1/board/:boardID/comment/:commentID

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:boardID</td><td>Number</td><td>게시글 번호</td><td>❌</td><td>❌</td></tr>
<tr><td>:commentID</td><td>Number</td><td>댓글 번호</td><td>❌</td><td>❌</td></tr>
<tr><td>content</td><td>String</td><td>내용</td><td>❌</td><td>❌</td></tr>
</table>

```js
//request
{ "content": "좋은 생각입니다." }

//response
{ "complete": true }
```

- DELETE /api/v1/board/:boardID/comment/:commentID

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:boardID</td><td>Number</td><td>게시글 번호</td><td>❌</td><td>❌</td></tr>
<tr><td>:commentID</td><td>Number</td><td>댓글 번호</td><td>❌</td><td>❌</td></tr>
</table>

```js
//request
{}

//response
{ "complete": true }
```
