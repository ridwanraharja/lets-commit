import { createBrowserRouter } from "react-router-dom";

import Navbar from "../layout/Navbar";
import NotFoundPage from "../pages/NotFoundPage";
import ExplorePage from "../pages/ExplorePage";
import HomePage from "../pages/HomePage";
import CreatePage from "../pages/CreatePage";
import UserDashboardPage from "../pages/UserDashboardPage";
import AboutUsPage from "../pages/AboutUsPage";
import DonateSection from "../pages/DonateSection";
import PartnershipSection from "../pages/PartnershipSection";
import JoinCommunitySection from "../pages/JoinCommunitySection";
import EventDetail from "../components/EventDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,

    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/explore",
        element: <ExplorePage />,
      },
      {
        path: "/create-event",
        element: <CreatePage />,
      },
      {
        path: "/dashboard",
        element: <UserDashboardPage />,
      },
      {
        path: "/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/donate",
        element: <DonateSection />,
      },
      {
        path: "/partnership",
        element: <PartnershipSection />,
      },
      {
        path: "/join-community",
        element: <JoinCommunitySection />,
      },
      {
        path: "/events/:eventId",
        element: <EventDetail />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
