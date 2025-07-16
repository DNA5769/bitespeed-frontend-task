import React, { useState } from 'react';
import { useDnD } from './DnDContext';

export default () => {
  const { sbMode, setSBMode, text, setText } = useDnD();

  const onDragStart = event => {
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleChange = event => {
    setText(event.target.value);
  };

  return (
    <div className='sidebar'>
      {sbMode === null ? <div className="dragNode" onDragStart={(event) => onDragStart(event)} draggable>
        <span>Message</span>
      </div> :
      <div>
        <div className='sb-text-header'>
            <span className='sb-back' onClick={() => setSBMode(null)}>&lt;</span>
            Message
        </div>
        <div className='sb-text'>Text</div>
        <textarea className='sb-textarea' value={text} onChange={handleChange}></textarea>
      </div>}
    </div>
  );
};
