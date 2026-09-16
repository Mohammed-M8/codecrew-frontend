export default function Pagination({ page, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    return (
        <nav aria-label="Pagination" className="mt-4">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                </li>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <li key={num} className={`page-item ${page === num ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(num)}>
                            {num}
                        </button>
                    </li>
                ))}

                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}