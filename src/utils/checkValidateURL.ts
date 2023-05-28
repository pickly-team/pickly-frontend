const checkValidateURL = (url: string) => {
  const urlRegex =
    '^((http|https)://)[-a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)$';
  const regex = new RegExp(urlRegex);
  return regex.test(url);
};

export default checkValidateURL;
