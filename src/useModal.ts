import { useContext } from 'react';
import RMUContext from './RMUContext';

const useModal = (id: string) => {
  const context = useContext(RMUContext);

  const modal = context.modals[id];

  const open = (props: Record<string, unknown>) => context.open(id, props);

  const close = () => context.close(id);

  return {
    modal,
    open,
    close,
  };
};

export default useModal;
