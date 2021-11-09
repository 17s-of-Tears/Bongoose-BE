## User API

- GET /api/v1/user

|parameter|type|description|
|---|---|---|
|query.start|Number|검색 시작점|
|query.end|Number|검색 종료점|
|query.keyword|String|사용자 닉네임|

```json
{
  "users": [{
    "id": 4,
    "name": "봉구3499e3"
  },{
    "id": 6,
    "name": "봉구002c17"
  }],
  "requestEnd": 15,
  "lastEnd": 2
}
```

- GET /api/v1/user/me

```json
{
  "name": "봉구3499e3",
  "createdAt": "2021-09-29T16:51:34.000Z",
  "modifiedAt": "2021-09-29T16:51:34.000Z",
  "imageUrl": "img/profile/7f2d121d0c864ff289682b3a119386ae.png",
  "images": [{
      "imageId": 9,
      "imageUrl": "img/board/6e08fbaf13f3444ebef95b22a3036d9c.png",
      "boardId": 13
  },{
      "imageId": 13,
      "imageUrl": "img/board/d7633e39ce8047af8e95f7a754f82811.png",
      "boardId": 13
  }]
}
```

- PUT /api/v1/user/me

<table>
<tr><th>parameter</th><th>type</th><th>description</th><th>optional</th></tr>
<tr><th colspan="4">application/json</th></tr>
<tr><td>nickname</td><td>String</td><td>변경할 닉네임</td><td>✓</td></tr>
<tr><td>description</td><td>String</td><td>변경할 자기소개</td><td>✓</td></tr>
<tr><td>image</td><td>null</td><td>프로필 사진 삭제</td><td>✓</td></tr>
<tr><th colspan="4">multipart/form-data</th></tr>
<tr><td>nickname</td><td>String</td><td>변경할 닉네임</td><td>✓</td></tr>
<tr><td>description</td><td>String</td><td>변경할 자기소개</td><td>✓</td></tr>
<tr><td>image</td><td>File</td><td>변경할 프로필 사진</td><td>✓</td></tr>
</table>

```json
{"complete": true}
```

- GET /api/v1/user/:userId

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:userId</td><td>Number</td><td>사용자 ID</td><td></td><td></td></tr>
</table>

```json
//request
{}

//response
{
   "name": "ky",
   "email": "temp2",
   "createdAt": "2021-09-29T16:51:34.000Z",
   "modifiedAt": "2021-10-21T08:10:50.000Z",
   "imageUrl": "img/profile/7f2d121d0c864ff289682b3a119386ae.png",
   "description": "hello, world!",
   "images": [
      {
         "imageId": 16,
         "imageUrl": "img/board/f0c9bf06b2be4cb484258c7eaf54da6c.png",
         "boardId": 14
      },
      {
         "imageId": 15,
         "imageUrl": "img/board/e63222a124b74cbe87b17bb275a9ce5c.png",
         "boardId": 14
      },
      {
         "imageId": 9,
         "imageUrl": "img/board/6e08fbaf13f3444ebef95b22a3036d9c.png",
         "boardId": 13
      },
      {
         "imageId": 13,
         "imageUrl": "img/board/d7633e39ce8047af8e95f7a754f82811.png",
         "boardId": 13
      },
      {
         "imageId": 6,
         "imageUrl": "img/board/3584cfa1563044b19ea0e4abb1f6f737.png",
         "boardId": 12
      },
      {
         "imageId": 7,
         "imageUrl": "img/board/49650b6ba5814a489348704bfdd291e3.png",
         "boardId": 12
      },
      {
         "imageId": 10,
         "imageUrl": "img/board/3e8289016a474062a43e475be1f8659c.png",
         "boardId": 9
      },
      {
         "imageId": 12,
         "imageUrl": "img/board/b21b63a280db43daa70644790f8ff4a7.png",
         "boardId": 9
      }
   ]
}
```
