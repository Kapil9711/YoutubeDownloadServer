const JSDOM = require("jsdom");
const axios = require("axios");

const url =
  "https://www.youtube.com/embed?v=Zlqf9cuaOBw&list=PLMHt1AwZySBx-5nfkhQckjFd4Q0VwLGJb&index=1&pp=iAQB8AUB";

const getIframe = async (url) => {
  try {
    const response = await axios.get(url);
    // console.log(response.data);
    return `<iframe
        allow="fullscreen;"
        width="100%"
        height="250"
        src=${url}
        
      >
        ${response.data}
      </iframe>`;
  } catch (error) {
    console.log(error);
  }
};

/* <iframe
  allow="fullscreen;"
  width="100%"
  height="250"
  src="https://www.youtube.com/embed?v=Zlqf9cuaOBw&amp;list=PLMHt1AwZySBx-5nfkhQckjFd4Q0VwLGJb&amp;index=1&amp;pp=iAQB8AUB"
></iframe>; */

module.exports = getIframe;
