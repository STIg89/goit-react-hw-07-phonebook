import { Vortex } from 'react-loader-spinner';
import { LoaderWrap } from './spinner.slyled';

export const Spinner = () => {
  return (
    <LoaderWrap>
      <Vortex
        visible={true}
        height="150"
        width="150"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />
    </LoaderWrap>
  );
};
