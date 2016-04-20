export default (html) => `
  <!doctype html>
  <html lang='en'>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Recite</title>
      <link href="/styles.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
      <div id="content">${html}</div>
      <script src="/index.js"></script>
    </body>
  </html>
`;
