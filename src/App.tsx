import { Link, Outlet, useLocation } from "react-router-dom";
import SideMenuContainer from "./components/SideMenu/SideMenuContainer";
import SideMenuButton from "./components/SideMenu/SideMenuButton";
import { AiOutlineFolder } from "react-icons/ai";
import { APP_NAVIGATION } from "./config";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen w-full flex">
      <SideMenuContainer>
        <SideMenuButton action={() => {}}>
          <AiOutlineFolder className="text-zinc-100" />
        </SideMenuButton>

        <div>
          {APP_NAVIGATION.map((item) => (
            <Link
              to={item.href}
              key={item.value}
              className={`flex justify-center p-3 hover:bg-zinc-700 ${
                location.pathname === item.href ? "bg-zinc-700" : "bg-zinc-800"
              }`}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </SideMenuContainer>
      <Outlet />
    </div>
  );
}

export default App;
