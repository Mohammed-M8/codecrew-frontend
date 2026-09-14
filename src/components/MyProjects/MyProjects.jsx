import { useEffect, useState } from "react";
import * as projectService from '../../services/projectsService';
import { Link } from "react-router";
import ProjectsList from "../ProjectsList/ProjectsList";


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
            <h1 className="mb-3">Your Projects</h1>
            <ProjectsList projects={projects} />
        </main>
    );

}