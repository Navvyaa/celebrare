import React, { useEffect, useState } from "react";
import type { Photo } from "../types/photoType";
import heart from "../assets/heart.svg";
import heartFill from "../assets/heart-fill.svg";

type PhotoCardProps = {
    photo: Photo;
    isFavorite: boolean;
    onFavouriteClick: (photo: Photo) => void;
};

export const PhotoCard = React.memo(function PhotoCard({
    photo,
    isFavorite,
    onFavouriteClick,
}: PhotoCardProps) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        setIsImageLoaded(false);
    }, [photo.download_url]);

    return (
        <div className="relative overflow-hidden rounded-lg bg-slate-50 shadow-sm ring-1 ring-slate-300 transition-transform duration-300 ease-out hover:z-10 lg:hover:scale-110 hover:scale-105 hover:shadow-xl">
            {!isImageLoaded && (
                <div
                    className="h-56 w-full animate-pulse bg-slate-200"
                    aria-hidden="true"
                />
            )}

            <img
                src={photo.download_url}
                alt={photo.author}
                className={`h-56 w-full object-cover transition-opacity duration-300 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
                loading="lazy"
                onLoad={() => setIsImageLoaded(true)}
                onError={() => setIsImageLoaded(true)}
            />

            <div className="flex items-center justify-between p-3">
                <p className="truncate text-sm font-semibold text-slate-700">
                    {photo.author}
                </p>

                <button
                    type="button"
                    onClick={() => onFavouriteClick(photo)}
                    className="flex items-center justify-center w-9 h-9 rounded-full  hover:bg-slate-100"
                >
                    <div className="relative w-6 h-6">
                        <img
                            src={isFavorite ? heartFill : heart}
                            alt=""
                            className="w-6 h-6"
                        />
                    </div>
                </button>
            </div>
        </div>
    );
});