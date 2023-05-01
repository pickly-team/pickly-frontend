import { useCallback } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

import styled from '@emotion/styled';

import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { theme } from '@/styles/theme';

interface Props<T extends object> {
  itemList: T[];
  setItemList: Dispatch<SetStateAction<T[]>>;
  renderDragItem: (item: T) => ReactNode;
}

/**
 * @example
    <DragAndDrop
        itemList={itemList}
        setItemList={setItemList}
        renderDragItem={(item) => (
            <Item
                {...item}
            />
        )}
    />
 */

// eslint-disable-next-line @typescript-eslint/ban-types
const DragAndDrop = <T extends object>({
  itemList,
  setItemList,
  renderDragItem,
}: Props<T>) => {
  const onDragEnd = useDragEnd(itemList, setItemList);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId="droppable">
            {(provided) => (
              <StyleListView
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {itemList.map((item, idx) => (
                  <DragItem
                    // TODO : key값을 어떻게 할지 고민해보기.
                    // eslint-disable-next-line react/no-array-index-key
                    key={idx}
                    renderDragItem={renderDragItem}
                    item={item}
                    index={idx}
                  />
                ))}
                {provided.placeholder}
              </StyleListView>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
};

export default DragAndDrop;

const StyleListView = styled.ul`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

interface DragItemProps<T extends object> {
  item: T;
  index: number;
  renderDragItem: (item: T) => ReactNode;
}

const DragItem = <T extends object>({
  item,
  index,
  renderDragItem,
}: DragItemProps<T>) => {
  return (
    <Draggable draggableId={String(index)} index={index} key={Number(index)}>
      {(provided, snapshot) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { transform } = provided.draggableProps.style!;
        if (snapshot.isDragging) {
          const regex = /translate\((.*?)px, (.*?)px\)/;
          const transformStyle =
            Array.from(regex.exec(transform ?? '') ?? [])[0] ?? '';
          const translateY = (transformStyle.split('px')[1] ?? '0').replace(
            ',',
            '',
          );
          const translateStyle = `translate(0, ${translateY}px)`;
          return (
            <StyleDragItem
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                ...provided.draggableProps.style,
                transform: translateStyle,
                backgroundColor: `${theme.colors.grey800}`,
                zIndex: 1,
              }}
              ref={provided.innerRef}
            >
              {renderDragItem(item)}
            </StyleDragItem>
          );
        }
        return (
          <StyleDragItem
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {renderDragItem(item)}
          </StyleDragItem>
        );
      }}
    </Draggable>
  );
};

const StyleDragItem = styled.li`
  display: flex;
`;

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

function useDragEnd<T>(
  data: T[],
  setData: React.Dispatch<React.SetStateAction<T[]>>,
) {
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source } = result;
      if (!destination) return;
      if (source.index === destination.index) return;
      const newQuotes = reorder(data, source.index, destination.index);
      setData(newQuotes);
    },
    [data, setData],
  );
  return onDragEnd;
}
