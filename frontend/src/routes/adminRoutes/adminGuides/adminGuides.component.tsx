import { useEffect, useState } from "react";
import TourGuidesNavbar from "../../../components/adminsProfilePagesCompoents/adminNavbars/tourGuidesNavbar.component";
import AdminSectionTitle from "../../../components/adminsProfilePagesCompoents/adminSectionTitle/adminSectionTitle.component";
import {
  AdminContentErrorMessage,
  AdminContentSpinner,
  AdminFixHeader,
  AdminLargeContent,
  AdminSectionContainer,
} from "../adminRoutes.style";
import { TExtendedGuide } from "../../../types/user";
import { getAllGuidesWithDetails } from "../../../api/user-requests";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../../components/UIComponents/spinner/spinner.component";
import GuidesTable from "../../../components/adminsProfilePagesCompoents/usersTable/guidesTable.component";
import { useSearchParams } from "react-router-dom";

const AdminGuides = () => {
  const [searchParams] = useSearchParams();
  const [guides, setGuides] = useState<TExtendedGuide[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetGuides = async () => {
    setIsLoading(true);

    const requestStringFromUrl = window.location.href.split("?")[1];
    // const pageRequest = currentPage > 1 ? `&page=${currentPage}` : "";
    const pageRequest = "";

    // let requestString = `&limit=${process.env.REACT_APP_BOOKINGS_PER_PAGE}${pageRequest}`;
    let requestString = `${pageRequest}`;
    if (requestStringFromUrl) requestString += `&${requestStringFromUrl}`;

    const response = await getAllGuidesWithDetails(
      `?role=guide&role=lead-guide${requestString}`
    );
    console.log(response);
    if (response.status === "success") {
      setGuides(response.data.data);
      setErrorMessage(undefined);
    } else {
      setErrorMessage("An error occured. Try to reload the page!");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetGuides();
  }, [searchParams]);
  return (
    <AdminSectionContainer>
      <AdminFixHeader>
        <AdminSectionTitle>Tour Guides</AdminSectionTitle>
        <TourGuidesNavbar onCreateGuide={handleGetGuides} />
      </AdminFixHeader>
      <AdminLargeContent>
        {isLoading && (
          <AdminContentSpinner>
            <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
          </AdminContentSpinner>
        )}
        {errorMessage && (
          <AdminContentErrorMessage>{errorMessage}</AdminContentErrorMessage>
        )}
        {!isLoading && !errorMessage && (
          <GuidesTable guides={guides} handleChange={handleGetGuides} />
        )}
      </AdminLargeContent>
    </AdminSectionContainer>
  );
};

export default AdminGuides;
