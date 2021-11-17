## User API

- GET /api/v1/user

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>start</td><td>Number</td><td>검색 시작점</td><td>0</td><td>✅</td></tr>
<tr><td>end</td><td>Number</td><td>검색 종료점</td><td>0</td><td>✅</td></tr>
<tr><td>keyword</td><td>String</td><td>사용자 닉네임</td><td></td><td>✅</td></tr>
</table>

```js
//request
{ "start": 5, "end": 10 }

//response
{
   "users": [
      { "id": 19, "email": "abc@abc.com", "name": "봉구스시작" },
      { "id": 20, "email": "w@w.com", "name": "test" },
      { "id": 21, "email": "1@1.com", "name": "찬규" },
      { "id": 22, "email": "a@a", "name": "찬규" },
      { "id": 23, "email": "b@b", "name": "봉구스" },
      { "id": 24, "email": "changyu5533@naver.com", "name": "찬규" },
      { "id": 25, "email": "1@1", "name": "1" }
   ],
   "requestEnd": 10,
   "lastEnd": 12
}
```


- GET /api/v1/user/me

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
</table>

```js
//request
{}

//response
{
   "id": 4,
   "name": "ky",
   "email": "temp2",
   "createdAt": "2021-09-29T16:51:34.000Z",
   "modifiedAt": "2021-10-21T08:10:50.000Z",
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
//request
{ "nickname": "ky", "description": "hello, world!" }

//response
{ "complete": true }
```


- GET /api/v1/user/:userId

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:userId</td><td>Number</td><td>사용자 ID</td><td>❌</td><td>❌</td></tr>
</table>

```js
//request
{}

//response
{
   "id": 24,
   "name": "찬규",
   "email": "changyu5533@naver.com",
   "createdAt": "2021-11-08T01:14:18.000Z",
   "modifiedAt": "2021-11-11T13:59:42.000Z",
   "imageUrl": null,
   "description": "안녕하세요 봉구스입니다!",
   "images": [],
   "subscribed": false
}
```


- PUT /api/v1/user/:userId/relation

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:userId</td><td>Number</td><td>사용자 ID</td><td>❌</td><td>❌</td></tr>
</table>

```js
//request
{}

//response
{ "complete": true }
```

- DELETE /api/v1/user/:userId/relation

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>:userId</td><td>Number</td><td>사용자 ID</td><td>❌</td><td>❌</td></tr>
</table>

```js
//request
{}

//response
{ "complete": true }
```
