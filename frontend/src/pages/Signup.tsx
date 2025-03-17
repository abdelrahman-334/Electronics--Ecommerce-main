import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../AuthContext/AuthContext.tsx'
import LoaderSpinner from "../components/LoaderSpinner.tsx";
import logo from "../assets/phishy-logo.png";
import Alert from "../components/Alert.tsx";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setShowLoginAlert, showLoginAlert } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api-gateway/auth/signup", { username, password });
      setShowLoginAlert(true);
      setTimeout(() => {
        setShowLoginAlert(false);
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("There was an error calling the signup api!: ", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return <LoaderSpinner />;
  }

  return (
    <>
      {loading && <LoaderSpinner />}

      {showLoginAlert && <Alert message="Sign Up Successful! Now Login Please." />}

      <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
        <div className="flex flex-col lg:flex-row-reverse items-center space-x-0 lg:space-x-10 space-y-10 lg:space-y-0">
          <div className="flex-shrink-0 ml-10">
            <img src={logo} alt="Phishy Logo" className="h-64 w-auto lg:h-80" />
          </div>
          <div className="card bg-base-100 p-8 shadow-2xl w-full max-w-md">
            <h1 className="text-5xl font-bold mb-6 text-center lg:text-left">
              Signup now!
            </h1>
            <p className="mb-6 text-center lg:text-left">
              Welcome Abroad, please Signup to our systems with your credentials
              to get started.
            </p>
            <form
              className="card-body p-0"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Username Here..."
                  className="input input-bordered"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password Here..."
                  className="input input-bordered"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="label mt-6">
                  <Link to="/login" className="label-text-alt link link-hover">
                    Already Have An Account? Login Now!
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary w-full">
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
