import { FC } from 'react';
// import { RotatingLines } from "react-loader-spinner";
import './Loading.scss';

const Loading: FC = () => {
  return (
    <div className='container loading'>
      <span className='loader'></span>
    </div>
  );
};

export { Loading };
