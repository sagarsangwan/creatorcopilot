import { ContentDetailResponse } from "@/types/content";


export default async function fetchContentPosts({contentId,accessToken}:{contentId:string, accessToken:string}):Promise<ContentDetailResponse> {

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${contentId}/?job_type=GENERATE_SOCIAL_POSTS`,
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