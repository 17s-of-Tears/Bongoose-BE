## Board API

- GET /api/v1/board

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>start</td><td>Number</td><td>검색 시작점</td><td>0</td><td>✓</td></tr>
<tr><td>end</td><td>Number</td><td>검색 종료점</td><td>15</td><td>✓</td></tr>
<tr><td>keyword</td><td>Number</td><td>사용자 닉네임 또는 해시태그</td><td></td><td>✓</td></tr>
<tr><td>userId</td><td>Number</td><td>사용자 ID</td><td></td><td>✓</td></tr>
</table>

```json
//request
{ "start": 2, "end": 3 }

//response
{
   "boards": [
      {
         "id": 33,
         "userName": "코스삭제",
         "userEmail": "b@b.com",
         "content": "네트워크",
         "createdAt": "2021-11-07T15:07:48.000Z"
      },
      {
         "id": 32,
         "userName": "코스삭제",
         "userEmail": "b@b.com",
         "content": "봉구스는 위대",
         "createdAt": "2021-11-07T15:07:29.000Z"
      },
      {
         "id": 31,
         "userName": "찬규",
         "userEmail": "a@a",
         "content": "333333333333333333333",
         "createdAt": "2021-11-07T14:54:36.000Z"
      }
   ],
   "requestEnd": "3",
   "lastEnd": 29
}
```

- POST /api/v1/board

<table>
<tr><th colspan="2" rowspan="2">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><td colspan="3">multipart/form-data</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>content</td><td>String</td><td>게시글 본문</td><td></td><td></td></tr>
<tr><td>content</td><td>Array&lt;String&gt;</td><td>해시태그 목록</td><td>[]</td><td>✓</td></tr>
<tr><td>content</td><td>Array&lt;File&gt;</td><td>게시글 사진(최대 4개)</td><td>[]</td><td>✓</td></tr>
</table>

```json
{"boardId": 2}
```

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

- GET /api/v1/board/:boardId

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:boardId</td><td>Number</td><td>게시글 번호</td><td></td><td></td></tr>
</table>

```json
//request
{}

//response
{
   "name": "찬규",
   "createdAt": "2021-11-07T14:38:22.000Z",
   "content": "test",
   "hashtags": [],
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
|body.hashtags|Array<String>|해시태그 목록(덮어쓰기)|

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

- GET /api/v1/board/:boardId/like

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:boardId</td><td>Number</td><td>게시글 번호</td><td></td><td></td></tr>
</table>

```json
//request
{}

//response
{ "like": true }
```

- PUT /api/v1/board/:boardId/like

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:boardId</td><td>Number</td><td>게시글 번호</td><td></td><td></td></tr>
<tr><td>like</td><td>Boolean</td><td>true: like, false: dislike</td><td></td><td></td></tr>
</table>

```json
//request
{ "like": true }

//response
{ "complete": true }
```

- DELETE /api/v1/board/:boardId/like

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:boardId</td><td>Number</td><td>게시글 번호</td><td></td><td></td></tr>
</table>

```json
//request
{}

//response
{ "complete": true }
```
