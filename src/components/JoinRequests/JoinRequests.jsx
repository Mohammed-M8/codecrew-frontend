import { useEffect, useState } from 'react';
import { getJoinRequests } from '../../services/joinRequestService';

const JoinRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchJoinRequests = async () => {
      const data = await getJoinRequests();
      setRequests(data);
    };

    fetchJoinRequests();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Join Requests</h1>

      {requests.length === 0 ? (
        <p>No join requests.</p>
      ) : (
        requests.map((request) => (
          <div className="card mb-3 shadow-sm" key={request._id}>
            <div className="card-body d-flex justify-content-between align-items-center">

              <div>
                <h5 className="mb-2">
                  {request.project?.title}
                </h5>

                <p className="mb-1">
                  <strong>Requestor:</strong> {request.requestor?.username}
                </p>

                <p className="mb-1">
                  <strong>Role:</strong> {request.role}
                </p>

                {request.message && (
                  <p className="mb-0">
                    <strong>Message:</strong> {request.message}
                  </p>
                )}
              </div>

              <div className="d-flex flex-column gap-2 ms-3">
                <button
                  type="button"
                  className="btn btn-outline-success rounded-circle"
                >
                  <i className="bi bi-check-lg"></i>
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger rounded-circle"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default JoinRequests;