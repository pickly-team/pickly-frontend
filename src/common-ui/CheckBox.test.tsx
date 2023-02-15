import { render, screen } from '@testing-library/react';
import CheckBox from '@/common-ui/CheckBox';
import userEvent from '@testing-library/user-event';

describe('Checkbox test', () => {
  test('체크되지 않은 상태에서 체크박스를 클릭하면 > 체크 상태로 변경된다.', async () => {
    //given
    const CHECKED = false;

    //when
    render(
      <CheckBox isChecked={CHECKED} onChange={() => {}}>
        Check
      </CheckBox>,
    );
    const checkbox = screen.getByLabelText('Check');
    await userEvent.click(checkbox);

    //then
    expect(checkbox).toBeChecked();
  });
  test('체크된 상태에서 체크박스를 클릭하면 > 체크되지 않은 상태로 변경된다.', async () => {
    //given
    const CHECKED = true;

    //when
    render(
      <CheckBox isChecked={CHECKED} onChange={() => {}}>
        Check
      </CheckBox>,
    );
    const checkbox = screen.getByLabelText('Check');
    await userEvent.click(checkbox);

    //then
    expect(checkbox).not.toBeChecked();
  });
  describe('개발자 관점 테스트', () => {
    test('클릭 후 체크상태가 컴포넌트 외부로 전달된다.', async () => {
      //given
      const onChange = jest.fn();

      //when
      render(
        <CheckBox isChecked={false} onChange={onChange}>
          Check
        </CheckBox>,
      );
      const checkbox = screen.getByLabelText('Check');
      await userEvent.click(checkbox);

      //then
      expect(onChange).toHaveBeenCalledWith(true);
    });
  });
});
