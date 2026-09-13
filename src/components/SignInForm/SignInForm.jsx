// src/components/SignInForm/SignInForm.jsx

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import { signIn } from '../../services/authService';

import { UserContext } from '../../contexts/UserContext';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);

      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(formData.username && formData.password);
  };


  return (
    <main className="container w-100 py-5">
      <div className="row w-100 justify-content-center">
        <div className="col-12 w-100 col-md-6 col-lg-4">
          <div className="card w-90 shadow-sm">
            <div className="card-body p-4">
              <h1 className="h3 text-center mb-4">Sign In</h1>

              {message && (
                <div className="alert alert-danger py-2" role="alert">
                  {message}
                </div>
              )}

              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    autoComplete="off"
                    id="username"
                    className="form-control"
                    value={formData.username}
                    name="username"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    autoComplete="off"
                    id="password"
                    className="form-control"
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-flex gap-2">
                  <button disabled={isFormInvalid()} type="submit" className="btn btn-primary flex-grow-1">Sign In</button>
                  <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/')}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignInForm;