import React from 'react';
import { useDnD } from './DnDContext';

const Header = () => {
  const { alert, setAlert, check } = useDnD();
  const onSave = () => {
    if (!check)
    {
        setAlert(true);
        setTimeout(() => {
            setAlert(false);
        }, "1000");
    }
  }
  return (
    <div className='header'>
        <div></div>
        <div></div>
        <div></div>
        {alert ? <div className='header-alert'>
            <div>Cannot Save Flow</div>
        </div> : <></>}
        <div></div>
        <div className='header-save' onClick={onSave}>
            <div>Save Changes</div>
        </div>
        <div></div>
    </div>
  );
}

export default Header;