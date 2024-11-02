import { FC, PropsWithChildren, MouseEvent } from 'react';

interface Props extends PropsWithChildren {
  close: () => void;
}

const Background: FC<Props> = ({ close, children }) => {
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    close();
  };

  return (
    <div
      onClick={onClick}
      className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,.5)] z-[1000]"
    >
      {children}
    </div>
  );
};

export default Background;
