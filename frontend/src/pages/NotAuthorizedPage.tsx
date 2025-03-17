import NavBar  from '../components/NavBar.tsx';
import Footer from '../components/Footer.tsx';

export const NotAuthorizedPage = () => {
  return (
    <>
    <NavBar/>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Not Authorized</h1>
            <p className="py-6">
              You do not have permission to access this page. Or perhaps Authenticate yourself by logging in.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};
