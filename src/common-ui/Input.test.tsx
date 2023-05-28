import { render } from '@/test/utils';
import { fireEvent, screen } from '@testing-library/react';
import { useState } from 'react';
import Input, { InputProps } from './Input';

describe('Input Test', () => {
  it('Input 컴포넌트는 type에 따라 input 태그를 렌더링한다.', () => {
    //given
    const InputComponent = () => {
      const [value, setValue] = useState('');
      const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      };
      return <Input onChange={onChange} value={value} />;
    };

    //when
    render(<InputComponent />);
    //then
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveStyle('border: none');
  });
  it('Input 컴포넌트 입력 테스트', () => {
    //given
    const InputComponent = () => {
      const [value, setValue] = useState('');
      const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      };
      return <Input onChange={onChange} value={value} />;
    };

    //when
    render(<InputComponent />);

    //then
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(input).toHaveAttribute('value', 'Hello');
  });
  it('Input border 테스트', () => {
    //given
    const InputComponent = () => {
      const [value, setValue] = useState('안녕하세요');
      const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      };
      return (
        <Input
          onChange={onChange}
          border={{ borderRadius: 10, borderWidth: 3, color: 'grey900' }}
          value={value}
        />
      );
    };

    //when
    render(<InputComponent />);

    //then
    const input = screen.getByRole('textbox');
    expect(input).toHaveStyle('border: 3px solid #212121 ');
    expect(input).toHaveStyle('border-radius: 10rem');
  });
  it('Input focus 테스트', () => {
    //given
    const placeholderText = '입력 테스트';

    const InputComponent = () => {
      const [value, setValue] = useState('안녕하세요');
      const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      };
      return (
        <Input
          onChange={onChange}
          value={value}
          placeholder={placeholderText}
        />
      );
    };

    //when
    render(<InputComponent />);

    //then
    const input = screen.getByPlaceholderText(placeholderText);
    input.focus();

    expect(input).toHaveFocus(); // throws
    expect(input).toHaveStyle('color: #ffffff');
    expect(input).toHaveStyle('background-color: #424242');
  });
  it('Input focus 테스트 > focus Props 존재', () => {
    //given
    const placeholderText = '입력 테스트';
    const focus: Pick<InputProps, 'focusTheme'> = {
      focusTheme: {
        color: 'primary',
        backgroundColor: 'grey900',
      },
    };
    const InputComponent = () => {
      const [value, setValue] = useState('안녕하세요');
      const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      };
      return (
        <Input
          onChange={onChange}
          focusTheme={focus.focusTheme}
          placeholder={placeholderText}
          value={value}
        />
      );
    };

    //when
    render(<InputComponent />);

    //then
    const input = screen.getByPlaceholderText(placeholderText);
    input.focus();
    expect(input).toHaveFocus();
    expect(input).toHaveStyle('color: #76B100');
    expect(input).toHaveStyle('background-color: #212121');
  });
});
