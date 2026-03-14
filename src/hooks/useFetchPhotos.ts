import { useEffect, useState } from "react";
import type { UseFetchPhotosresult, Photo } from "../types/photoType";

export function useFetchPhoto(): UseFetchPhotosresult {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        async function fetchPhotos() {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch("https://picsum.photos/v2/list?limit=30", {
                    signal: controller.signal,
                });
                if (!response.ok) {
                    throw new Error("failed to fetch photos");
                }
                const data: Photo[] = await response.json();
                setPhotos(data);
            } catch (err) {
                if ((err as Error).name !== "AbortError") {
                    setError("Could not load photos. Please try again.");
                }
            }finally{
                setLoading(false);
            }
        }

        fetchPhotos();
        return ()=> controller.abort();

    },[]);

    return { photos, loading, error };
}
