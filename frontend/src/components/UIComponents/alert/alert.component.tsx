import { FC, ReactNode } from "react";
import { AlertContainer, AlertMessage } from "./alert.style";

type AlertProps = {
  children: string | ReactNode;
};

const Alert: FC<AlertProps> = ({ children }) => {
  return (
    <AlertContainer>
      <AlertMessage>{children}</AlertMessage>
    </AlertContainer>
  );
};

export default Alert;
