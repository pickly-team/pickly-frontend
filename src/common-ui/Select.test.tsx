import { fireEvent, screen } from '@testing-library/react';
import { render } from '@/test/utils';
import Select from '@/common-ui/Select';
import Button from '@/common-ui/Button';
import { useState } from 'react';

const options = [
  { value: '1', label: '1 라벨' },
  { value: '2', label: '2 라벨' },
];

const RenderUsage = () => {
  const [value, setValue] = useState('1');

  return (
    <Select value={value} onChange={setValue} TriggerButton={Button}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};
describe('Select test', () => {
  describe('트리거 버튼 테스트', () => {
    beforeEach(() => {
      render(<RenderUsage />);
    });
    test('버튼을 클릭하면 > 옵션 아이템 리스트들이 보인다.', () => {
      //given
      //when
      const button = screen.getByRole('button');
      fireEvent.click(button);

      //then
      expect(screen.getAllByRole('listitem')).not.toBeNull();
    });
  });
  describe('옵션 선택 테스트', () => {
    beforeEach(() => {
      render(<RenderUsage />);
    });
    test('옵션 아이템을 클릭하면 > 선택한 옵션의 라벨이 버튼에 보인다.', () => {
      //given
      const LABEL = '1 라벨';

      //when
      const button = screen.getByRole('button');
      fireEvent.click(button);

      const option = screen.getAllByText(LABEL)[1];
      fireEvent.click(option);

      //then
      screen.getByRole('button', { name: LABEL });
    });

    test('옵션 아이템을 클릭하면 > 옵션 리스트가 닫힌다.(보이지 않는다.)', () => {
      //given;
      //when
      const button = screen.getByRole('button');
      fireEvent.click(button);

      const option = screen.getAllByText('2 라벨')[1];
      fireEvent.click(option);

      //then
      expect(screen.queryByRole('listitem')).toBeNull();
    });
  });
  describe('검색 테스트', () => {
    test('isSearchActive가 true이면 > 검색 인풋이 보인다.', () => {
      //given
      const isSearchActive = true;

      //when
      render(
        <Select
          value={'1'}
          onChange={() => {}}
          TriggerButton={Button}
          isSearchActive={isSearchActive}
        >
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>,
      );
      const button = screen.getByRole('button');
      fireEvent.click(button);

      //then
      screen.getByRole('textbox');
    });
  });
});
