import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/NavBar";
import Paste from "./components/Paste";
import Home from "./components/Home";
import ViewPaste from "./components/ViewPaste";
import Footer from "./components/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        {/* Main content should grow to fill space */}
        <main className="flex-grow">
          <Home />
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        {/* Main content should grow to fill space */}
        <main className="flex-grow">
          <Paste />
        </main>
        <Footer />
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        {/* Main content should grow to fill space */}
        <main className="flex-grow">
          <ViewPaste />
        </main>
        <Footer />
      </div>
    ),
  },
]);
const App = () => {
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
};

export default App;
