import { FC, FormEvent, useEffect, useState } from "react";
import { ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import ProfilePicture, {
  PROFILE_PICTURE_SIZE_CLASSES,
} from "../../UIComponents/profilePicture/profilePicture.component";
import {
  Role,
  Tour,
  Tours,
  UserName,
  UserPictureContainer,
  UserTableContainer,
} from "./usersTable.style";
import {
  GuideTableInfo,
  TExtendedGuide,
  TGuideRole,
  USER_ROLE_TYPES,
  guideRolesList,
} from "../../../types/user";
import niceDate from "../../../utils/formatting/formatDates";
import ActionButtons from "./actionButtons.component";
import { capitalizeString } from "../../../utils/formatting/formatString";
import { PriceModalButtons } from "../addTourPageComponents/addTourCalendar/pricesCalendarInput.style";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../UIComponents/button/button.component";
import FormButton from "../../UIComponents/formButton/formButton.component";
import {
  AuthenticationForm,
  ErrorMessage,
} from "../../authenticationComponents/authentication.style";
import SelectInput from "../../UIComponents/selectInput/selectInput.component";
import Modal from "../../UIComponents/modal/modal.component";
import { updateUserRequest } from "../../../api/user-requests";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../../store/user/user.selector";

export type GuidesTableProps = {
  guides: TExtendedGuide[];
  handleChange: () => void;
};

const GuidesTable: FC<GuidesTableProps> = ({ guides, handleChange }) => {
  const userRole = useSelector(selectUserRole);
  const [data, setData] = useState<GuideTableInfo[]>([]);

  const [showEditRoleModal, setShowEditRoleModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [roleInput, setRoleInput] = useState<TGuideRole>("guide");
  const [guideToEdit, setGuideToEdit] = useState<TExtendedGuide>();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1060 && !isSmallScreen) {
        setIsSmallScreen(true);
      } else if (window.innerWidth > 1060 && isSmallScreen) {
        setIsSmallScreen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [isSmallScreen]);

  const columns: ColumnsType<GuideTableInfo> = [
    {
      title: "Role",
      width: isSmallScreen ? 40 : 70,
      dataIndex: "role",
      key: "role",
      fixed: "left",
      sorter: (a, b) => {
        const roleA = a.role.props.children.toLowerCase();
        const roleB = b.role.props.children.toLowerCase();
        if (roleA !== "guide" && roleB === "guide") return 1;
        if (roleA === "guide" && roleB !== "guide") return -1;
        return 0;
      },
    },
    {
      title: "Name",
      width: isSmallScreen ? 68 : 120,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      sorter: (a, b) => {
        const nameA = a.name.props.children[1].props.children
          .split(" ")
          .slice(1)
          .join("")
          .toUpperCase();
        const nameB = b.name.props.children[1].props.children
          .split(" ")
          .slice(1)
          .join("")
          .toUpperCase();

        if (nameA > nameB) return 1;
        if (nameA < nameB) return -1;
        return 0;
      },
    },
    {
      title: "Email",
      width: 120,
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 100,
    },
    {
      title: "Birth Date",
      dataIndex: "birthDate",
      key: "birthDate",
      width: 90,
    },
    {
      title: "Tours",
      dataIndex: "tours",
      key: "tours",
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "stauts",
      width: 72,
      sorter: (a, b) => {
        if (a.status === "deactivated" && b.status === "active") return 1;
        if (a.status === "active" && b.status === "deactivated") return -1;
        return 0;
      },
    },
  ];

  if (userRole === USER_ROLE_TYPES.ADMIN)
    columns.push({
      title: "",
      dataIndex: "actions",
      key: "actions",
      width: 100,
      render: (_, record) => {
        return (
          <ActionButtons
            userInfo={record}
            handlePassDeletedUser={handleChange}
            handlePassUpdateUserActivation={handleChange}
            deleteMessage="This will also remove this guide from all their tours."
            deactivateMessage="This will also remove this guide from all their tours."
          />
        );
      },
    });

  useEffect(() => {
    const newData: GuideTableInfo[] = guides.map((guide) => ({
      key: guide._id || "",
      role: (
        <Role onClick={() => handleOpenModal(guide)}>
          {capitalizeString(guide.role)}
        </Role>
      ),
      name: (
        <UserPictureContainer>
          <ProfilePicture
            pictureSize={PROFILE_PICTURE_SIZE_CLASSES.small}
            pictureUrl={guide.photo}
          />
          <UserName>{`${guide.firstname} ${guide.lastname}`}</UserName>
        </UserPictureContainer>
      ),
      email: guide.email,
      phoneNumber: guide.phoneNumber || "not provided",
      birthDate: guide?.birthDate ? niceDate(guide.birthDate) : "not provided",
      tours: (
        <Tours>
          {guide.tours.map((tour) => (
            <Tour to={`/tour/${tour.slug}`}>{tour.name.toLowerCase()}</Tour>
          ))}
        </Tours>
      ),
      status: guide.active ? "active" : "deactivated",
    }));
    setData(newData);
  }, [guides]);

  const handleCloseModal = () => {
    setShowEditRoleModal(false);
    setErrorMessage("");
  };
  const handleOpenModal = (guide: TExtendedGuide) => {
    setShowEditRoleModal(true);
    setRoleInput(guide.role as TGuideRole);
    setGuideToEdit(guide);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    let response;
    if (guideToEdit?.role === roleInput) response = { status: "success" };
    else
      response = await updateUserRequest(guideToEdit?._id || "", {
        role: roleInput as USER_ROLE_TYPES,
      });
    setLoading(false);
    if (response.status === "success") {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        handleCloseModal();
        handleChange();
      }, 1000);
    } else {
      if (response.message.includes("E11000"))
        setErrorMessage("This email address is already used");
      else setErrorMessage("Something went wrong. Please try again!");
    }
  };
  return (
    <UserTableContainer>
      <ConfigProvider
        theme={{
          hashed: false,
        }}>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: 1200 }}
          summary={() => (
            <Table.Summary fixed="top">
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={0}></Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
          sticky
        />
      </ConfigProvider>
      <Modal
        title={"Edit Role"}
        handleClose={handleCloseModal}
        open={showEditRoleModal}>
        <AuthenticationForm onSubmit={handleSubmit}>
          <SelectInput
            label="Role"
            name="role"
            current={roleInput}
            list={guideRolesList}
            onChange={(e) => {
              setRoleInput(e.target.value as TGuideRole);
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
              Save
            </FormButton>
          </PriceModalButtons>
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </AuthenticationForm>
      </Modal>
    </UserTableContainer>
  );
};

export default GuidesTable;
