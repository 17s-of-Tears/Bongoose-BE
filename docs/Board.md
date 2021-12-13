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
// request
{ "url": "/api/v1/board", "data": { "start": 1, "end": 3 } }
// response
{
   "boards": [
      {
         "id": 206,
         "userId": 21,
         "userName": "찬규",
         "userEmail": "1@1.com",
         "userImageUrl": null,
         "images": null,
         "hashtags": null,
         "likes": 2,
         "dislikes": 0,
         "content": "test",
         "createdAt": "2021-12-11T14:23:32.000Z"
      },
      {
         "id": 205,
         "userId": 24,
         "userName": "찬규",
         "userEmail": "changyu5533@naver.com",
         "userImageUrl": "img/profile/e9e3b4cf25734429890bb02ac9b1cf0b.png",
         "images": [
            { "176": "img/board/6451636620f1492e8761f4ef149539d2.png" },
            { "177": "img/board/5447081e329644cf86ffdf347003fe6f.png" }
         ],
         "hashtags": [ "게시글", "첫번째" ],
         "likes": 0,
         "dislikes": 0,
         "content": "안녕하세요  ",
         "createdAt": "2021-11-29T14:08:12.000Z"
      },
      {
         "id": 190,
         "userId": 30,
         "userName": "닉네임변경",
         "userEmail": "test@test.com",
         "userImageUrl": "img/profile/c427fcb2118c48d482ccd660c37d1c1e.png",
         "images": [
            { "162": "img/board/123b77c3bd534a2fbb7c6e3a9aff7175.png" },
            { "163": "img/board/a31b68fc40ff47e49d1b5967ac8b7d5d.png" }
         ],
         "hashtags": [ "test", "test2" ],
         "likes": 4,
         "dislikes": 4,
         "content": "수정test   ",
         "createdAt": "2021-11-29T01:54:09.000Z"
      }
   ],
   "requestEnd": 3,
   "lastEnd": 18
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
// request
{
  "url": "/api/v1/board",
  "data": { "content": "우리집 개냥이들 넘 귀여어어어~~", "hashtags": [ "개냥이", "단또" ] }
}
// response
{ "boardId": 176 }
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
<tr><th colspan="2" rowspan="2">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><td colspan="3">multipart/form-data</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:boardId</td><td>Number</td><td>게시글 번호</td><td>❌</td><td>❌</td></tr>
</table>


```js
// request
{ "url": "/api/v1/board/175", "data": {} }
// response
{
   "userId": 4,
   "userImageUrl": "img/profile/7f2d121d0c864ff289682b3a119386ae.png",
   "name": "ky",
   "createdAt": "2021-11-27T18:45:49.000Z",
   "content": "사진 덮어쓰기",
   "hashtags": [ { "hashtag": "개냥이" }, { "hashtag": "단또" } ],
   "images": [
      { "id": 98, "imageUrl": "img/board/9bea8edaa40e4fbb93d121a83aecc931.png" },
      { "id": 100, "imageUrl": "img/board/34ecc6fbda47493cb6f76fecebefdbd9.png" }
   ],
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
<tr><td>:boardId</td><td>Number</td><td>게시글 번호</td><td>❌</td><td>❌</td></tr>
<tr><td>content</td><td>String</td><td>게시글 본문</td><td>❌</td><td>❌</td></tr>
<tr><td>hashtags</td><td>Array&lt;String&gt;</td><td>해시태그 목록(덮어쓰기)</td><td>[]</td><td>✅</td></tr>
<tr><td>images</td><td>Array&lt;File&gt;</td><td>게시글 사진 추가(기존 포함 최대 4개)</td><td>[]</td><td>✅</td></tr>
<tr><td>overwrite</td><td>Array&lt;Number&gt;</td><td>남겨둘 기존 사진 ID</td><td>[]</td><td>✅</td></tr>
</table>


```js
// request
{
  "url": "/api/v1/board/175",
  "data": { "overwrite": [ 98, 100 ], "content": "사진 덮어쓰기", "hashtags": [ "개냥이", "단또" ] }
}
// response
{ "complete": true }
```

- DELETE /api/v1/board/:boardId

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:boardId</td><td>Number</td><td>게시글 번호</td><td>❌</td><td>❌</td></tr>
</table>


```js
// request
{ "url": "/api/v1/board/176", "data": {} }
// response
{ "complete": true }
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
