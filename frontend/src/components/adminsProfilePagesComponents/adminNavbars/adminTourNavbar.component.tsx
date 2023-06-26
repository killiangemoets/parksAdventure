import {
  AdminNavbarContainer,
  AdminNavbarLeftContainer,
  AdminNavbarRightContainer,
  DeleteQuestion,
  ErrorMessage,
  FixAdminTourNavbar,
} from "./adminNavbar.style";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import { Outlet, useNavigate } from "react-router-dom";
import {
  selectUserId,
  selectUserRole,
} from "../../../store/user/user.selector";
import { useSelector } from "react-redux";
import { USER_ROLE_TYPES } from "../../../types/user";
import {
  selectTourGuides,
  selectTourId,
  selectTourName,
} from "../../../store/tour/tour.selector";
import { deleteTour } from "../../../api/tour-requests";
import { ChangeEvent, useEffect, useState } from "react";
import Modal from "../../UIComponents/modal/modal.component";
import TextInput from "../../UIComponents/textInput/textInput.component";
import { ButtonSection } from "../../allToursPageComponents/filtersModal/filtersModalstyle";
import WarningMessage from "../../UIComponents/warningMessage/waringMessage.component";

const AdminTourNavbar = () => {
  const navigate = useNavigate();
  const userRole = useSelector(selectUserRole);
  const userId = useSelector(selectUserId);
  const tourId = useSelector(selectTourId);
  const tourName = useSelector(selectTourName);
  const tourGuides = useSelector(selectTourGuides);
  const [deleteTourModal, setDeleteTourModal] = useState<boolean>(false);
  const [confirmTourName, setConfirmTourName] = useState<string>("");
  const [deleteErrorMessage, setDeleteErrorMessage] = useState<string>("");

  const isGuideForThisTour = tourGuides
    ? Boolean(tourGuides.find((tourGuide) => tourGuide._id === userId))
    : false;

  const handleGoToEdit = () => {
    navigate(`edit`);
  };

  const handleGoToCalendar = () => {
    navigate(`calendar`);
  };

  const handleGoToQuickStats = () => {
    navigate(`stats`);
  };

  const handleDeleteTour = async () => {
    setDeleteErrorMessage("");
    if (tourName?.toLowerCase() !== confirmTourName.toLowerCase())
      return setDeleteErrorMessage("The tour name is not correct");
    if (!tourId) return;
    const response = await deleteTour(tourId);
    if (response && response.status === "success") {
      navigate("/alltours");
    } else if (
      response &&
      response.status === "fail" &&
      response.message.includes("tour with bookings cannot be deleted")
    )
      setDeleteErrorMessage(
        "This tour already has bookings and cannot be deleted"
      );
    else setDeleteErrorMessage("Something went wrong, please try again!");
  };

  return (
    <>
      {userRole === USER_ROLE_TYPES.ADMIN && (
        <FixAdminTourNavbar>
          <AdminNavbarContainer>
            <AdminNavbarLeftContainer>
              <Button onClick={handleGoToCalendar}>Calendar</Button>
              <Button onClick={handleGoToQuickStats}>Quick stats</Button>
            </AdminNavbarLeftContainer>
            <AdminNavbarRightContainer>
              <Button onClick={handleGoToEdit}>Edit</Button>
              <Button
                buttonType={BUTTON_TYPE_CLASSES.delete}
                onClick={() => {
                  setDeleteTourModal(true);
                }}>
                Delete
              </Button>
            </AdminNavbarRightContainer>
          </AdminNavbarContainer>
          <Modal
            title="Delete Tour"
            handleClose={() => {
              setConfirmTourName("");
              setDeleteTourModal(false);
            }}
            open={deleteTourModal}>
            <WarningMessage />

            <DeleteQuestion>
              Are you sure you want to the delete the tour{" "}
              <span>{`'${tourName}'`}</span>?
            </DeleteQuestion>
            <TextInput
              label="Write the tour name to contine"
              placeholder="tour name"
              type="text"
              name="tourName"
              value={confirmTourName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setConfirmTourName(e.target.value);
              }}
              required
            />
            <ErrorMessage>{deleteErrorMessage}</ErrorMessage>
            <ButtonSection>
              <Button
                buttonType={BUTTON_TYPE_CLASSES.deleteCancel}
                onClick={() => {
                  setConfirmTourName("");
                  setDeleteTourModal(false);
                }}>
                Cancel
              </Button>
              <Button
                buttonType={BUTTON_TYPE_CLASSES.deleteConfirm}
                onClick={handleDeleteTour}>
                Delete
              </Button>
            </ButtonSection>
          </Modal>
        </FixAdminTourNavbar>
      )}
      {userRole === USER_ROLE_TYPES.LEAD_GUIDE && isGuideForThisTour && (
        <FixAdminTourNavbar>
          <AdminNavbarContainer>
            <AdminNavbarLeftContainer>
              <Button onClick={handleGoToCalendar}>Calendar</Button>
              <Button onClick={handleGoToQuickStats}>Quick stats</Button>
            </AdminNavbarLeftContainer>
            <AdminNavbarRightContainer>
              <Button onClick={handleGoToEdit}>Edit</Button>
            </AdminNavbarRightContainer>
          </AdminNavbarContainer>
        </FixAdminTourNavbar>
      )}
      {userRole === USER_ROLE_TYPES.GUIDE && isGuideForThisTour && (
        <FixAdminTourNavbar>
          <AdminNavbarContainer>
            <AdminNavbarLeftContainer>
              <Button onClick={handleGoToCalendar}>Calendar</Button>
            </AdminNavbarLeftContainer>
            <AdminNavbarRightContainer>
              <Button>Quick stats</Button>
            </AdminNavbarRightContainer>
          </AdminNavbarContainer>
        </FixAdminTourNavbar>
      )}

      <Outlet />
    </>
  );
};

export default AdminTourNavbar;
