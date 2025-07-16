import { createContext, useContext, useState } from 'react';

const DnDContext = createContext([null, (_) => {}]);

export const DnDProvider = ({ children }) => {
  const [nodeId, setNodeId] = useState(1);

  return (
    <DnDContext.Provider value={[nodeId, setNodeId]}>
      {children}
    </DnDContext.Provider>
  );
}

export default DnDContext;

export const useDnD = () => {
  return useContext(DnDContext);
}