import { useEffect, useState } from "react"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import { useNavigate, useParams } from "react-router"

import * as userService from '../../services/userService'

export default function UserProfile() {
    const userId = useParams().userId
    const [user, setUser] = useState(null)
    const [stats, setStats] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const data = await userService.getUserById(userId)
                setUser(data.user)
                setStats(data.stats)
            } catch (error) {
                if (error.status === 404) {
                    navigate('/', { replace: true })
                } else {
                    console.log(error)
                }
            }
        }

        getUser()
    }, [userId, navigate])

    if (!user) return <LoadingSpinner />

    return (
        <main className="container py-5">
            <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <h1 className="mb-1">{user.username}</h1>
                    <p className="text-muted mb-0">{user.email}</p>
                </div>
                {user.githubUsername && (

                    <a href={`https://github.com/${user.githubUsername}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-dark"
                    >
                        <i className="bi bi-github me-1"></i> {user.githubUsername}
                    </a>
                )}
            </div>

            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h5 className="card-title mb-3">Skills</h5>
                    {user.skills?.length > 0 ? (
                        <div className="d-flex flex-wrap gap-2">
                            {user.skills.map((skill) => (
                                <span key={skill} className="badge text-bg-light border">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted mb-0">No skills listed.</p>
                    )}
                </div>
            </div>

            {stats && (
                <div className="row g-3">
                    <div className="col-md-6">
                        <div className="card shadow-sm text-center">
                            <div className="card-body">
                                <h2 className="mb-0">{stats.ownedProjects}</h2>
                                <p className="text-muted mb-0">Owned Projects</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow-sm text-center">
                            <div className="card-body">
                                <h2 className="mb-0">{stats.memberProjects}</h2>
                                <p className="text-muted mb-0">Member Of</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}