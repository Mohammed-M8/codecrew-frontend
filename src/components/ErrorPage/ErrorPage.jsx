import { Link } from "react-router";

export default function ErrorPage() {


    return (
        <main className="container py-5">
            <h1 className="mb-3">Content Not Found</h1>
            <Link to="/">Return to Home?</Link>
        </main>
    )
}