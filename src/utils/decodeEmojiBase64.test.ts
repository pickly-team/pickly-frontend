import decodeEmojiBase64 from '@/utils/decodeEmojiBase64';

describe('decodeEmojiBase64', () => {
  it('base64로 인코딩된 emoji string 을올바르게 디코딩 한다.', () => {
    const base64String = '8J+YgQ==';
    const decodedString = decodeEmojiBase64(base64String);
    expect(decodedString).toEqual('😁');
  });

  it('빈문자열일 경우 빈 스트링을 반환한다.', () => {
    const base64String = '';
    const decodedString = decodeEmojiBase64(base64String);
    expect(decodedString).toEqual('');
  });
});
