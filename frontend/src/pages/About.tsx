import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/phishy-logo.png'
import Carousel from "../components/Carousel";
import LoaderSpinner from "../components/LoaderSpinner";

export default function About() {
  const navigate = useNavigate()  
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return <LoaderSpinner />;
  }

  return (
    <div>
      <Carousel />
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={logo}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Phishy Electronics</h1>
            <p className="py-6 text-lg md:text-xl font-medium text-base-content/80 max-w-2xl">
              Dive into a world of cutting-edge gaming gear, innovative
              electronic devices, and unbeatable deals. At Phishy, we blend
              convenience with excitement, offering a seamless shopping
              experience for gamers and tech enthusiasts alike.
            </p>
            <button className="btn btn-block bg-violet-600" onClick={() => navigate('/login')}>Get Started And Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}