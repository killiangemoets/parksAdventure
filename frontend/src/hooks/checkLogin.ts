import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserId } from "../store/user/user.selector";

const useCheckLogin = () => {
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const [showLoginForm, setShowLoginForm] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      navigate("/");
    } else {
      setShowLoginForm(true);
    }
  }, [navigate, userId]);

  return showLoginForm;
};

export default useCheckLogin;
