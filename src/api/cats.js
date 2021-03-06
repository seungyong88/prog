const API_ENDPOINT = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com';

//https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev
//https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/:nodeId

const request = async url => {
  try {
    const data = await fetch(url);
    return data.json();
  } catch(e) {
    console.warn(e);
  }
}

const api = {
    // git config --global user.name "홍길동"
   // git config --global user.email "support@webisfree.com"
//   fetchCats: async keyword => {
//     const breeds = (await request(`${API_ENDPOINT}/breeds/search?q=${keyword}`)).map(breed => breed.id);
//     const requests = breeds.map(breed => request(`${API_ENDPOINT}/images/search?limit=20&breed_ids=${breed}`));

//     return Promise.all(requests).then(responses => {
//       let result = [];
//       responses.forEach(response => {
//         result = result.concat(response)
//       });

//       return result;
//     })
//   },
  rootData: () => {
    return request(`${API_ENDPOINT}/dev`);
  }
}

export default api;

