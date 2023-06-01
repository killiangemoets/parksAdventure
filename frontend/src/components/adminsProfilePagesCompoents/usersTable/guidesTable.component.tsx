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

export type GuidesTableProps = {
  guides: TExtendedGuide[];
  handleChange: () => void;
};

const GuidesTable: FC<GuidesTableProps> = ({ guides, handleChange }) => {
  const [data, setData] = useState<GuideTableInfo[]>([]);

  const [showEditRoleModal, setShowEditRoleModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [roleInput, setRoleInout] = useState<TGuideRole>("guide");

  const columns: ColumnsType<GuideTableInfo> = [
    {
      title: "Role",
      width: 80,
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
      width: 120,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      sorter: (a, b) => {
        console.log({ a, b });
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
        if (a.status === "desactivated" && b.status === "active") return 1;
        if (a.status === "active" && b.status === "desactivated") return -1;
        return 0;
      },
    },
    {
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
            desactivateMessage="This will also remove this guide from all their tours."
          />
        );
      },
    },
  ];

  const handleDeleteUser = (userId: string) => {
    const newData = data.filter(
      (userInfo) => userInfo.key.toString() !== userId
    );
    setData(newData);
  };

  const handleUpdateUserActivation = (userId: string) => {
    const newData = data.map((userInfo) => {
      if (userInfo.key.toString() === userId) {
        return {
          ...userInfo,
          status:
            userInfo.status === "active"
              ? "desactivated"
              : ("active" as "active" | "desactivated"),
          tours: userInfo.status === "active" ? [] : userInfo.tours,
        };
      } else return userInfo;
    });
    setData(newData);
  };

  useEffect(() => {
    const newData: GuideTableInfo[] = guides.map((guide) => ({
      key: guide._id || "",
      role: (
        <Role onClick={() => handleOpenModal(guide.role as TGuideRole)}>
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
      status: guide.active ? "active" : "desactivated",
    }));
    setData(newData);
  }, [guides]);

  // const onChange: TableProps<GuideInfo>["onChange"] = (
  //   pagination,
  //   filters,
  //   sorter,
  //   extra
  // ) => {
  //   console.log("params", pagination, filters, sorter, extra);
  // };

  const handleCloseModal = () => {
    setShowEditRoleModal(false);
  };
  const handleOpenModal = (role: TGuideRole) => {
    setShowEditRoleModal(true);
    setRoleInout(role);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    // const response = await createTourGuide(createTourGuideData);
    setLoading(false);
    // if (response.status === "success") {
    //   setSuccess(true);
    // } else {
    //   if (response.message.includes("E11000"))
    //     setErrorMessage("This email address is already used");
    //   else setErrorMessage("Something went wrong. Please try again!");
    // }
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
          scroll={{ x: 1500 }}
          // onChange={onChange}
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
              setRoleInout(e.target.value as TGuideRole);
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
