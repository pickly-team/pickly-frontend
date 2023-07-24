import checkValidateURL from './checkValidateURL';

describe('checkValidateURL', () => {
  it('일반 url의 경우에 대한 테스트.', () => {
    expect(checkValidateURL('https://www.google.com')).toBe(
      'https://www.google.com',
    );
  });
  it('앞에 https가 아닌 경우 https만 파싱 한다.', () => {
    expect(
      checkValidateURL(
        '[Kotlin] 코틀린을 쌈싸먹어 보자 (2) - 계산기 프로그램 만들기 - https://hogwart-scholars.tistory.com/m/entry/Kotlin-%EC%BD%94%ED%8B%80%EB%A6%B0%EC%9D%84-%EC%8C%88%EC%8B%B8%EB%A8%B9%EC%96%B4-%EB%B3%B4%EC%9E%90-2-%EA%B3%84%EC%82%B0%EA%B8%B0-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-%EB%A7%8C%EB%93%A4%EA%B8%B0',
      ),
    ).toBe(
      'https://hogwart-scholars.tistory.com/m/entry/Kotlin-%EC%BD%94%ED%8B%80%EB%A6%B0%EC%9D%84-%EC%8C%88%EC%8B%B8%EB%A8%B9%EC%96%B4-%EB%B3%B4%EC%9E%90-2-%EA%B3%84%EC%82%B0%EA%B8%B0-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-%EB%A7%8C%EB%93%A4%EA%B8%B0',
    );
  });
});
