


const Api = (() => {

    const urlRequest = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp,thumbnail_url&access_token=IGQVJVSlVHV1Q2cGVVemdrYUwzOU1SejdxM254a2NzUF9LZATd6aEFFTEcydjB3ODQtTGxzZAFBXbno5M2JMekJNTGlkdEQyQnpZAQnp5X3VlTU5kcTlld0NweTlKd1RXRGJzbEt3OFd3`;
    const getData = () => new Promise((resolve, reject) => {
      fetch(urlRequest)
        .then(response => response.json()
          .then((json) => {
            resolve(json.result);
          })).catch((e) => {
          reject(e);
        });
    });
  

   
    return { getData };
  })();
  
  export default Api;