## Sign API

- GET /api/v1/sign

|parameter|type|description|
|---|---|---|
|cookie.refreshToken|String|refreshToken|

```json
{"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjM0NzI4NzAyLjA3OCwiZXhwIjoxNjM0NzM1OTAyLjA3OCwiZnJlc2giOiI0MDJmNTFjNC05YzI5LTQ2NDctOGMxNi01NWFlYTliZTRlYzQiLCJpc3MiOiJqZWJvbmcifQ.Lg_DWecBGzbGWe71SH6-d2wJq9uk_ihL1itAkEnBEPc"}
```

- POST /api/v1/sign

|parameter|type|description|
|---|---|---|
|body.email|String|사용자 이메일|
|body.password|String|사용자 비밀번호|

```json
{"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjM0NzI4NzAyLjA3OCwiZXhwIjoxNjM0NzM1OTAyLjA3OCwiZnJlc2giOiI0MDJmNTFjNC05YzI5LTQ2NDctOGMxNi01NWFlYTliZTRlYzQiLCJpc3MiOiJqZWJvbmcifQ.Lg_DWecBGzbGWe71SH6-d2wJq9uk_ihL1itAkEnBEPc"}
```

- PUT /api/v1/sign

|parameter|type|description|
|---|---|---|
|body.password|String|사용자 비밀번호|
|body.newPassword|String|변경할 비밀번호|

```json
{"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjM0NzI3NTY5LjUwNSwiZXhwIjoxNjM0NzM0NzY5LjUwNSwiZnJlc2giOiI0MDJmNTFjNC05YzI5LTQ2NDctOGMxNi01NWFlYTliZTRlYzQiLCJpc3MiOiJqZWJvbmcifQ.L81dytXNmSAdqOTH-g5DF4ZXBY1dUsmq4syGM1AAmM0"}
```

- POST /api/v1/sign/up

|parameter|type|description|optional|
|---|---|---|:-:|
|body.email|String|가입자 이메일||
|body.password|String|가입자 비밀번호||
|body.nickname|String|가입자 별명|✓|

```json
{"complete": true}
```
