import { useDispatch, useSelector } from "react-redux";
import { googleLogin } from "@/store/authThunks";
import { Button } from "@/components/ui/button";

export default function Login() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleGoogleLogin = async() => {
    await dispatch(googleLogin());
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-bold mb-4">Login with Google</h1>
      <Button onClick={handleGoogleLogin} disabled={loading}>
        {loading ? "Loading..." : "Sign in with Google"}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {user && (
        <div className="mt-4">
          <p>Welcome, {user.name}</p>
          <img
            src={user.photo}
            alt="avatar"
            className="w-12 h-12 rounded-full"
          />
        </div>
      )}
    </div>
  );
}
