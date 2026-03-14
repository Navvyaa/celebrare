export type Photo = {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string ;
    download_url: string ;
}

export type UseFetchPhotosresult={
    photos:Photo[];
    loading:boolean;
    error: string | null;

}