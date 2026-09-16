import { useEffect, useState } from "react";
import * as projectService from '../../services/projectsService';
import ProjectsList from "../ProjectsList/ProjectsList";
import { NavLink } from "react-router";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";


export default function MyProjects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function getProjects() {
            const data = await projectService.userProjects();
            setProjects(data);
        }
        getProjects();
    }, []);



    return (
        <main className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-3">Your Projects</h1>
                <NavLink to="/projects/new" className="btn btn-success">
                    + Create Project
                </NavLink></div>
            {projects.length ? <ProjectsList projects={projects} variant="mine" /> : <LoadingSpinner />}
        </main>
    );

}