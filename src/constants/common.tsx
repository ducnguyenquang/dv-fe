export const ORIENTATION = {
  LANDSCAPE: 'landscape',
  PORTRAIT: 'portrait',
};

export const PLATFORM = {
  PC: 'PC',
  MOBILE: 'MOBILE',
};

export const TYPE_NAME = {
  PAGE: 'PAGE',
  BLOCK: 'BLOCK',
  COMMON: 'COMMON',
  ALL_SITE: 'ALL_SITE',
};

export const SETTINGS = {
  BACKGROUND_COLOR: 'BACKGROUND_COLOR',
  LAYOUT_STRUCTURE: 'LAYOUT_STRUCTURE',
  BANNER_IMAGE: 'BANNER_IMAGE',
  CABLE_IMAGE: 'CABLE_IMAGE',
  CABLE_IMAGE_1: 'CABLE_IMAGE_1',
  CABLE_IMAGE_2: 'CABLE_IMAGE_2',
  CABLE_IMAGE_3: 'CABLE_IMAGE_3',
  CABLE_IMAGE_4: 'CABLE_IMAGE_4',
  CABLE_IMAGE_5: 'CABLE_IMAGE_5',
  CABLE_ICON_IMAGE_1: 'CABLE_ICON_IMAGE_1',
  CABLE_ICON_IMAGE_2: 'CABLE_ICON_IMAGE_2',
  CABLE_INTRO_1: 'CABLE_INTRO_1',
  CABLE_INTRO_2: 'CABLE_INTRO_2',
  LED_IMAGE: 'LED_IMAGE',
  LED_ICON_IMAGE_1: 'LED_IMAGE_1',
  LED_ICON_IMAGE_2: 'LED_IMAGE_2',
  LED_INTRO_1: 'LED_INTRO_1',
  LED_INTRO_2: 'LED_INTRO_2',
  CABLE_BANNER_IMAGE: 'CABLE_BANNER_IMAGE',
  LED_LIGHT_BANNER_IMAGE: 'LED_LIGHT_BANNER_IMAGE',
  INTRODUCTION_BLOCK: 'INTRODUCTION_BLOCK',
  IS_HIDDEN: 'IS_HIDDEN',
  IS_HIDDEN_PHONE_ICON: 'IS_HIDDEN_PHONE_ICON',
  FONT_SIZE: 'FONT_SIZE',
  LOGO: 'LOGO',
  DISTRIBUTOR_LEFT_IMAGE: 'DISTRIBUTOR_LEFT_IMAGE',
  DISTRIBUTOR_LEFT_TEXT: 'DISTRIBUTOR_LEFT_TEXT',
  DISTRIBUTOR_RIGHT_IMAGE: 'DISTRIBUTOR_RIGHT_IMAGE',
  DISTRIBUTOR_RIGHT_TEXT: 'DISTRIBUTOR_RIGHT_TEXT',
  FOOTER_LOGO: 'FOOTER_LOGO',
  FOOTER_SOLOGUN: 'FOOTER_SOLOGUN',
  FOOTER_STANDARD_IMAGE_1: 'FOOTER_STANDARD_IMAGE_1',
  FOOTER_STANDARD_IMAGE_2: 'FOOTER_STANDARD_IMAGE_2',
  FOOTER_STANDARD_IMAGE_3: 'FOOTER_STANDARD_IMAGE_3',
  PRODUCT_IDS: 'PRODUCT_IDS',
  TOP_HEADER_TEXT_COLOR: 'TOP_HEADER_TEXT_COLOR',
  TOP_HEADER_BACKGROUND_COLOR: 'TOP_HEADER_BACKGROUND_COLOR',
  COMPANY_INFORMATION: 'COMPANY_INFORMATION',
};

export const PAGE_NAME = {
  P_TEMPLATE: 'P_TEMPLATE',
  P_HOME: 'P_HOME',
  P_PRODUCT: 'P_PRODUCT',
  P_PRODUCT_CATEGORY: 'P_PRODUCT_CATEGORY',
  P_PRODUCT_DETAIL: 'P_PRODUCT_DETAIL',
  P_CATEGORY: 'P_CATEGORY',
  P_CATEGORY_DETAIL: 'P_CATEGORY_DETAIL',
  P_CART: 'P_CART',
  P_POPUP_MENU: 'P_POPUP_MENU',
  P_SUPPORT: 'P_SUPPORT',
  P_CONTACT: 'P_CONTACT',
};

export const MODULE_NAME = {
  M_LED_BLOCK: 'M_LED_BLOCK',
  M_CABLE_BLOCK: 'M_CABLE_BLOCK',
  M_DISTRIBUTOR_BLOCK: 'M_DISTRIBUTOR_BLOCK',
  M_FOOTER_BLOCK: 'M_FOOTER_BLOCK',
  M_PRODUCT_BLOCK: 'M_PRODUCT_BLOCK',
  M_TOP_HEADER_BLOCK: 'M_TOP_HEADER_BLOCK',
};

export const COLOR_OPTIONS = [
  {
    key: 'black',
    label: (
      <span className="colorItem">
        <span className="colorItem-color" style={{ backgroundColor: '#262425' }} />
        <span className="colorItem-label">Đen</span>
      </span>
    ),
    value: 'black',
  },
  {
    key: 'red',
    label: (
      <span className="colorItem">
        <span className="colorItem-color" style={{ backgroundColor: '#EA1D2C' }} />
        <span className="colorItem-label">Đỏ</span>
      </span>
    ),
    value: 'red',
  },
  {
    key: 'blue',
    label: (
      <span className="colorItem">
        <span className="colorItem-color" style={{ backgroundColor: '#2F378F' }} />
        <span className="colorItem-label">Xanh</span>
      </span>
    ),
    value: 'blue',
  },
  {
    key: 'yellow',
    label: (
      <span className="colorItem">
        <span className="colorItem-color" style={{ backgroundColor: '#FEEF34' }} />
        <span className="colorItem-label">Vàng</span>
      </span>
    ),
    value: 'yellow',
  },
  {
    key: 'ter',
    label: (
      <span className="colorItem terItem">
        <span className="colorItem-color">
          <img src="/images/color_ter.jpg" width={16} height={16} />
        </span>
        <span className="colorItem-label">Ter</span>
      </span>
    ),
    value: 'ter',
  },
  {
    key: 'white',
    label: (
      <span className="colorItem">
        <span className="colorItem-color" style={{ backgroundColor: '#FFFFFF' }} />
        <span className="colorItem-label">Trắng</span>
      </span>
    ),
    value: 'white',
  },
];

export const COLOR_TEMPERATURE_OPTIONS = [
  {
    key: '2700K-3500K',
    label: `2700K-3500K`,
    value: 'V',
    color: '#FFFD5E',
  },
  {
    key: '4000K-4500K',
    label: `4000K-4500K`,
    value: 'TT',
    color: '#FFFCBC',
  },
  {
    key: '6000K-6500K',
    label: `6000K-6500K`,
    value: 'T',
    color: '#F9FDFE',
  },
];

