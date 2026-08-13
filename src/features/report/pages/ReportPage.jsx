import { useParams } from "react-router-dom";

export default function ReportPage() {
    const { jobId } = useParams();
    
    return (
        <main>
            <h1>ReportPage</h1>
            <p>jobId: {jobId}</p>
        </main>
    );
}