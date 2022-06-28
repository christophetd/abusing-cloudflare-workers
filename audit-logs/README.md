# Sample Cloudflare audit logs

This folder contains sample events from Cloudflare control plane audit logs.

## Events related to Workers

|           **Event**           | **Event code** |
|:-----------------------------:|:--------------:|
|    A new Worker was created   |  [script_create](./workers/script_create.json) |
| A Worker was bound to a route |  [route_create](./workers/route_create.json)  |
|    A DNS record was created   |     [rec_add](./workers/rec_add.json)    |

## Other events

|                       **Event**                       | **Event code** |
|:-----------------------------------------------------:|:--------------:|
| Successful authentication to the Cloudflare dashboard |      [login](./others/login.json)    |
|         The account-wide API token was viewed         |  [API_key_view](./others/API_key_view.json)  |
|       An user API token was created (and viewed)      |  [token_create](./others/token_create.json)  |
|       An user API token was rotated (and viewed)      |  [token_roll](./others/token_roll.json) |