import { FC, ReactNode, useState } from "react";
import { ConfigProvider, Switch, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import ReviewProfile from "../reviewProfile/reviewProfile.component";
import ProfilePicture, {
  PROFILE_PICTURE_SIZE_CLASSES,
} from "../profilePicture/profilePicture.component";
import {
  ActionButtons,
  UserName,
  UserPictureContainer,
  UserTableContainer,
} from "./usersTable.style";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { SorterResult } from "antd/es/table/interface";

interface DataType {
  key: React.Key;
  name: ReactNode;
  email: string;
  phoneNumber: string;
  birthDate: string;
  bookingsNumber: number;
  reviewsNumber: number;
  ratingAverage: number;
  status: "active" | "desactivated";
}

const data: DataType[] = [];
for (let i = 0; i < 98; i++) {
  data.push({
    key: i,
    name: (
      <UserPictureContainer>
        <ProfilePicture
          pictureSize={PROFILE_PICTURE_SIZE_CLASSES.small}
          pictureUrl={undefined}
        />
        <UserName>Taylor Swift</UserName>
      </UserPictureContainer>
    ),
    email: "taylor.swift@gmail.com",
    phoneNumber: "+32479567832",
    birthDate: "05/12/1980",
    bookingsNumber: 3,
    reviewsNumber: 2,
    ratingAverage: 4.5,
    status: "active",
  });
}
data.push({
  key: 101,
  name: (
    <UserPictureContainer>
      <ProfilePicture
        pictureSize={PROFILE_PICTURE_SIZE_CLASSES.small}
        pictureUrl={undefined}
      />
      <UserName>Taylor Swift</UserName>
    </UserPictureContainer>
  ),
  email: "taylor.swift@gmail.com",
  phoneNumber: "+32479567832",
  birthDate: "05/12/1980",
  bookingsNumber: 2,
  reviewsNumber: 0,
  ratingAverage: 5,
  status: "desactivated",
});
data.push({
  key: 102,
  name: (
    <UserPictureContainer>
      <ProfilePicture
        pictureSize={PROFILE_PICTURE_SIZE_CLASSES.small}
        pictureUrl={undefined}
      />
      <UserName>Taylor Swift</UserName>
    </UserPictureContainer>
  ),
  email: "taylor.swift@gmail.com",
  phoneNumber: "+32479567832",
  birthDate: "05/12/1980",
  bookingsNumber: 6,
  reviewsNumber: 6,
  ratingAverage: 4,
  status: "desactivated",
});

const UsersTable: FC = () => {
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});

  const columns: ColumnsType<DataType> = [
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
      //   sortOrder:
      //     sortedInfo.columnKey === "ratingAverage" ? sortedInfo.order : null,
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
      // fixed: "right",
      width: 100,
      render: () => (
        <ActionButtons>
          <Button buttonType={BUTTON_TYPE_CLASSES.empty}>Desactivate</Button>
          <Button buttonType={BUTTON_TYPE_CLASSES.empty}>Delete</Button>
        </ActionButtons>
      ),
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
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
          onChange={onChange}
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
