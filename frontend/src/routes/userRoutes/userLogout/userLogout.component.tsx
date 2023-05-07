import { useDispatch } from "react-redux";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../../components/UIComponents/spinner/spinner.component";
import { removeUser } from "../../../store/user/user.action";
import { UserLogoutContainer } from "./userLogout.style";
import { AppDispatch } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../api/authentication-requests";
import { useEffect } from "react";

const UserLogout = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      const response = await logout();
      if (response.status === "success") {
        navigate("/");
        setTimeout(() => {
          dispatch(removeUser());
        }, 200);
      }
    };
    handleLogout();
  }, []);

  return (
    <UserLogoutContainer>
      <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
    </UserLogoutContainer>
  );
};

export default UserLogout;
