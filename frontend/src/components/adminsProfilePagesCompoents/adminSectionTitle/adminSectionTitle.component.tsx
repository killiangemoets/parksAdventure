import { FC } from "react";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import { AdminSectionTitleContainer } from "./adminSectionTitle.style";

type AdminSectionTitleProps = {
  children: string;
};

const AdminSectionTitle: FC<AdminSectionTitleProps> = ({ children }) => {
  return (
    <AdminSectionTitleContainer>
      <Title titleType={TITLE_TYPE_CLASSES.section}>{children}</Title>
    </AdminSectionTitleContainer>
  );
};

export default AdminSectionTitle;
