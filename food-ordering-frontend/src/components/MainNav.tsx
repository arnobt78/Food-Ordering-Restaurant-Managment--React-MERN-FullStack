import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span className="flex space-x-4 items-center">
      <Link to="/api-docs" className="font-bold hover:text-orange-500">
        API Docs
      </Link>
      <Link to="/api-status" className="font-bold hover:text-orange-500">
        API Status
      </Link>
      {isAuthenticated ? (
        <>
          <Link
            to="/business-insights"
            className="font-bold hover:text-orange-500"
          >
            Analytics
          </Link>
          <Link to="/performance" className="font-bold hover:text-orange-500">
            Performance
          </Link>
          <Link to="/order-status" className="font-bold hover:text-orange-500">
            Order Status
          </Link>
          <UsernameMenu />
        </>
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white border-2 border-orange-500"
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </span>
  );
};

export default MainNav;
