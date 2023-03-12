import objectKeysToCamelCase from '@/utils/objectKeysToCamelCase';

describe('objectKeysToCamelCase', () => {
  test('snake case로 되어있는 object key를 camel case로 변환해 반환한다.', () => {
    //given
    const SNAKE_OBJECT: Record<string, unknown> = {
      my_name: 'hello',
      my_like: 1,
      age: 10,
    };

    //when
    const result = objectKeysToCamelCase(SNAKE_OBJECT);

    //then
    expect(result).toEqual({
      myName: 'hello',
      myLike: 1,
      age: 10,
    });
  });
});
