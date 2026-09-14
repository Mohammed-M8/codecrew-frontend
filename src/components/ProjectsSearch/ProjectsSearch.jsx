import { useEffect, useState } from "react";
import * as projectService from '../../services/projectsService';
import ProjectsList from "../ProjectsList/ProjectsList";

export default function ProjectsSearch() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function getProjects() {
            const data = await projectService.index();
            setProjects(data);
        }
        getProjects();
    }, []);



    return (
        <main className="container py-5">
            <h1 className="mb-3">Search Projects</h1>
            <ProjectsList projects={projects} variant="search" />
        </main>
    );
}