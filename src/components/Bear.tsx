import useBearStore from '@/store/bears';
import SlideItem from '@/common-ui/SlideItem';

const Bear = () => {
  const bears = useBearStore((state) => state.bears);
  const increase = useBearStore((state) => state.increaseBear);
  const decrease = useBearStore((state) => state.decreaseBear);
  return (
    <>
      <div>bears: {bears}</div>
      <button onClick={increase}>증가</button>
      <button onClick={decrease}>감소</button>
      <SlideItem
        main={<div>hi</div>}
        option={<div style={{ width: '200px' }}>option</div>}
      />
    </>
  );
};

export default Bear;
