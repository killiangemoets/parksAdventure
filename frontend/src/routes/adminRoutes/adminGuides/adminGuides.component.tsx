import { useEffect, useState } from "react";
import TourGuidesNavbar from "../../../components/adminsProfilePagesComponents/adminNavbars/tourGuidesNavbar.component";
import AdminSectionTitle from "../../../components/adminsProfilePagesComponents/adminSectionTitle/adminSectionTitle.component";
import {
  AdminContentErrorMessage,
  AdminContentSpinner,
  AdminFixHeader,
  AdminLargeContent,
  AdminSectionContainer,
  AdminStatContainer,
  AdminStatTitle,
  AdminStatValue,
  AdminStatsSection,
} from "../adminRoutes.style";
import { TExtendedGuide } from "../../../types/user";
import { getAllGuidesWithDetails } from "../../../api/user-requests";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../../components/UIComponents/spinner/spinner.component";
import GuidesTable from "../../../components/adminsProfilePagesComponents/usersTable/guidesTable.component";
import { useSearchParams } from "react-router-dom";

const AdminGuides = () => {
  const [searchParams] = useSearchParams();
  const [guides, setGuides] = useState<TExtendedGuide[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stats, setStats] = useState<{ guides: number; leadGuides: number }>({
    guides: 0,
    leadGuides: 0,
  });

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
      const guidesList: TExtendedGuide[] = response.data.data;
      setGuides(guidesList);
      setErrorMessage(undefined);

      const newStats = guidesList.reduce(
        (acc, guide) => {
          if (guide.role === "guide")
            return { guides: acc.guides + 1, leadGuides: acc.leadGuides };
          else return { guides: acc.guides, leadGuides: acc.leadGuides + 1 };
        },
        {
          guides: 0,
          leadGuides: 0,
        }
      );

      setStats(newStats);
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
      <AdminStatsSection>
        <AdminStatContainer>
          <AdminStatTitle>Guides:</AdminStatTitle>
          <AdminStatValue>{stats.guides}</AdminStatValue>
        </AdminStatContainer>
        <AdminStatContainer>
          <AdminStatTitle>Lead-Guides:</AdminStatTitle>
          <AdminStatValue>{stats.leadGuides}</AdminStatValue>
        </AdminStatContainer>
      </AdminStatsSection>
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
