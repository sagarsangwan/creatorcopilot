import { JobStatus } from "@/types/job";
export default async function fetchJobStatus ({jobId,accessToken}:{jobId:string, accessToken:string})
:Promise<JobStatus> {
const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${jobId}/?job_type=GENERATE_SOCIAL_POSTS`,
        {
            cache: "no-store",
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        }
        );
        if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody?.detail || "Failed to load details");
        }

        return res.json()
    
}
    
    
    
    
    
    
    
    
    
//     if (!session?.access_token) {
//       setLoading(false);
//       return;
//     }
//     try {
//       setLoading(true);

      
//       setProgress(json.progress);
//       setJobStatus(json.status);
//       setError(null);
//     } catch (e) {
//       const msg = e instanceof Error ? e.message : "Network Error";
//       setError(msg);
//       toast.error(msg);
//     } finally {
//       setLoading(false);
//     }
//   };