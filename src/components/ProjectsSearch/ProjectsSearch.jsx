import { useEffect, useState } from "react";
import * as projectService from '../../services/projectsService';
import ProjectsList from "../ProjectsList/ProjectsList";

export default function ProjectsSearch() {
    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState('')

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            const data = await projectService.index(search);
            setProjects(data);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search]);

    const handleChange = (evt) => {
        setSearch(evt.target.value)
    };


    return (
        <main className="container py-5">
            <h1 className="mb-3">Search Projects</h1>
            <div className="input-group mb-3">
                <span className="input-group-text bg-white">
                    <i className="bi bi-search"></i>
                </span>
                <input
                    value={search}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                />
            </div>
            {projects.length ? <ProjectsList projects={projects} variant="search" /> : <div className="alert alert-light text-center py-4" role="alert">
                <h5 className="mb-2">No projects found</h5>
            </div>}
        </main>
    );
}