import { Bounce, toast } from "react-toastify";

export enum TOAST_TYPE {
  error = "error",
  success = "success",
  info = "info",
  default = "default",
  warning = "warning",
}

export const showToast = (type: TOAST_TYPE, msg: string) => {
  const toaster = type == TOAST_TYPE.error ? toast.error : toast;
  if ((type = TOAST_TYPE.error)) {
    toaster(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
};
