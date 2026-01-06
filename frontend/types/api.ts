export interface GenerateBlogResponse {
  job_id: string
  status: "queued" | "completed" | "failed"
}