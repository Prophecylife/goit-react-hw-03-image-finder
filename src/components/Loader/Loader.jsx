import { Bars } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => (
  <Bars
    height="80"
    width="80"
    color="#3f51b5"
    ariaLabel="bars-loading"
    wrapperStyle={{}}
    wrapperClass={s.wrapper}
    visible={true}
  />
);

export default Loader;
