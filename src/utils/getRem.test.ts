import getRem from '@/utils/getRem';

describe('getRem test', () => {
  it('px 숫자를 입력하면 > rem 단위로 변환한 문자열을 반환한다.', () => {
    //given
    const PIXEL = 10;

    //when
    const result = getRem(PIXEL);

    //then
    expect(result).toEqual('0.625rem');
  });
  it('px 숫자를 여러개 입력하면 > rem 단위로 변환한 단위를 띄어쓰기로 구분된 문자열로 반환한다.', () => {
    //given
    const PIXEL1 = 10;
    const PIXEL2 = 100;

    //when
    const result = getRem(PIXEL1, PIXEL2);

    //then
    expect(result).toEqual('0.625rem 6.25rem');
  });
});
