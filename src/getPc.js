import fetch from 'node-fetch';

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

export default async () => {
  let pc = {};
  return await fetch(pcUrl)
    .then(res => res.json())
    .then((res) => {
      pc = res;
      return pc;
    })
    .catch((err) => {
      console.log('Что-то пошло не так:\n', err);
      return pc;
    });
};
