import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button test', () => {
  it('Button 컴포넌트가 정상적으로 렌더링된다.', () => {
    //given
    const TEXT = 'Hello World';

    //when
    render(<Button>{TEXT}</Button>);

    //then
    expect(screen.getByText(TEXT)).toBeInTheDocument();
  });
  it('Button 클릭 테스트', () => {
    //given
    const onClick = jest.fn();

    //when
    render(<Button onClick={onClick}>Hello World</Button>);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    //then
    expect(onClick).toHaveBeenCalled();
  });
});
