import { Link, Outlet, useLocation } from "react-router-dom";
import SideMenuContainer from "./components/SideMenu/SideMenuContainer";
import ToggleExplorerButton from "./components/SideMenu/ToggleExplorerButton";
import { APP_NAVIGATION } from "./config";
import { ExplorerContextProvider } from "./context/ExplorerContext";

function App() {
  const location = useLocation();

  return (
    <ExplorerContextProvider>
      <div
        className="flex flex-col grow h-screen"
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex grow">
          <SideMenuContainer>
            <ToggleExplorerButton />

            <div>
              {APP_NAVIGATION.map((item) => (
                <Link
                  to={item.href}
                  key={item.value}
                  className={`flex justify-center p-3 hover:bg-zinc-700 ${
                    location.pathname === item.href
                      ? "bg-zinc-700"
                      : "bg-zinc-800"
                  }`}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </SideMenuContainer>
          <Outlet />
        </div>
      </div>
    </ExplorerContextProvider>
  );
}

export default App;
