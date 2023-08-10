import { ReadType } from '@/bookmarks/ui/Main/BookmarkToggle';
import useBookmarkStore from '@/store/bookmark';
import { useEffect } from 'react';

export type READ_OPTION = '📖 전체' | '👀 읽음' | '🫣 읽지 않음';

const readSelectOptions: Record<READ_OPTION, string> = {
  '📖 전체': '📖 전체',
  '👀 읽음': '👀 읽음',
  '🫣 읽지 않음': '🫣 읽지 않음',
} as const;

export const READ_OPTIONS: Record<READ_OPTION, boolean | null> = {
  '📖 전체': null,
  '👀 읽음': true,
  '🫣 읽지 않음': false,
} as const;

interface ReadListProps {
  memberId: number;
  isFriendPage?: boolean;
}

const useReadList = ({ memberId, isFriendPage = false }: ReadListProps) => {
  const {
    readOption: selectedReadOption,
    setReadOption,
    friendReadOption,
    setFriendReadOption,
  } = useBookmarkStore();

  useEffect(() => {
    if (isFriendPage) setFriendReadOption('📖 전체');
  }, [memberId, isFriendPage]);

  const readSelectOptionsList: ReadType[] = Object.entries(
    readSelectOptions,
  ).map(([key, value]) => ({
    value,
    label: key,
  }));

  const onClickReadMode = (readMode: READ_OPTION) => {
    if (isFriendPage) {
      setFriendReadOption(readMode);
    } else {
      setReadOption(readMode);
    }
  };

  return {
    readSelectOptionsList,
    selectedReadOption: isFriendPage ? friendReadOption : selectedReadOption,
    onClickReadMode,
  };
};

export default useReadList;
