export interface ContentBase {
  id: string;              // UUID
  title: string;
  status: string;
  created_at: string;      // ISO datetime
}
export interface ContentDetail extends ContentBase {
  platforms?: string[];    // Optional[List[str]]
  content: string;
  ctaLink: string;
  ctaType: string;
  language: string;
  tone?: string | null;
  audience?: string | null;
  keywords?: string[];
  updated_at: string;      // ISO datetime
}
export interface JobDetail {
  id: string;              // UUID
  job_type: string;
  retries: number;
  status: string;
  error?: string | null;
  created_at: string;
  updated_at: string;
}
export interface ContentDetailResponse {
  content: ContentDetail;
  job?: JobDetail | null;
}
