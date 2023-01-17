import { render, screen } from '@testing-library/react';
import Test from '@/components/Test';

describe('Test tests', () => {
  test('화면에 문구가 보인다.', () => {
    //given
    //when
    render(<Test />);

    //then
    screen.getByText('Test');
  });
});
