import { render, screen } from '@testing-library/react';
import Icon from './Icon';
import IconLoader from './IconLoader';

describe('Icon test', () => {
  test('Icon 컴포넌트가 정상적으로 렌더링된다.', () => {
    //given
    const name = 'check';
    const size = 's';

    //when
    render(<Icon name={name} size={size} />, { wrapper: IconLoader });

    //then
    expect(screen.getByTestId(name)).toBeInTheDocument();
  });
});
