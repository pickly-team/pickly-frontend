import { numberWithCommas } from '@/utils/numberWithCommas';

describe('numberWithCommas는', () => {
  it('숫자를 입력받아 쉼표를 포함한 문자열을 반환한다.', () => {
    expect(numberWithCommas(1_000)).toStrictEqual('1,000');
    expect(numberWithCommas(2_000_000)).toStrictEqual('2,000,000');
    expect(numberWithCommas(3_000_000_000)).toStrictEqual('3,000,000,000');
  });

  it('0을 입력받으면 0을 포함한 문자열을 그대로 반환한다.', () => {
    expect(numberWithCommas(0)).toStrictEqual('0');
  });

  it('음수를 입력받으면 음수를 포함한 문자열을 반환한다.', () => {
    expect(numberWithCommas(-1_000)).toStrictEqual('-1,000');
    expect(numberWithCommas(-2_000_000)).toStrictEqual('-2,000,000');
  });

  it('소수점을 포함한 숫자를 입력받으면 소수점을 포함한 문자열을 반환한다.', () => {
    expect(numberWithCommas(2000.001)).toStrictEqual('2,000.001');
    expect(numberWithCommas(-2000.001)).toStrictEqual('-2,000.001');
  });
});
