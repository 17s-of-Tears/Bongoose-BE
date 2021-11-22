## Sign API

### sign

- POST /api/v1/sign

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>email</td><td>String</td><td>사용자 이메일</td><td>❌</td><td>❌</td></tr>
<tr><td>password</td><td>String</td><td>사용자 비밀번호</td><td>❌</td><td>❌</td></tr>
</table>


```js
// request
{ "url": "/api/v1/sign", "data": { "email": "temp2@boongoose.com", "password": "passw0rd" } }
// response
{
   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjM3NTgzMTMxLjAzLCJleHAiOjE2Mzc1OTAzMzEuMDMsImZyZXNoIjoiZTdjY2RkZDItNmVhOC00MWY0LWI0YTQtMzExYjIzN2U2YjhlIiwiaXNzIjoiamVib25nIn0.e8ZiMgj1WAfGPe9jpeopUKwxBub3MwznDQt7KNfZVcs"
}
```

- GET /api/v1/sign

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>refreshToken</td><td>String</td><td>🍪: 리프레시 토큰</td><td>❌</td><td>❌</td></tr>
</table>


```js
// request
{ "url": "/api/v1/sign", "data": {} }
// response
{
   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjM3NTgzMTMxLjA3OCwiZXhwIjoxNjM3NTkwMzMxLjA3OCwiZnJlc2giOiJlN2NjZGRkMi02ZWE4LTQxZjQtYjRhNC0zMTFiMjM3ZTZiOGUiLCJpc3MiOiJqZWJvbmcifQ.clW7RILHNGp8QLs3WkU7vSri2XQFqBP5CsGQoJdwAUM"
}
```

- PUT /api/v1/sign

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>password</td><td>String</td><td>사용자 비밀번호</td><td>❌</td><td>❌</td></tr>
<tr><td>newPassword</td><td>String</td><td>변경할 비밀번호</td><td>❌</td><td>❌</td></tr>
</table>


```js
// request
{ "url": "/api/v1/sign", "data": { "password": "passw0rd", "newPassword": "12345678" } }
// response
{
   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjM3NTgzMTMxLjQzNSwiZXhwIjoxNjM3NTkwMzMxLjQzNSwiZnJlc2giOiJmNWFlMjAyMy1hNWVlLTQ4OWItOTdiMC1lMjU5Y2ZiOWIxZWEiLCJpc3MiOiJqZWJvbmcifQ.jhbBfOsahSt6ftiisMsHBzoRWaPLD60PGDEGYjUP6hw"
}
```

### sign-up

- POST /api/v1/sign/up

<table>
<tr><th colspan="2" rowspan="1">허용 타입</th><td colspan="3">application/json</td></tr>
<tr><th>parameter</th><th>type</th><th>description</th><th>default</th><th>optional</th>
<tr><td>email</td><td>String</td><td>가입자 이메일</td><td>❌</td><td>❌</td></tr>
<tr><td>password</td><td>String</td><td>가입자 비밀번호</td><td>❌</td><td>❌</td></tr>
<tr><td>nickname</td><td>String</td><td>가입자 별명</td><td>random()</td><td>✅</td></tr>
</table>


```js
// request
{ "url": "/api/v1/sign/up", "data": { "email": "temp4@boongoose.com", "password": "12345678" } }
// response
{ "complete": true }
```
