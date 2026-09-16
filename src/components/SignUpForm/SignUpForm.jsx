import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';

import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

const SignUpForm = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
    email: '',
    skills: [],
    githubUsername: ''
  });

  const { username, password, passwordConf, email, skills, githubUsername } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setFormData({ ...formData, skills: [...skills, trimmed] });
    }
    setSkillInput('');
  };

  const handleSkillKeyDown = (evt) => {
    if (evt.key === 'Enter' || evt.key === ',') {
      evt.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({ ...formData, skills: skills.filter(s => s !== skillToRemove) });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate('/');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf && email && skills.length > 0 && githubUsername);
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-1 mb-4">
      <div className="w-100" style={{
        maxWidth: '500px'
        , maxWidth: '500px',
        marginTop: '30px'
      }}>
        <div className="card w-90 shadow-sm">
          <div className="card-body p-4">
            <h1 className="h3 text-center mb-4">Sign Up</h1>

            {message && (
              <div className="alert alert-danger py-2" role="alert">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  name="username"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="skills" className="form-label">Skills                  </label>

                <input
                  type="text"
                  id="skills"
                  className="form-control mb-2"
                  value={skillInput}
                  onChange={(evt) => setSkillInput(evt.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="Type a Skill and press Enter"
                />
                <button onClick={addSkill} className='btn btn-success'>Add Skill</button>
                {skills.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {skills.map((skill) => (
                      <span key={skill} className="badge text-bg-secondary d-flex align-items-center gap-1">
                        {skill}
                        <button
                          type="button"
                          className="btn-close btn-close-white"
                          style={{ fontSize: '0.6rem' }}
                          aria-label={`Remove ${skill}`}
                          onClick={() => removeSkill(skill)}
                        ></button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="githubUsername" className="form-label">Github Username</label>
                <input
                  type="text"
                  id="githubUsername"
                  className="form-control"
                  value={githubUsername}
                  name="githubUsername"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="confirm" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  id="confirm"
                  className="form-control"
                  value={passwordConf}
                  name="passwordConf"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="d-flex gap-2">
                <button
                  type="submit"
                  disabled={isFormInvalid()}
                  className="btn btn-primary flex-grow-1"
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;