import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';

describe('BottomNavigation test', () => {
  beforeEach(() => {
    render(<BottomNavigation />, { wrapper: BrowserRouter });
  });
  test('BottomNavigation 컴포넌트는 4개의 아이템을 렌더링한다.', () => {
    // then
    const homeBtn = screen.getByTestId('main');
    const friendBtn = screen.getByTestId('friend');
    const alarmBtn = screen.getByTestId('alarm');
    const profileBtn = screen.getByTestId('profile');

    expect(homeBtn).toBeInTheDocument();
    expect(friendBtn).toBeInTheDocument();
    expect(alarmBtn).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
  });
  describe('BottomNavigation 컴포넌트는 아이템을 클릭하면 > 링크로 이동한다', () => {
    it('홈 아이템을 클릭하면 > /main으로 이동한다.', () => {
      // given
      const homeBtn = screen.getByTestId('main');

      // when
      act(() => homeBtn.click());

      // then
      expect(window.location.pathname).toBe('/');
    });
    it('친구 아이템을 클릭하면 > /friend으로 이동한다.', () => {
      // given
      const friendBtn = screen.getByTestId('friend');

      // when
      act(() => friendBtn.click());

      // then
      expect(window.location.pathname).toBe('/friend');
    });
    it('알림 아이템을 클릭하면 > /alarm으로 이동한다.', () => {
      // given
      const alarmBtn = screen.getByTestId('alarm');

      // when
      act(() => alarmBtn.click());

      // then
      expect(window.location.pathname).toBe('/alarm');
    });
    it('프로필 아이템을 클릭하면 > /profile로 이동한다.', () => {
      // given
      const profileBtn = screen.getByTestId('profile');

      // when
      act(() => profileBtn.click());

      // then
      expect(window.location.pathname).toBe('/profile');
    });
  });
});
