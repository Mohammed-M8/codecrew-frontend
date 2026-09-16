function LoadingSpinner() {
    return (<div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
    >
        <div className="spinner-border spinner-border-lg text-primary" role="status">
        </div>
    </div>)
}
export default LoadingSpinner;