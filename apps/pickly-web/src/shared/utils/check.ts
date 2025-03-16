export const 특수문자_확인 = (nickname: string): boolean => {
  // 한글 전체 범위, 알파벳, 숫자만 허용하는 정규 표현식
  const regex = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]+$/;
  return regex.test(nickname);
};

export const 특수문자_제거 = (nickname: string): string => {
  return nickname.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]/g, '');
};
