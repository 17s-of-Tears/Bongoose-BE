## User API

### user

- GET /api/v1/user

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>start</td><td>Number</td><td>검색 시작점</td><td>0</td><td>✅</td></tr>
<tr><td>end</td><td>Number</td><td>검색 개수</td><td>0</td><td>✅</td></tr>
<tr><td>keyword</td><td>String</td><td>사용자 닉네임</td><td></td><td>✅</td></tr>
<tr><td>mysubscribe</td><td>Number</td><td>내가 구독한 사용자만 검색(0 또는 1)</td><td>0</td><td>✅</td></tr>
</table>


```js
// request
{ "url": "/api/v1/user", "data": { "start": 1 } }
// response
{
   "users": [
      { "id": 15, "email": "b@b.com", "name": "코스삭제", "imageUrl": null, "description": "ㅎㅇㅎㅇㅎㅇ" },
      {
         "id": 16,
         "email": "test1@test.com",
         "name": "1234",
         "imageUrl": null,
         "description": ""
      },
      { "id": 17, "email": "test@1.com", "name": "테스트1", "imageUrl": null, "description": "" },
      { "id": 18, "email": "q@q", "name": "제봉", "imageUrl": null, "description": "" },
      { "id": 19, "email": "abc@abc.com", "name": "봉구스시작", "imageUrl": null, "description": "" },
      { "id": 20, "email": "w@w.com", "name": "test", "imageUrl": null, "description": "" },
      { "id": 21, "email": "1@1.com", "name": "찬규", "imageUrl": null, "description": "" },
      { "id": 22, "email": "a@a", "name": "찬규", "imageUrl": null, "description": "" },
      { "id": 23, "email": "b@b", "name": "봉구스", "imageUrl": null, "description": "" },
      {
         "id": 24,
         "email": "changyu5533@naver.com",
         "name": "찬규",
         "imageUrl": null,
         "description": "안녕하세요 봉구스입니다!"
      },
      { "id": 25, "email": "1@1", "name": "1", "imageUrl": null, "description": "" }
   ],
   "requestEnd": 15,
   "lastEnd": 12
}
```

### user-me

- GET /api/v1/user/me

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
</table>


```js
// request
{ "url": "/api/v1/user/me", "data": {} }
// response
{
   "id": 4,
   "name": "ky",
   "email": "temp2@boongoose.com",
   "createdAt": "2021-09-29T16:51:34.000Z",
   "modifiedAt": "2021-11-22T02:56:27.000Z",
   "imageUrl": "img/profile/7f2d121d0c864ff289682b3a119386ae.png",
   "description": "hello, world!",
   "images": []
}
```

- PUT /api/v1/user/me

<table>
<tr><th colspan="2" rowspan="2">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><td colspan="3">multipart/form-data</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>nickname</td><td>String</td><td>변경할 닉네임</td><td></td><td>✅</td></tr>
<tr><td>description</td><td>String</td><td>변경할 자기소개</td><td></td><td>✅</td></tr>
<tr><td>image</td><td>File</td><td>변경할 프로필 사진</td><td></td><td>✅</td></tr>
</table>


```js
// request
{ "url": "/api/v1/user/me", "data": { "nickname": "ky", "description": "hello, world!" } }
// response
{ "complete": true }
```

### user-detail

- GET /api/v1/user/:userId

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:userId</td><td>Number</td><td>사용자 ID</td><td>❌</td><td>❌</td></tr>
</table>


```js
// request
{ "url": "/api/v1/user/24", "data": {} }
// response
{
   "id": 24,
   "name": "찬규",
   "email": "changyu5533@naver.com",
   "createdAt": "2021-11-08T01:14:18.000Z",
   "modifiedAt": "2021-11-11T13:59:42.000Z",
   "imageUrl": null,
   "description": "안녕하세요 봉구스입니다!",
   "images": [
      {
         "imageId": 64,
         "imageUrl": "img/board/dc6d8ee00f4946819afd84d34ecb32a9.png",
         "boardId": 139
      },
      {
         "imageId": 61,
         "imageUrl": "img/board/68a705cb00b24d69b8a899bad2ebf5a8.png",
         "boardId": 133
      },
      {
         "imageId": 63,
         "imageUrl": "img/board/a009df7872d2402aaeb25d0bc64f082c.png",
         "boardId": 133
      },
      {
         "imageId": 62,
         "imageUrl": "img/board/cd983b37db944862a589df836682a2e3.png",
         "boardId": 133
      }
   ],
   "subscribed": false
}
```

### user-relation

- PUT /api/v1/user/:userId/relation

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:userId</td><td>Number</td><td>사용자 ID</td><td>❌</td><td>❌</td></tr>
</table>


```js
// request
{ "url": "/api/v1/user/24/relation", "data": {} }
// response
{ "complete": true }
```

- DELETE /api/v1/user/:userId/relation

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:userId</td><td>Number</td><td>사용자 ID</td><td>❌</td><td>❌</td></tr>
</table>


```js
// request
{ "url": "/api/v1/user/24/relation", "data": {} }
// response
{ "complete": true }
```

### user-random

- GET /api/v1/user/random

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
</table>


```js
// request
{ "url": "/api/v1/user/random", "data": {} }
// response
[
   { "id": 25, "email": "1@1", "name": "1", "imageUrl": null, "description": "" },
   { "id": 17, "email": "test@1.com", "name": "테스트1", "imageUrl": null, "description": "" },
   { "id": 22, "email": "a@a", "name": "찬규", "imageUrl": null, "description": "" }
]
```
