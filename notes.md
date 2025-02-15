Gen keypair (that works on https://jwt.io/):

```sh copy
openssl genpkey -algorithm EC -pkeyopt ec_paramgen_curve:P-256 -out private.pem && openssl pkey -in private.pem -pubout -out public.pem
```

Payload:

```json copy
{
  "sub": "0x3BEC0A9CeCAd6315860067325c603861adf740b5",
  "ens": "andyoee.yodl.me",
  "iss": "community.yodl.eth",
  "aud": "kitchensink.yodl.eth",
  "exp": 1893456000,
  "some-claim": "some-value"
}
```

Result from https://jwt.io/:

```sh copy
eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIweDNCRUMwQTlDZUNBZDYzMTU4NjAwNjczMjVjNjAzODYxYWRmNzQwYjUiLCJlbnMiOiJhbmR5b2VlLnlvZGwubWUiLCJpc3MiOiJjb21tdW5pdHkueW9kbC5ldGgiLCJhdWQiOiJraXRjaGVuc2luay55b2RsLmV0aCIsImV4cCI6MTg5MzQ1NjAwMCwic29tZS1jbGFpbSI6InNvbWUtdmFsdWUifQ.RX-HAtLuAXUX_1FUbKVcnRLWnBD1Rb3AzjqSy6665IbCimLovWr8ImVKg7kKM7GsxUwS7va7_WKddJEGjq590w
```
