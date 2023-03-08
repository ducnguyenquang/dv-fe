import './ColorPicker.less';
import { useCallback, useState } from 'react';
import { SketchPicker } from 'react-color';

interface IProps {
  initialColor?: string;
  saveColor?: any;
}

const ColorPicker = ({ initialColor, saveColor }: IProps): JSX.Element => {

  const [color, setColor] = useState(initialColor);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleChangeComplete = useCallback((color: any) => {
    setColor(color.hex);
    saveColor(color.hex);
  }, [saveColor]);

  const handleClick = useCallback(() => {
    setDisplayColorPicker(!displayColorPicker)
  }, [displayColorPicker]);

  const handleClose = useCallback(() => {
    setDisplayColorPicker(false)
  }, []);

  return (
    <div className='colorPicker'>
      <div className='swatch' onClick={handleClick}>
        <div className='color' style={{backgroundColor: color}} />
      </div>
      {displayColorPicker ? <div className='popover'>
        <div className='cover' onClick={handleClose}/>
        <SketchPicker
            color={ color }
            onChangeComplete={handleChangeComplete}
          />
      </div> : null }

    </div>
  )
};

export default ColorPicker;
