import { useEffect, useState } from "react";
import * as projectService from '../../services/projectsService';
import ProjectsList from "../ProjectsList/ProjectsList";
import Pagination from "../Pagination/Pagination";
import { NavLink } from "react-router";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";


export default function MyProjects() {
    const [projects, setProjects] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function getProjects() {
            const data = await projectService.userProjects(page);
            setProjects(data.projects);
            setTotalPages(data.totalPages);
        }
        getProjects();
    }, [page]);

    return (
        <main className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-3">Your Projects</h1>
                <NavLink to="/projects/new" className="btn btn-success">
                    + Create Project
                </NavLink>
            </div>

            {projects === null ? (
                <LoadingSpinner />
            ) : projects.length ? (
                <>
                    <ProjectsList projects={projects} variant="mine" />
                    <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                </>
            ) : (
                <div className="alert alert-light text-center py-4" role="alert">
                    <h5 className="mb-2">No projects yet</h5>
                </div>
            )}
        </main>
    );
}