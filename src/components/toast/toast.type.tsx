export type ToastObject = { message?: string; type?: string; header?: string };
export type ItemObject = {
  key: number;
  message: string;
  type: string;
  header?: string;
};

export interface ToastItemProps {
  child: (arg: (toastObj: ToastObject) => void) => void;
  dark?: boolean;
  message?: string;
  type?: string;
  timeout?: number;
  style?: React.CSSProperties;
  closeIcon?: boolean;
  dismissOnClick?: boolean;
  noHeader?: boolean;
}

export type ToastItem = {
  message?: string;
  dark?: boolean;
  type?: string;
  style?: React.CSSProperties;
  keyValue?: number;
  timeout?: number;
  // closeToast?: false | ((keyValue: any) => void);
  closeIcon?: boolean;
  closeToast?: boolean;
  onRest?: false | (() => void);
  header?: string;
  noHeader?: boolean;
};

export type DarkStyle = {
  style?: React.CSSProperties;
};
