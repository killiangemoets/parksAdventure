import { FC, ReactNode } from "react";
import { AlertContainer, AlertMessage, AlertWrapper } from "./alert.style";

type AlertProps = {
  children: string | ReactNode;
};

const Alert: FC<AlertProps> = ({ children }) => {
  return (
    <AlertContainer>
      <AlertWrapper>
        <AlertMessage>{children}</AlertMessage>
      </AlertWrapper>
    </AlertContainer>
  );
};

export default Alert;
