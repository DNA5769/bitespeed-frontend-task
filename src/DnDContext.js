import { createContext, useContext, useState } from 'react';

const DnDContext = createContext([null, (_) => {}]);

export const DnDProvider = ({ children }) => {
  const [nodeId, setNodeId] = useState(1);
  const [sbMode, setSBMode] = useState(null);
  const [text, setText] = useState("");

  return (
    <DnDContext.Provider value={{nodeId, setNodeId, sbMode, setSBMode, text, setText}}>
      {children}
    </DnDContext.Provider>
  );
}

export default DnDContext;

export const useDnD = () => {
  return useContext(DnDContext);
}