import React from "react";
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
    return (
        <div className="relative overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-300 transition-transform duration-300 ease-out hover:z-10 lg:hover:scale-110 hover:scale-105 hover:shadow-xl">
            <img
                src={photo.download_url}
                alt={photo.author}
                className="h-56 w-full object-cover"
                loading="lazy"
            />

            <div className="flex items-center justify-between p-3">
                <p className="truncate text-sm font-semibold text-slate-700">
                    {photo.author}
                </p>

                <button
                    type="button"
                    onClick={() => onFavouriteClick(photo)}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200"
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