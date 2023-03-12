import { KeysToCamelCase } from '@/utils/KeysToCamelCase';
import objectKeysToCamelCase from '@/utils/objectKeysToCamelCase';

describe('KeysToCamelCase', () => {
  it('[KeysToCamelCase] 은 object type의 key를 camel case로 변환한 유틸리티 타입이다.', () => {
    //given
    interface SeverBookMarkItem {
      id: string;
      is_read: boolean;
      img_src: string;
    }
    const serverBookMarkItem: SeverBookMarkItem = {
      id: '1',
      is_read: true,
      img_src: 'img.jpg',
    };

    //when
    type ClientBookMarkItem = KeysToCamelCase<SeverBookMarkItem>;

    //then
    const clientBookMarkItem: ClientBookMarkItem = {
      id: '1',
      isRead: true,
      imgSrc: 'img.jpg',
    };

    //유틸리티 타입과는 무관한 테스팅
    expect(objectKeysToCamelCase(serverBookMarkItem)).toEqual(
      clientBookMarkItem,
    );
  });
});
