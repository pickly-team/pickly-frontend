import { fireEvent, screen } from '@testing-library/react';
import { render } from '@/test/utils';
import Select from '@/common-ui/Select';
import Button from '@/common-ui/Button';

describe('Select test', () => {
  beforeEach(() => {
    //given
    const options = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
    ];
    render(
      <Select onChange={() => {}} TriggerButton={Button}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </Select>,
    );
  });
  describe('트리거 버튼 테스트', () => {
    test('버튼을 클릭하면 > 옵션 아이템 리스트들이 보인다.', () => {
      //when
      const button = screen.getByRole('button');
      fireEvent.click(button);

      //then
      expect(screen.getAllByRole('listitem')).toBeVisible();
    });
  });
  describe('옵션 선택 테스트', () => {
    test('옵션 영역을 클릭하면 > 선택한 옵션의 라벨이 버튼에 보인다.', () => {
      //given
      const VALUE = '1';

      //when
      const button = screen.getByRole('button');
      fireEvent.click(button);

      const option = screen.getAllByText(VALUE)[1];
      fireEvent.click(option);

      //then
      screen.getByRole('button', { name: VALUE });
    });
    test('옵션 영역을 클릭하면 > select의 value가 변경된다.', () => {
      //given
      const VALUE = '2';
      //when
      const button = screen.getByRole('button');
      fireEvent.click(button);

      const option = screen.getAllByText(VALUE)[1];
      fireEvent.click(option);

      //then
      screen.getByDisplayValue(VALUE);
    });
  });
});
