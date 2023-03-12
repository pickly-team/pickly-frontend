import { render } from '@/test/utils';
import Header from '@/common-ui/Header/Header';
import { screen } from '@testing-library/react';
import Button from '@/common-ui/Button';

describe('Header test', () => {
  it('showBackButton=true 이면 > 뒤로가기 버튼이 보인다.', () => {
    //given
    const showBackButton = true;

    //when
    render(<Header showBackButton={showBackButton} />);

    //then
    screen.getByText('back');
  });
  it('title 이 보인다.', () => {
    //given
    const title = '헤더 제목';

    //when
    render(<Header title={title} />);

    //then
    screen.getByText(title);
  });
  it('right button 이 보인다.', () => {
    //given
    const rightButton = <Button>버튼</Button>;

    //when
    render(<Header rightButton={rightButton} />);

    //then
    screen.getByText('버튼');
  });
});
