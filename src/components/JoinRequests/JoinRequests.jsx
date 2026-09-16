import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {getJoinRequests, getMyJoinRequests,getProjectJoinRequests, updateJoinRequest, cancelJoinRequest} from '../../services/joinRequestService';
import '../TaskCard/TaskCard.css';
import getRandomColor from '../TaskCard/taskColor';

const JoinRequests = () => {
  const [requests, setRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('received');
  const { projectId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchJoinRequests = async () => {
    setLoading(true);

    if (projectId) {
      const projectRequests = await getProjectJoinRequests(projectId);
      setRequests(projectRequests);
    } else {
      const ownerRequests = await getJoinRequests();
      const userRequests = await getMyJoinRequests();

      setRequests(ownerRequests);
      setMyRequests(userRequests);
    }

    setLoading(false);
  };

  fetchJoinRequests();
}, [projectId]);

  const handleUpdate = async (request, action) => {
    await updateJoinRequest(projectId || request.project?._id, request._id, action);

    setRequests(
      requests.filter((item) => item._id !== request._id)
    );
  };

  const handleCancel = async (request) => {
    await cancelJoinRequest(request.project._id, request._id);

    setMyRequests(
      myRequests.filter((item) => item._id !== request._id)
    );
  };

    if (loading) {
    return (
        <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
        >
        <div className="spinner-border spinner-border-lg text-primary" role="status">
        </div>
        </div>
    );
    }


  return (
    <div className="container py-4">

      {!projectId && <h1 className="mb-4">Requests</h1>}

      {!projectId && (
        <div className="d-flex gap-3 mb-4">
          <button
            type="button"
            className={`btn ${
              activeTab === 'sent'
                ? 'btn-primary'
                : 'btn-outline-secondary'
            }`}
            onClick={() => setActiveTab('sent')}
          >
            Requests I Sent
          </button>

          <button
            type="button"
            className={`btn ${
              activeTab === 'received'
                ? 'btn-primary'
                : 'btn-outline-secondary'
            }`}
            onClick={() => setActiveTab('received')}
          >
            Join Requests for My Project
          </button>
        </div>
      )}

      {activeTab === 'received' && (
        <>
          {!projectId && <h2 className="mb-3">Join Requests</h2>}

          {requests.length === 0 ? (
            <p>No join requests.</p>
          ) : (
            requests.map((request) => (
              <div
                className="card task-card mb-3 shadow-sm"
                key={request._id}
                style={{ borderLeft: `9px solid ${getRandomColor()}` }}
              >
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
                      onClick={() => handleUpdate(request, 'accept')}
                    >
                      <i className="bi bi-check-lg"></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger rounded-circle"
                      onClick={() => handleUpdate(request, 'reject')}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>

                </div>
              </div>
            ))
          )}
        </>
      )}

      {!projectId && activeTab === 'sent' && (
        <>
          <h2 className="mt-5 mb-3">My Join Requests</h2>

          {myRequests.length === 0 ? (
            <p>No join requests sent.</p>
          ) : (
            myRequests.map((request) => (
              <div
                key={request._id}
                className="card task-card mb-3 shadow-sm"
                style={{ borderLeft: `9px solid ${getRandomColor()}` }}
              >
                <div className="card-body">

                  <h5 className="mb-2">
                    {request.project?.title || "Project no longer available"}
                  </h5>

                  <p className="mb-1">
                    <strong>Role:</strong> {request.role}
                  </p>

                  {request.message && (
                    <p className="mb-0">
                      <strong>Message:</strong> {request.message}
                    </p>
                  )}

                  {request.project && (
                    <button
                      type="button"
                      className="btn btn-outline-danger mt-3"
                      onClick={() => handleCancel(request)}
                    >
                      Cancel Request
                    </button>
                  )}

                </div>
              </div>
            ))
          )}
        </>
      )}

    </div>
  );
};

export default JoinRequests;