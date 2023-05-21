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

  const handleChangeComplete = useCallback(
    (color: any) => {
      setColor(color.hex);
      saveColor(color.hex);
    },
    [saveColor]
  );

  const handleClick = useCallback(() => {
    setDisplayColorPicker(!displayColorPicker);
    setTimeout(() => {
      const scroll_to_bottom = document.getElementsByTagName("BODY")[0];
      if (scroll_to_bottom) scroll_to_bottom.scrollTop = scroll_to_bottom?.scrollHeight;
    }, 0);
  }, [displayColorPicker]);

  const handleClose = useCallback(() => {
    setDisplayColorPicker(false);
  }, []);

  return (
    <span className="colorPicker">
      <div className="swatch" onClick={handleClick}>
        <div className="color" style={{ backgroundColor: color }} />
      </div>
      {displayColorPicker ? (
        <div className="popover" id="colorPicker">
          <div className="cover" onClick={handleClose} />
          <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      ) : null}
    </span>
  );
};

export default ColorPicker;
