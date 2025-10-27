import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
