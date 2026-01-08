export interface JobDetail {
  id: string;              
  job_type: string;
  retries: number;
  status: string;
  percentage:number
  error?: string | null;
  created_at: string;
  updated_at: string;
}
export interface JobStatus{
    status:string
    pecentage:number
}