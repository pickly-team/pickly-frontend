import { millToString, stringToMill, timeStampToDate } from './timeConverter';

describe('Time utility 함수들에 대한 테스트', () => {
  // 테스트 코드에서 사용할 고정된 현재 시간을 미리 계산합니다.
  const nowTimeStampInMilliseconds = new Date('2023-07-15T00:00:00Z').getTime();
  const oneHourAgo =
    Math.ceil((nowTimeStampInMilliseconds - 3600) / 1000) + 8 * 60 * 60;
  const oneDayAgo = Math.ceil(
    (nowTimeStampInMilliseconds - 24 * 3600 * 1000) / 1000,
  );

  beforeAll(() => {
    // 현재 시간을 고정합니다.
    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => nowTimeStampInMilliseconds);
  });

  afterAll(() => {
    // 시간 고정을 해제합니다.
    jest.spyOn(Date, 'now').mockRestore();
  });

  describe('millToString 함수', () => {
    test('주어진 초(second)가 시간(hh:mm:ss) 형태의 문자열로 변환되어야 한다', () => {
      // Given
      const seconds = 3665;

      // When
      const result = millToString(seconds);

      // Then
      expect(result).toBe('1:01:05');
    });
  });

  describe('stringToMill 함수', () => {
    test('주어진 시간(hh:mm:ss) 문자열이 밀리초로 변환되어야 한다', () => {
      // Given
      const timeString = '1:01:05';

      // When
      const result = stringToMill(timeString);

      // Then
      expect(result).toBe(3665000);
    });
  });

  describe('timeStampToDate 함수', () => {
    test('주어진 타임스탬프가 1시간 전으로 올바르게 한국 시간으로 변환되어야 한다', () => {
      // When
      const result = timeStampToDate(oneHourAgo);

      // Then
      expect(result).toBe('1시간 전');
    });

    test('주어진 타임스탬프가 1일 전으로 올바르게 한국 시간으로 변환되어야 한다', () => {
      // When
      const result = timeStampToDate(oneDayAgo);

      // Then
      expect(result).toBe('1일 전');
    });
  });
});
