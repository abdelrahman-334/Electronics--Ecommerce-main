import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import logo from "../assets/phishy-logo.png";
import LoaderSpinner from "../components/LoaderSpinner";
import Carousel from "../components/Carousel";

export default function Home() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <LoaderSpinner />;
  }

  return (
    <>
      <div className="relative">
        <div className="hero bg-base-200 min-h-screen relative z-10">
          <div className="hero-content flex-col items-center justify-center text-center">
            <h1 className="text-5xl font-bold mb-10">Welcome To Phishy Gaming <br /> Electronics Platform!</h1>
            <img
              src={logo}
              alt="phishy-logo"
              className="max-w-sm rounded-lg shadow-2xl mb-8 lg:mb-0"
            />
          </div>
        </div>

        <Carousel />

        <div className="hero bg-base-200 min-h-screen relative z-10">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={logo}
              alt="giza-systems-logo"
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              {/* <h1 className="text-5xl font-bold">About Us</h1> */}
              <p className=" font-black py-10">
                Welcome To Phishy!, The best electonics ecommerce out there, <br /> browse our different categories
                with high quality products!
              </p>

              {!token ? (
                <>
                  <button className="btn btn-block bg-violet-700 m-3" onClick={() => navigate('/login')}>Login</button>
                  <button className="btn btn-block bg-violet-700 m-3" onClick={() => navigate('/signup')}>Signup</button>
                </>
              ) : 
              (
                  <button className="btn btn-block bg-violet-700 m-3" onClick={() => navigate('/categories')}>Browse Categories!</button>
              )
              }
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};