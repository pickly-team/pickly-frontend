import { render, screen } from '@testing-library/react';
import BottomSheet from './BottomSheet';

describe('BottomSheet test', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  it('BottomSheet 컴포넌트가 정상적으로 렌더링된다.', () => {
    //given
    const TEXT = 'Hello World';

    //when
    render(<BottomSheet open={true}>{TEXT}</BottomSheet>);

    //then
    expect(screen.getByText(TEXT)).toBeInTheDocument();
  });
  it('BottomSheet 컴포넌트가 정상적으로 닫힌다.', () => {
    //given
    const TEXT = 'Hello World';

    //when
    render(<BottomSheet open={false}>{TEXT}</BottomSheet>);

    //then
    expect(screen.queryByText(TEXT)).not.toBeInTheDocument();
  });
});
