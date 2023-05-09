import { useEffect, useState } from "react";
import TourGuidesNavbar from "../../../components/adminsProfilePagesCompoents/adminNavbars/tourGuidesNavbar.component";
import AdminSectionTitle from "../../../components/adminsProfilePagesCompoents/adminSectionTitle/adminSectionTitle.component";
import {
  AdminContent,
  AdminContentErrorMessage,
  AdminContentSpinner,
  AdminFixHeader,
  AdminSectionContainer,
} from "../adminRoutes.style";
import { TUser } from "../../../types/user";
import { getAllUsers } from "../../../api/user-requests";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../../components/UIComponents/spinner/spinner.component";

const AdminGuides = () => {
  const [guides, setGuides] = useState<TUser[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleGetGuides = async () => {
      setIsLoading(true);
      const response = await getAllUsers("?role=guide&role=lead-guide");
      console.log(response);
      if (response.status === "success") {
        setGuides(response.data.data);
        setErrorMessage(undefined);
      } else {
        setErrorMessage("An error occured. Try to reload the page!");
      }
      setIsLoading(false);
    };
    handleGetGuides();
  }, []);
  return (
    <AdminSectionContainer>
      <AdminFixHeader>
        <AdminSectionTitle>Tour Guides</AdminSectionTitle>
        <TourGuidesNavbar />
      </AdminFixHeader>
      <AdminContent>
        {isLoading && (
          <AdminContentSpinner>
            <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
          </AdminContentSpinner>
        )}
        {errorMessage && (
          <AdminContentErrorMessage>{errorMessage}</AdminContentErrorMessage>
        )}
      </AdminContent>
    </AdminSectionContainer>
  );
};

export default AdminGuides;
