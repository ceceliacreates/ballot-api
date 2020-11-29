# A Netlify Function Express API

This is the API for the [ballot-cure](https://github.com/ceceliacreates/ballot-cure) app.

The deployed endpoint URL is:

https://hungry-brown-da828c.netlify.app/.netlify/functions/server/ballots

The `ballot-cure` app makes two requests to a single `/ballots/:id` endpoint:

- A GET that returns the ballot matching the passed ID
- A POST request that updates the ballot matching the passed ID (handled by our HTTP.fileUpload() function)

Note: Because we aren’t updating a database, our data is not persistent. This Function is just for demonstration and to process our front-end request.

## CORS-enabled

There is a `cors-enabled` branch that can be used when running the front end locally in a browser.
