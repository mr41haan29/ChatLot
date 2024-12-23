import { TbLogout2 } from "react-icons/tb";
import useLogout from "../../hooks/useLogout";

function LogoutButton() {
  const { logout } = useLogout();
  return (
    <div className="mt-auto">
      <TbLogout2
        className="w-7 h-7 text-white cursor-pointer"
        onClick={logout}
      />
    </div>
  );
}

export default LogoutButton;
