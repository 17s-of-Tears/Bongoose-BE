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
  "imageUrl": null,
  "images": []
}
```
