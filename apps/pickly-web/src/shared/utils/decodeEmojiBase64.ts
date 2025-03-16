import { Buffer } from 'buffer';
const decodeEmojiBase64 = (emojiBase64: string) => {
  const b = Buffer.from(emojiBase64, 'base64');
  return b.toString();
};

export default decodeEmojiBase64;
