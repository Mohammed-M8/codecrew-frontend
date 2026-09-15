import { useState } from "react";
import * as joinRequestService from "../../services/joinRequestService";

export default function JoinProjectForm({ project, onClose }) {
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await joinRequestService.createJoinRequest(project._id, { role, message });
      setStatus("Join request sent");
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Join {project.title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">

              <select
                className="form-select mb-3"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select role</option>

                {project.requiredRoles.map((r) => (
                  <option key={r._id} value={r.role}>
                    {r.role}
                  </option>
                ))}
              </select>

              <textarea
                className="form-control"
                placeholder="Message (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              {status && <p className="mt-3 mb-0">{status}</p>}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>

              <button className="btn btn-primary" type="submit">
                Send Request
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}