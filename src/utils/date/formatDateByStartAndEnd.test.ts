import formatDateByStartAndEnd from '@/utils/date/formatDateByStartAndEnd';

describe('formatDateByStartAndEnd test', () => {
  test('start, end 차이가 1분 미만이면 > 방금전 으로 표시된다.', () => {
    //given
    const start = new Date('2020-01-01 00:00:00');
    const end = new Date('2020-01-01 00:00:30');

    //when
    const result = formatDateByStartAndEnd(start, end);

    //then
    expect(result).toBe('방금전');
  });
  test('start, end 차이가 1분 이상 1시간 미만이면 > ${minutes}분전 으로 표시된다.', () => {
    //given
    const start = new Date('2020-01-01 00:00:00');
    const end = new Date('2020-01-01 00:01:00');

    //when
    const result = formatDateByStartAndEnd(start, end);

    //then
    expect(result).toBe('1분전');
  });
  test('start, end 차이가 1시간 이상 1일 미만이면 > ${hours}시간전 으로 표시된다.', () => {
    //given
    const start = new Date('2020-01-01 00:00:00');
    const end = new Date('2020-01-01 01:00:00');

    //when
    const result = formatDateByStartAndEnd(start, end);

    //then
    expect(result).toBe('1시간전');
  });
  test('start, end 차이가 1일 이상 1년 미만이면 > ${days}일전 으로 표시된다.', () => {
    //given
    const start = new Date('2020-01-01 00:00:00');
    const end = new Date('2020-01-02 00:00:00');

    //when
    const result = formatDateByStartAndEnd(start, end);

    //then
    expect(result).toBe('1일전');
  });
  test('start, end 차이가 1년 이상이면 > ${years}년전 으로 표시된다.', () => {
    //given
    const start = new Date('2020-01-01 00:00:00');
    const end = new Date('2021-01-01 00:00:00');

    //when
    const result = formatDateByStartAndEnd(start, end);

    //then
    expect(result).toBe('1년전');
  });
});
