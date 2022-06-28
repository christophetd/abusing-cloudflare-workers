# Sample malicious Cloudflare Worker

This sample Worker will:

* Exfiltrate any `Authorization` and `Cookie` headers to a remote, attacker-controlled server
* Inject a malicious JavaScript script in all HTML responses

## Deploying

Using the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/get-started/):

```bash
wrangler publish worker.js
```