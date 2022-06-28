# Abusing Cloudflare Workers

This repository contains companion code for the blog post **[MITM at the Edge: Abusing Cloudflare Workers](https://blog.christophetd.fr/abusing-cloudflare-workers/)**.

- [malicious-worker/](./malicious-worker/) contains sample code of a malicious Cloudflare Worker that can be used to exfiltrate data transparently on every request

- [audit-logs/](./audit-logs/) contains sample Cloudflare control plane audit logs that enables to detect the creation of new workers and associations to routes or DNS entries.