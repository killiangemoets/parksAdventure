import { FC, useEffect, useState } from "react";
import { ConfigProvider, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import ProfilePicture, {
  PROFILE_PICTURE_SIZE_CLASSES,
} from "../../UIComponents/profilePicture/profilePicture.component";
import {
  UserName,
  UserPictureContainer,
  UserTableContainer,
} from "./usersTable.style";
import {
  TExtendedUser,
  USER_ROLE_TYPES,
  UserTableInfo,
} from "../../../types/user";
import niceDate from "../../../utils/formatting/formatDates";
import ActionButtons from "./actionButtons.component";
import { selectUserRole } from "../../../store/user/user.selector";
import { useSelector } from "react-redux";

export type UsersTableProps = {
  users: TExtendedUser[];
  handleChange: () => void;
};

const UsersTable: FC<UsersTableProps> = ({ users, handleChange }) => {
  const userRole = useSelector(selectUserRole);
  const [data, setData] = useState<UserTableInfo[]>([]);

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

  const columns: ColumnsType<UserTableInfo> = [
    {
      title: "Name",
      width: isSmallScreen ? 68 : 100,
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
      width: 118,
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 72,
    },
    {
      title: "Birth Date",
      dataIndex: "birthDate",
      key: "birthDate",
      width: 60,
    },
    {
      title: "N° of Bookings",
      dataIndex: "bookingsNumber",
      key: "bookingsNumber",
      width: 54,
      sorter: (a, b) => a.bookingsNumber - b.bookingsNumber,
    },
    {
      title: "N° of Reviews",
      dataIndex: "reviewsNumber",
      key: "reviewsNumber",
      width: 54,
      sorter: (a, b) => a.reviewsNumber - b.reviewsNumber,
    },
    {
      title: "Rating Average",
      dataIndex: "ratingAverage",
      key: "ratingAverage",
      width: 54,
      sorter: (a, b) => a.ratingAverage - b.ratingAverage,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "stauts",
      width: 60,
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
      width: 80,
      render: (_, record) => {
        return (
          <ActionButtons
            userInfo={record}
            handlePassDeletedUser={handleChange}
            handlePassUpdateUserActivation={handleChange}
            deleteMessage="This will also DELETE all reviews of this user!"
            deactivateMessage="This will also hide all the reviews of this user!"
          />
        );
      },
    });

  useEffect(() => {
    const newData: UserTableInfo[] = users.map((user) => ({
      key: user._id || "",
      name: (
        <UserPictureContainer key={user._id}>
          <ProfilePicture
            pictureSize={PROFILE_PICTURE_SIZE_CLASSES.small}
            pictureUrl={user.photo}
          />
          <UserName>{`${user.firstname} ${user.lastname}`}</UserName>
        </UserPictureContainer>
      ),
      email: user.email,
      phoneNumber: user.phoneNumber || "not provided",
      birthDate: user?.birthDate ? niceDate(user.birthDate) : "not provided",
      bookingsNumber: user.numOfBookings,
      reviewsNumber: user.numOfRatings,
      ratingAverage: user.avgRating,
      status: user.active ? "active" : "deactivated",
    }));
    setData(newData);
  }, [users]);

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
    </UserTableContainer>
  );
};

export default UsersTable;
