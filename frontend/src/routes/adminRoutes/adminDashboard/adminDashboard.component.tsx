import { useEffect, useState } from "react";
import {
  BarChart,
  DoughnutChart,
  MapChart,
  PieChart,
  SmallBarChart,
  SmallLineChart,
} from "../../../components/UIComponents/charts/charts.component";
import Counter from "../../../components/UIComponents/counter/counter.component";
import { STAT_ICON_TYPE_CLASSES } from "../../../components/UIComponents/statIcon/statIcon.component";
import AdminSectionTitle from "../../../components/adminsProfilePagesComponents/adminSectionTitle/adminSectionTitle.component";
import {
  AdminFixHeader,
  AdminSectionContainer,
  AdminMediumContent,
} from "../adminRoutes.style";
import {
  AdminDashboardGrid,
  AdminDashboardSpinner,
  LoadingDashboardContainer,
  LoadingMessage,
} from "./adminDashboard.style";
import { getGeneralStats } from "../../../api/stats-requests";
import { TGeneralStats } from "../../../types/stats";
import { ErrorMessage } from "../adminTourCalendar/adminTourCalendar.style";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../../components/UIComponents/spinner/spinner.component";
import { capitalizeString } from "../../../utils/formatting/formatString";
import colors from "../../../colors";

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [generalStats, setGeneralStats] = useState<TGeneralStats>();

  useEffect(() => {
    const loadGeneralStats = async () => {
      setIsLoading(true);
      const response = await getGeneralStats();
      if (response && response.status === "success") {
        setErrorMessage("");
        setGeneralStats(response.data);
      } else
        setErrorMessage(
          "An error occured. Please refresh the page and try again!"
        );
      setIsLoading(false);
    };
    loadGeneralStats();
  }, []);

  const bookedUnbookadBarsOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  const bookedUnbookedBarsData = {
    labels: generalStats?.statsByMonth.map((stat) => stat.month),
    datasets: [
      {
        label: "Booked",
        data:
          generalStats?.statsByMonth.map((stat) => stat.totalBookings) || [],
        backgroundColor: "rgba(214, 140, 111, 0.8)",
      },
      {
        label: "Unbooked",
        data:
          generalStats?.statsByMonth.map((stat) =>
            Math.max(stat.totalAvailabilities - stat.totalBookings, 0)
          ) || [],
        backgroundColor: "rgba(115, 128, 105, 0.8)",
      },
    ],
  };

  const bookedUnbookedTotalData = {
    labels: ["Booked", "Unbooked"],
    datasets: [
      {
        label: "slots",
        data: [
          generalStats?.hikersCount || 0,
          generalStats?.availabilitiesCount && generalStats?.hikersCount
            ? generalStats?.availabilitiesCount - generalStats?.hikersCount
            : 0,
        ],
        backgroundColor: [
          "rgba(214, 140, 111, 0.8)",
          "rgba(115, 128, 105, 0.8)",
        ],
        borderColor: [colors.primaryMediumLight, colors.secondaryMediumLight],
        borderWidth: 1,
      },
    ],
  };
  const moreThan3BookingsCount = generalStats?.bookingsByUserStats.reduce(
    (acc, curr) => {
      if (curr.bookingCount <= 3) return acc;
      else return acc + curr.userCount;
    },
    0
  );
  const bookingsByUserData = {
    labels: ["1 booking", "2 bookings", "3 bookings", "+3 bookings"],
    datasets: [
      {
        label: "users",
        data: [
          generalStats?.bookingsByUserStats.find(
            (stat) => stat.bookingCount === 1
          )?.userCount || 0,
          generalStats?.bookingsByUserStats.find(
            (stat) => stat.bookingCount === 2
          )?.userCount || 0,
          generalStats?.bookingsByUserStats.find(
            (stat) => stat.bookingCount === 3
          )?.userCount || 0,
          moreThan3BookingsCount || 0,
        ],
        backgroundColor: [
          "rgba(163, 89, 60, 0.8)",
          "rgba(64, 77, 54, 0.8)",
          "rgba(230, 184, 165, 0.8)",
          "rgba(168, 176, 162, 0.8)",
        ],
        borderColor: ["#a35a3c", "#404d36", "#e6b8a5", "#a8b0a2"],
        borderWidth: 1,
      },
    ],
  };
  const ratingDistributionOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };
  const ratingDistributionData = {
    labels: generalStats?.ratingsStats.map((stat) => stat.rating.toString()),
    datasets: [
      {
        label: "Number of ratings",
        data: generalStats?.ratingsStats.map((stat) => stat.count) || [],
        backgroundColor: "rgba(214, 140, 111, 0.8)",
        // backgroundColor: "rgba(115, 128, 105, 0.8)",
      },
    ],
  };
  const toursWithTheMostHikersData = {
    labels: generalStats?.toursWithTheMostHikers.map((tour) =>
      capitalizeString(tour.tourData.name)
    ),
    datasets: [
      {
        label: "Number of Hikers",
        data:
          generalStats?.toursWithTheMostHikers.map((tour) => tour.totalGroup) ||
          [],
        backgroundColor: "rgba(214, 140, 111, 0.8)",
      },
      {
        label: "Number of Bookings",
        data:
          generalStats?.toursWithTheMostHikers.map(
            (tour) => tour.totalBookings
          ) || [],
        backgroundColor: "rgba(115, 128, 105, 0.8)",
      },
    ],
  };
  const incomeEvolutionData = {
    labels: generalStats?.statsByMonth.map((stat) => stat.month),
    datasets: [
      {
        label: "Income in U.S Dollars",
        data: generalStats?.statsByMonth.map((stat) => stat.totalRevenue) || [],
        borderColor: "rgb(214, 140, 111)",
        backgroundColor: "rgba(214, 140, 111, 0.8)",
      },
    ],
  };
  const incomeByLocationData =
    generalStats?.revenueByTour.map((tourStats) => ({
      tour: tourStats.name,
      lng: tourStats.startLocation.coordinates[0],
      lat: tourStats.startLocation.coordinates[1],
      revenue: tourStats.totalRevenue,
    })) || [];

  return (
    <AdminSectionContainer>
      <AdminFixHeader>
        <AdminSectionTitle>Dashboard</AdminSectionTitle>
      </AdminFixHeader>
      {isLoading && (
        <LoadingDashboardContainer>
          <LoadingMessage>Calculation in progress</LoadingMessage>
          <AdminDashboardSpinner>
            <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
          </AdminDashboardSpinner>
        </LoadingDashboardContainer>
      )}
      {!isLoading && errorMessage.length === 0 && (
        <AdminMediumContent>
          <AdminDashboardGrid>
            <Counter
              iconType={STAT_ICON_TYPE_CLASSES.users}
              value={generalStats?.userCount || 0}
              title="users"
            />
            <Counter
              iconType={STAT_ICON_TYPE_CLASSES.tours}
              value={generalStats?.tourCount || 0}
              title="tours"
            />
            <Counter
              iconType={STAT_ICON_TYPE_CLASSES.reviews}
              value={generalStats?.ratingAverage || 4.5}
              decimals={2}
              title="rating. avg"
            />
            <Counter
              iconType={STAT_ICON_TYPE_CLASSES.bookings}
              value={generalStats?.bookingsCount || 0}
              title="bookings"
            />
            <Counter
              iconType={STAT_ICON_TYPE_CLASSES.hikers}
              value={generalStats?.hikersCount || 0}
              title="hikers"
            />
            <Counter
              iconType={STAT_ICON_TYPE_CLASSES.dollar}
              value={generalStats?.totalRevenue || 0}
              title="revenue"
            />
            <BarChart
              title="Booked / Unbooked slots over the last 6 months"
              data={bookedUnbookedBarsData}
              options={bookedUnbookadBarsOptions}
            />
            <DoughnutChart
              title="Total booked / unbooked slots"
              data={bookedUnbookedTotalData}
            />
            <PieChart title="Bookings by user" data={bookingsByUserData} />
            <BarChart
              title="Rating distribution"
              data={ratingDistributionData}
              options={ratingDistributionOptions}
            />
            <SmallBarChart
              title="Tours with the most hikers"
              data={toursWithTheMostHikersData}
              options={ratingDistributionOptions}
            />
            <SmallLineChart
              title="Income over the last 6 months"
              data={incomeEvolutionData}
            />
            <MapChart title="Income By Location" data={incomeByLocationData} />
          </AdminDashboardGrid>
        </AdminMediumContent>
      )}
      {errorMessage.length > 0 && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </AdminSectionContainer>
  );
};

export default AdminDashboard;
