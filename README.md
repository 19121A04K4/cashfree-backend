# Cashfree Payment Link Generator

## How to Use

1. Add your App ID and Secret Key in Railway environment variables:
   - `CASHFREE_APP_ID`
   - `CASHFREE_SECRET_KEY`

2. Deploy this project on Railway.

3. Send POST request to `/create-payment-link` with this JSON:

```
{
  "customerPhone": "9876543210",
  "product": "T-shirt",
  "size": "L",
  "quantity": 2
}
```

4. It will return a `link_url` you can redirect customers to for payment.