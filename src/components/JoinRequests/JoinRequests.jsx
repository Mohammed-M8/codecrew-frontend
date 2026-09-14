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
    <div>
      <h1>Join Requests</h1>

      {requests.length === 0 ? (
        <p>No join requests.</p>
      ) : (
        requests.map((request) => (
          <div key={request._id}>
            <p>
              <strong>Project:</strong> {request.project?.title}
            </p>

            <p>
              <strong>Requestor:</strong> {request.requestor?.username}
            </p>

            <p>
              <strong>Role:</strong> {request.role}
            </p>

            {request.message && (
              <p>
                <strong>Message:</strong> {request.message}
              </p>
            )}

            <button>Accept</button>
            <button>Reject</button>
          </div>
        ))
      )}
    </div>
  );
};

export default JoinRequests;