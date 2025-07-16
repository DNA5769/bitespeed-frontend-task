import React from 'react';

export default () => {
  const onDragStart = event => {
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event)} draggable>
        Input Node
      </div>
    </aside>
  );
};
