
import { JobDetail } from "./job";
export interface ContentBase {
  id: string;             
  title: string;
  status: string;
  created_at: string;      
}
export interface ContentDetail extends ContentBase {
  platforms?: string[];    
  content: string;
  ctaLink: string;
  ctaType: string;
  language: string;
  tone?: string | null;
  audience?: string | null;
  keywords?: string[];
  updated_at: string;      
}

export interface ContentDetailResponse {
  content: ContentDetail;
  job?: JobDetail | null;
}
