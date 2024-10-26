
// import axios from "axios";
import { useRouter } from "next/navigation";

export const LogoutContainer = () => {
  const router = useRouter();
  const logout = async () => {
    // try {
    //   await axios.get("api/users/logout");
    //   router.push("/login");
    // } catch (error: any) {
    //   console.log("Error logging out:", error.message);
    // }
  };
  return (
    <div className="flex justify-end p-2">
      <button onClick={logout} className="bg-red-600 rounded-md p-2">
        Logout
      </button>
    </div>
  );
};
