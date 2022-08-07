import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { Icon } from 'common';
import './Toast.less';
import { IconNames } from '../Icon/iconNames';

const toastStyle = {
  color: 'white',
  minHeight: 48,
  justifyContent: 'center',
};

const CloseButton = () => <Icon className="toast-icon" name={IconNames.ICON_X} size={24} color="white" />;
const ErrorIcon = () => <Icon className="toast-icon" name={IconNames.ICON_EXCLAMATION} size={24} color="white" />;
const SuccessIcon = () => <Icon className="toast-icon" name={IconNames.ICON_CHECK_CIRCLE} size={24} color="white" />;

export const successMessage = ({
  id,
  values,
  undo,
  undoHandler,
}: ISuccessMessageProps): ReturnType<typeof toast.success> => {
  let content = <FormattedMessage id={id} values={values} />;

  if (undo) {
    content = (
      <div className="toast_undo">
        <span className="toast_undo--text">
          <FormattedMessage id={id} values={values} />
        </span>
        {/* <Button onClick={undoHandler} kind={Button.KIND.LINK} className="toast_undo--btn">
          <FormattedMessage id="general.undo" />
        </Button> */}
      </div>
    );
  }

  return toast.success(content, {
    icon: SuccessIcon,
    closeButton: CloseButton,
    style: { ...toastStyle, backgroundColor: '#324457' },
  });
};

interface ISuccessMessageProps {
  /**
   * Translation key which needs to be translated
   */
  id: string;
  /**
   * Values for translation
   */
  values?: Record<string, any>;
  undo?: boolean;
  undoHandler?: () => void;
}

export const errorMessage = (params: IErrorMessageProps): ReturnType<typeof toast.error> => {
  const isIntl = typeof params === 'object' && !!params?.id;
  let msg;

  if (isIntl) {
    msg = <FormattedMessage id={params?.id} values={params?.values} />;
  } else {
    msg = <span>{params?.errorMessage}</span>; // TODO: Adopt this to intl message
  }

  return toast.error(msg, {
    icon: ErrorIcon,
    closeButton: CloseButton,
    style: { ...toastStyle, backgroundColor: '#B12D03' },
  });
};

type IErrorMessageProps = { id?: string; values?: Record<string, any>; errorMessage?: string };
