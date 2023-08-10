const checkValidateURL = (url: string) => {
  const regex =
    /https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;()*\p{Script=Hangul}]+/gu;

  const result = url.match(regex);
  return result ? result[0] : '';
};

export default checkValidateURL;
