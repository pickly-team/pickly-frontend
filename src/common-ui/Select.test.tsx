import { fireEvent, screen } from '@testing-library/react';
import { render } from '@/test/utils';
import Select from '@/common-ui/Select';
import Button from '@/common-ui/Button';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';

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
    beforeEach(() => {
      //when
      render(
        <Select
          value={'1'}
          onChange={() => {}}
          TriggerButton={Button}
          isSearchActive
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
    });
    test('검색 인풋이 보인다.', () => {
      //then
      screen.getByRole('textbox');
    });
    test('검색어를 입력하면 > 해당 검색어에 일치하는 옵션이 보인다.', async () => {
      //given
      const searchValue = '1 라벨';

      //when
      const input = screen.getByRole('textbox');
      await userEvent.type(input, searchValue);

      //then
      expect(screen.queryAllByText('1 라벨')[1]).not.toBeUndefined();
      expect(screen.queryAllByText('2 라벨')[1]).toBeUndefined();
    });
    test('검색어에 일치하는 옵션이 없으면 > [검색결과가 없습니다] 문구가 보인다.', async () => {
      //given
      const searchValue = '아아아';

      //when
      const input = screen.getByRole('textbox');
      await userEvent.type(input, searchValue);

      //then
      screen.getByText('검색결과가 없습니다');
    });
  });
});
