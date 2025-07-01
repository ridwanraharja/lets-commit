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


export const router = createBrowserRouter([
    {
      path: "/",
      element:<Navbar />,
      
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/explore",
          element : <ExplorePage />
        },
        {
          path: "/create",
          element : <CreatePage/>
        },
        {
          path: "/dashboard",
          element : <UserDashboardPage />
        },
        {
          path: "/aboutus",
          element : <AboutUsPage />
        },
        {
          path: "/donate",
          element : <DonateSection />
        },
        {
          path: "/partnership",
          element : <PartnershipSection />
        },
        {
          path: "/join-community",
          element : <JoinCommunitySection />
        },
        {
          path: "*",
          element: <NotFoundPage />
        }


      ],
    },
]);