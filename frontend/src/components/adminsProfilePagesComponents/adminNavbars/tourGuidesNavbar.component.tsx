import {
  AddTourGuideForm,
  AdminGuidesNavbarCenterContainer,
  AdminGuidesNavbarContainer,
  AdminNavbarRightContainer,
  ErrorMessage,
  ModalSuccessContainer,
  ModalSuccessMessage,
  ModalSuccessMessageElement,
  ModalSuccessMessageMainElement,
} from "./adminNavbar.style";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import { useSearchParams } from "react-router-dom";
import { FC, FormEvent, useEffect, useState } from "react";
import Modal from "../../UIComponents/modal/modal.component";
import TextInput from "../../UIComponents/textInput/textInput.component";
import {
  CreateTourGuideData,
  USER_ROLE_TYPES,
  guideRolesList,
} from "../../../types/user";
import FormButton from "../../UIComponents/formButton/formButton.component";
import { PriceModalButtons } from "../addTourPageComponents/addTourCalendar/pricesCalendarInput.style";
import SelectInput from "../../UIComponents/selectInput/selectInput.component";
import SearchInput from "../../UIComponents/searchInput/searchInput.component";
import { createTourGuide } from "../../../api/authentication-requests";
import { selectUserRole } from "../../../store/user/user.selector";
import { useSelector } from "react-redux";

export type TourGuidesNavbarProps = {
  onCreateGuide: () => void;
};

const TourGuidesNavbar: FC<TourGuidesNavbarProps> = ({ onCreateGuide }) => {
  const userRole = useSelector(selectUserRole);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchGuide, setSearchGuide] = useState<string>("");
  const [showAddGuideModal, setShowAddGuideModal] = useState<boolean>(false);
  const [createTourGuideData, setCreateTourGuideData] =
    useState<CreateTourGuideData>({
      firstname: "",
      lastname: "",
      email: "",
      role: "guide",
    });
  const { firstname, lastname, email, role } = createTourGuideData;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [isANewGuideCreated, setIsANewGuideCreated] = useState<boolean>(false);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isVerySmallScreen, setIsVerySmallScreen] = useState(false);

  const handleSubmitSearchGuide = () => {
    if (searchGuide.length) searchParams.set("search", searchGuide.trim());
    else searchParams.delete("search");
    setSearchParams(searchParams);
  };
  const handleDeleteSearchGuide = () => {
    setSearchGuide("");
    searchParams.delete("search");
    setSearchParams(searchParams);
  };

  const handleChange = (name: string, value: string) => {
    const newCreateTourGuideData = { ...createTourGuideData, [name]: value };
    setCreateTourGuideData(newCreateTourGuideData);
  };

  const handleCloseModal = () => {
    setErrorMessage("");
    setSuccess(false);
    setCreateTourGuideData({
      firstname: "",
      lastname: "",
      email: "",
      role: "guide",
    });
    if (isANewGuideCreated) {
      onCreateGuide();
      setIsANewGuideCreated(false);
    }
    setShowAddGuideModal(false);
  };
  const handleCreateOtherGuide = () => {
    setErrorMessage("");
    setSuccess(false);
    setCreateTourGuideData({
      firstname: "",
      lastname: "",
      email: "",
      role: "guide",
    });
  };

  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam) setSearchGuide(searchParam);
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    const response = await createTourGuide(createTourGuideData);
    setLoading(false);
    if (response && response.status === "success") {
      setSuccess(true);
      setIsANewGuideCreated(true);
    } else {
      if (
        (response && response.message.includes("E11000")) ||
        response.message.toLowerCase().includes("duplicate field value")
      )
        setErrorMessage("This email address is already used");
      else
        setErrorMessage(
          "An error occured. Please refresh the page and try again!"
        );
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1060 && !isSmallScreen) {
        setIsSmallScreen(true);
        if (window.innerWidth <= 480 && !isVerySmallScreen) {
          setIsVerySmallScreen(true);
        } else if (window.innerWidth > 480 && isVerySmallScreen) {
          setIsVerySmallScreen(false);
        }
      } else if (window.innerWidth > 1060 && isSmallScreen) {
        setIsSmallScreen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [isSmallScreen, isVerySmallScreen]);

  return (
    <AdminGuidesNavbarContainer>
      <AdminGuidesNavbarCenterContainer>
        <SearchInput
          handleDelete={handleDeleteSearchGuide}
          handleSubmit={handleSubmitSearchGuide}
          placeholder={"name, email, ..."}
          value={searchGuide}
          onChange={(e) => {
            setSearchGuide(e.target.value);
          }}
          adminStyle={true}
          style={{ width: isVerySmallScreen ? "38rem" : "50rem" }}
        />
        {userRole === USER_ROLE_TYPES.ADMIN && isSmallScreen && (
          <Button
            onClick={() => {
              setShowAddGuideModal(true);
            }}>
            Add Tour Guide
          </Button>
        )}
      </AdminGuidesNavbarCenterContainer>
      {userRole === USER_ROLE_TYPES.ADMIN && !isSmallScreen && (
        <AdminNavbarRightContainer>
          <Button
            onClick={() => {
              setShowAddGuideModal(true);
            }}>
            Add Tour Guide
          </Button>
        </AdminNavbarRightContainer>
      )}
      <Modal
        title={"Add Tour Guide"}
        handleClose={handleCloseModal}
        open={showAddGuideModal}>
        {success ? (
          <ModalSuccessContainer>
            <ModalSuccessMessage>
              <ModalSuccessMessageMainElement>
                The {role}{" "}
                <span>
                  {firstname} {lastname}
                </span>{" "}
                has been created successfully!
              </ModalSuccessMessageMainElement>

              <ModalSuccessMessageElement>
                An email has been sent to <span>{email}</span> <br /> to set a
                password and activate the account.
              </ModalSuccessMessageElement>
            </ModalSuccessMessage>

            <PriceModalButtons>
              <Button
                buttonType={BUTTON_TYPE_CLASSES.cancel}
                onClick={handleCloseModal}>
                Close
              </Button>
              <Button onClick={handleCreateOtherGuide}>
                Add another guide
              </Button>
            </PriceModalButtons>
          </ModalSuccessContainer>
        ) : (
          <AddTourGuideForm onSubmit={handleSubmit}>
            <TextInput
              label="Firstname"
              placeholder="your firstname"
              type="name"
              name="firstname"
              value={firstname}
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              required
            />
            <TextInput
              label="Lastname"
              placeholder="your lastname"
              type="name"
              name="lastname"
              value={lastname}
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              required
            />
            <TextInput
              label="Email address"
              placeholder="you@example.com"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              required
            />
            <SelectInput
              label="Role"
              name="role"
              current={role}
              list={guideRolesList}
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
            />

            <PriceModalButtons>
              <Button
                buttonType={BUTTON_TYPE_CLASSES.cancel}
                onClick={handleCloseModal}
                type="button">
                Cancel
              </Button>
              <FormButton loading={loading} success={success}>
                Create Tour Guide
              </FormButton>
            </PriceModalButtons>
            <ErrorMessage>{errorMessage}</ErrorMessage>
          </AddTourGuideForm>
        )}
      </Modal>
    </AdminGuidesNavbarContainer>
  );
};

export default TourGuidesNavbar;
