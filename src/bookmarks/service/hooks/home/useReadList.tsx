import { ReadType } from '@/bookmarks/ui/Main/BookmarkToggle';
import useBookmarkStore from '@/store/bookmark';

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

const useReadList = () => {
  const { readOption: selectedReadOption, setReadOption } = useBookmarkStore();

  const readSelectOptionsList: ReadType[] = Object.entries(
    readSelectOptions,
  ).map(([key, value]) => ({
    value,
    label: key,
  }));

  const onClickReadMode = (readMode: READ_OPTION) => {
    setReadOption(readMode);
  };

  return {
    readSelectOptionsList,
    selectedReadOption,
    onClickReadMode,
  };
};

export default useReadList;
