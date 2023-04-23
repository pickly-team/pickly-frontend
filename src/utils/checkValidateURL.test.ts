import checkValidateURL from './checkValidateURL';

describe('checkValidateURL', () => {
  it('should return true if url is valid', () => {
    expect(checkValidateURL('https://www.google.com')).toBe(true);
  });
  it('should return false if url is invalid', () => {
    expect(checkValidateURL('www.google.com')).toBe(false);
  });
});
