import { useEffect, useState } from "react";
import {
  BarChart,
  DoughnutChart,
  LineChart,
  PieChart,
} from "../../../components/UIComponents/charts/charts.component";
import Counter from "../../../components/UIComponents/counter/counter.component";
import { STAT_ICON_TYPE_CLASSES } from "../../../components/UIComponents/statIcon/statIcon.component";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../../components/UIComponents/title/title.component";
import {
  AdminDashboardGrid,
  AdminDashboardSpinner,
  LoadingDashboardContainer,
  LoadingMessage,
} from "../adminDashboard/adminDashboard.style";
import { LargeAdminContent } from "../adminRoutes.style";
import {
  AdminTourCalendarContainer,
  AdminTourCalendarTitle,
  ErrorMessage,
} from "../adminTourCalendar/adminTourCalendar.style";
import { useParams } from "react-router-dom";
import { getTourStats } from "../../../api/stats-requests";
import { TTourStats } from "../../../types/stats";
import Spinner, {
  SPINNER_TYPE_CLASSES,
} from "../../../components/UIComponents/spinner/spinner.component";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { fetchTourAsync } from "../../../store/tour/tour.action";

type TourSlugRouteParams = {
  slug: string;
};

const AdminTourDashboard = () => {
  const { slug } = useParams<
    keyof TourSlugRouteParams
  >() as TourSlugRouteParams;
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [tourStats, setTourStats] = useState<TTourStats>();

  useEffect(() => {
    const loadTourStats = async () => {
      if (!slug) return;
      setIsLoading(true);
      const response = await getTourStats(slug);
      console.log(response);
      if (response && response.status === "success") {
        setErrorMessage("");
        setTourStats(response.data);
      } else setErrorMessage("Something went wrong. Please try again!");
      setIsLoading(false);
    };
    loadTourStats();
  }, [slug]);

  useEffect(() => {
    dispatch(fetchTourAsync(slug));
  }, [slug]);

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
    labels: tourStats?.statsByMonth.map((stat) => stat.month),
    datasets: [
      {
        label: "Booked",
        data: tourStats?.statsByMonth.map((stat) => stat.totalBookings) || [],
        backgroundColor: "rgba(214, 140, 111, 0.8)",
      },
      {
        label: "Unbooked",
        data:
          tourStats?.statsByMonth.map((stat) =>
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
          tourStats?.hikersCount || 0,
          tourStats?.availabilitiesCount && tourStats?.hikersCount
            ? tourStats?.availabilitiesCount - tourStats?.hikersCount
            : 0,
        ],
        backgroundColor: [
          "rgba(214, 140, 111, 0.8)",
          "rgba(115, 128, 105, 0.8)",
        ],
        borderColor: ["#d68d6f", "#738069"],
        borderWidth: 1,
      },
    ],
  };
  const moreThan3BookingsCount = tourStats?.bookingsByUserStats.reduce(
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
          tourStats?.bookingsByUserStats.find((stat) => stat.bookingCount === 1)
            ?.userCount || 0,
          tourStats?.bookingsByUserStats.find((stat) => stat.bookingCount === 2)
            ?.userCount || 0,
          tourStats?.bookingsByUserStats.find((stat) => stat.bookingCount === 3)
            ?.userCount || 0,
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
    labels: tourStats?.ratingsStats.map((stat) => stat.rating.toString()),
    datasets: [
      {
        label: "Number of ratings",
        data: tourStats?.ratingsStats.map((stat) => stat.count) || [],
        backgroundColor: "rgba(214, 140, 111, 0.8)",
        // backgroundColor: "rgba(115, 128, 105, 0.8)",
      },
    ],
  };
  const incomeEvolutionData = {
    labels: tourStats?.statsByMonth.map((stat) => stat.month),
    datasets: [
      {
        label: "Income in U.S Dollars",
        data: tourStats?.statsByMonth.map((stat) => stat.totalRevenue) || [],
        borderColor: "rgb(214, 140, 111)",
        backgroundColor: "rgba(214, 140, 111, 0.8)",
      },
    ],
  };

  return (
    <AdminTourCalendarContainer>
      {isLoading && (
        <LoadingDashboardContainer>
          <LoadingMessage>Calculation in progress</LoadingMessage>
          <AdminDashboardSpinner>
            <Spinner spinnerType={SPINNER_TYPE_CLASSES.large} />
          </AdminDashboardSpinner>
        </LoadingDashboardContainer>
      )}
      {!isLoading && errorMessage.length === 0 && (
        <>
          <AdminTourCalendarTitle>
            <Title titleType={TITLE_TYPE_CLASSES.section}>
              {/* {tourName} - Calendar */}
              {tourStats?.tourName} - Quick Stats
            </Title>
          </AdminTourCalendarTitle>

          <LargeAdminContent>
            <AdminDashboardGrid>
              <Counter
                iconType={STAT_ICON_TYPE_CLASSES.users}
                value={tourStats?.userCount || 0}
                title="users"
              />
              <Counter
                iconType={STAT_ICON_TYPE_CLASSES.start}
                value={tourStats?.startsCount || 0}
                title="starts"
              />
              <Counter
                iconType={STAT_ICON_TYPE_CLASSES.reviews}
                value={tourStats?.ratingAverage || 4.5}
                decimals={2}
                title="rating. avg"
              />
              <Counter
                iconType={STAT_ICON_TYPE_CLASSES.bookings}
                value={tourStats?.bookingsCount || 0}
                title="bookings"
              />
              <Counter
                iconType={STAT_ICON_TYPE_CLASSES.hikers}
                value={tourStats?.hikersCount || 0}
                title="hikers"
              />
              <Counter
                iconType={STAT_ICON_TYPE_CLASSES.dollar}
                value={tourStats?.totalRevenue || 0}
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
              <LineChart
                title="Income over the last 6 months"
                data={incomeEvolutionData}
              />
            </AdminDashboardGrid>
          </LargeAdminContent>
        </>
      )}
      {errorMessage.length > 0 && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </AdminTourCalendarContainer>
  );
};

export default AdminTourDashboard;
