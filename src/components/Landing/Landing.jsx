import { Link } from 'react-router';

const Landing = () => {
  return (
    <main className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Welcome to Code Crew</h1>
        <p className="lead text-secondary">
          Sign up now, or sign in to see your dashboard.
        </p>
      </div>

      <div className="row justify-content-center g-4">
        <div className="col-12 col-md-5">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center d-flex flex-column">
              <h5 className="card-title">New here?</h5>
              <p className="card-text flex-grow-1">
                Create an account to start building projects or join a team.
              </p>
              <Link to="/sign-up" className="btn btn-primary">Sign Up</Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-5">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center d-flex flex-column">
              <h5 className="card-title">Already a member?</h5>
              <p className="card-text flex-grow-1">
                Sign in to see your dashboard and manage your projects.
              </p>
              <Link to="/sign-in" className="btn btn-outline-primary">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Landing;