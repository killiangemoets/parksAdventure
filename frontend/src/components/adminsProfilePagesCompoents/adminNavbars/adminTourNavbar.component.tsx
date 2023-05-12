import {
  AdminNavbarContainer,
  AdminNavbarLeftContainer,
  AdminNavbarRightContainer,
  FixAdminTourNavbar,
} from "./adminNavbar.style";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import { Outlet, useNavigate } from "react-router-dom";
import { selectUserRole } from "../../../store/user/user.selector";
import { useSelector } from "react-redux";
import { USER_ROLE_TYPES } from "../../../types/user";

const AdminTourNavbar = () => {
  const navigate = useNavigate();
  const userRole = useSelector(selectUserRole);

  const handleGoToEdit = () => {
    navigate(`edit`);
  };
  return (
    <>
      {userRole === USER_ROLE_TYPES.ADMIN && (
        <FixAdminTourNavbar>
          <AdminNavbarContainer>
            <AdminNavbarLeftContainer>
              <Button>Calendar</Button>
              <Button>Quick stats</Button>
            </AdminNavbarLeftContainer>
            <AdminNavbarRightContainer>
              <Button onClick={handleGoToEdit}>Edit</Button>
              <Button buttonType={BUTTON_TYPE_CLASSES.delete}>Delete</Button>
            </AdminNavbarRightContainer>
          </AdminNavbarContainer>
        </FixAdminTourNavbar>
      )}

      <Outlet />
    </>
  );
};

export default AdminTourNavbar;
