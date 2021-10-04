## Sign API

- GET /api/v1/sign

|parameter|type|description|
|---|---|---|
|cookie.refreshToken|String|refreshToken|

```json
{"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjMzMzE4NjMzLjkzOCwiZXhwIjoxNjMzMzI1ODMzLjkzOCwiaXNzIjoiamVib25nIn0.VafhsQir9g9ju-WQDPMj9CTrN5KKla637OFjJRYZwU0"}
```

- POST /api/v1/sign

|parameter|type|description|
|---|---|---|
|body.email|String|사용자 이메일|
|body.password|String|사용자 비밀번호|

```json
{"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjMzMzE4NjMzLjkzOCwiZXhwIjoxNjMzMzI1ODMzLjkzOCwiaXNzIjoiamVib25nIn0.VafhsQir9g9ju-WQDPMj9CTrN5KKla637OFjJRYZwU0"}
```

- POST /api/v1/sign/up

|parameter|type|description|
|---|---|---|
|body.email|String|가입자 이메일|
|body.password|String|가입자 비밀번호|

```json
{"complete": true}
```
