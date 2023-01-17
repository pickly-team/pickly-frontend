import useBearStore from '@/store/bears';

const Bear = () => {
  const bears = useBearStore((state) => state.bears);
  const increase = useBearStore((state) => state.increaseBear);
  const decrease = useBearStore((state) => state.decreaseBear);
  return (
    <>
      <div>bears: {bears}</div>
      <button onClick={increase}>증가</button>
      <button onClick={decrease}>감소</button>
    </>
  );
};

export default Bear;
