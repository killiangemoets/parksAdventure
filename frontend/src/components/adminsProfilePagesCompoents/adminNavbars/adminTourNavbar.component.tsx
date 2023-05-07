import {
  AdminNavbarContainer,
  AdminNavbarLeftContainer,
  AdminNavbarRightContainer,
} from "./adminNavbar.style";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";

const AdminTourNavbar = () => {
  return (
    <AdminNavbarContainer>
      <AdminNavbarLeftContainer>
        <Button>Calendar</Button>
        <Button>Quick stats</Button>
      </AdminNavbarLeftContainer>
      <AdminNavbarRightContainer>
        <Button>Edit</Button>
        <Button buttonType={BUTTON_TYPE_CLASSES.delete}>Delete</Button>
      </AdminNavbarRightContainer>
    </AdminNavbarContainer>
  );
};

export default AdminTourNavbar;
