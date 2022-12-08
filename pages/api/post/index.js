import axios from 'axios';
import jsdom from 'jsdom';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const hrefByLink = (document) => {
  for (const link of document.getElementsByTagName('link')) {
    if (link.rel === 'shortcut icon') return link.href;
  }
};

const hrefByMeta = (document) => {
  for (const link of document.getElementsByTagName('meta')) {
    if (link.content.match(/(.png$|.jpeg$|.jpg$|.ico$)/)) return link.content;
  }
};

const promiseResponse = async (req) => {
  const url = `http://${req.body.domain}`;
  try {
    return await axios.get(url);
  } catch (err) {
    throw new Error('Unable to get a response.');
  }
};

export default async function handler(req, res) {
  const clonedBody = JSON.parse(JSON.stringify(req.body));
  promiseResponse(req)
    .then((r) => {
      const htmlDoc = new jsdom.JSDOM(r.data);
      let href;
      if (!href) href = hrefByLink(htmlDoc.window.document);
      if (!href) href = hrefByMeta(htmlDoc.window.document);
      clonedBody.favicon = href;
      return req.body;
    })
    .catch((err) => console.log(err));
  await sleep(2000);
  res.status(200).json(clonedBody);
}
