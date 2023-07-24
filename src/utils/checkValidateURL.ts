const checkValidateURL = (url: string) => {
  const regex = /https?:\/\/[^\s]+/g;

  const result = url.match(regex);
  return result ? result[0] : '';
};

export default checkValidateURL;
