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

const AdminTourNavbar = () => {
  const navigate = useNavigate();

  const handleGoToEdit = () => {
    navigate(`edit`);
  };
  return (
    <>
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

      <Outlet />
    </>
  );
};

export default AdminTourNavbar;
