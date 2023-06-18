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
  const columns: ColumnsType<UserTableInfo> = [
    {
      title: "Name",
      width: 120,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Email",
      width: 180,
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 128,
    },
    {
      title: "Birth Date",
      dataIndex: "birthDate",
      key: "birthDate",
      width: 90,
    },
    {
      title: "N° of Bookings",
      dataIndex: "bookingsNumber",
      key: "bookingsNumber",
      width: 62,
      sorter: (a, b) => a.bookingsNumber - b.bookingsNumber,
    },
    {
      title: "N° of Reviews",
      dataIndex: "reviewsNumber",
      key: "reviewsNumber",
      width: 62,
      sorter: (a, b) => a.reviewsNumber - b.reviewsNumber,
    },
    {
      title: "Rating Average",
      dataIndex: "ratingAverage",
      key: "ratingAverage",
      width: 62,
      sorter: (a, b) => a.ratingAverage - b.ratingAverage,
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
            deleteMessage="This will also DELETE all reviews of this user!"
            desactivateMessage="This will also hide all the reviews of this user!"
          />
        );
      },
    });

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
          reviewsNumber:
            userInfo.status === "active" ? 0 : userInfo.reviewsNumber,
          ratingAverage:
            userInfo.status === "active" ? 4.5 : userInfo.ratingAverage,
        };
      } else return userInfo;
    });
    setData(newData);
  };

  useEffect(() => {
    const newData: UserTableInfo[] = users.map((user) => ({
      key: user._id || "",
      name: (
        <UserPictureContainer>
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
      status: user.active ? "active" : "desactivated",
    }));
    setData(newData);
  }, [users]);

  // const onChange: TableProps<UserInfo>["onChange"] = (
  //   pagination,
  //   filters,
  //   sorter,
  //   extra
  // ) => {
  //   console.log("params", pagination, filters, sorter, extra);
  // };

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
    </UserTableContainer>
  );
};

export default UsersTable;
