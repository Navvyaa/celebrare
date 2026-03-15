import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { useFetchPhoto } from "../hooks/useFetchPhotos";
import type { Photo } from "../types/photoType";
import { favoritesReducer } from "../reducers/favoritesReducer";
import { loadFavorites, saveFavorites } from "../utils/favoritesStorage";
import { SearchBar } from "./SearchBar";
import { PhotoCard } from "./PhotoCard";
import heart from "../assets/heart.svg";
import heartFill from "../assets/heart-fill.svg";
import gicon from "../assets/gallery1.png"

export function Gallery() {
    const { photos, loading, error } = useFetchPhoto();
    const [search, setSearch] = useState("");
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [favorites, dispatch] = useReducer(favoritesReducer, [], loadFavorites);

    useEffect(() => {
        saveFavorites(favorites);
    }, [favorites]);

    const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

    const onSearchChange = useCallback((value: string) => {
        setSearch(value);
    }, []);

    const filteredPhotos = useMemo(() => {
        const term = search.trim().toLowerCase();
        const visiblePhotos = showFavoritesOnly
            ? photos.filter((photo: Photo) => favoriteSet.has(photo.id))
            : photos;

        if (!term) return visiblePhotos;

        return visiblePhotos.filter((photo: Photo) =>
            photo.author.toLowerCase().startsWith(term)
        );
    }, [favoriteSet, photos, search, showFavoritesOnly]);

    const onFavouriteClick = (photo: Photo) => {
        dispatch({ type: "toggle", payload: photo.id });
    };

    return (
        <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-5">
                <div className="flex items-center gap-4 mb-6 ">
                    <img src={gicon} alt="" className="w-8 h-8 " />
                    <h1 className="text-3xl font-bold tracking-tight">
                        Picsum Gallery
                    </h1>
                </div>

                <div className="flex w-full max-w-xl items-start gap-3 md:w-auto">
                    <SearchBar value={search} onChange={onSearchChange} />
                    <button
                        type="button"
                        onClick={() => setShowFavoritesOnly((current) => !current)}
                        className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border transition ${showFavoritesOnly
                            ? "border-rose-300 bg-rose-50"
                            : "border-slate-300 bg-slate-100 hover:bg-slate-50"
                            }`}
                        aria-label={showFavoritesOnly ? "Show all pictures" : "Show favourite pictures"}
                        aria-pressed={showFavoritesOnly}
                    >
                        <img
                            src={showFavoritesOnly ? heartFill : heart}
                            alt=""
                            className="h-6 w-6"
                        />
                    </button>
                </div>
            </div>

            {loading && (
                <div className="flex items-center justify-center gap-3 py-16">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-700" />
                    <p className="text-slate-600">Loading photos...</p>
                </div>
            )}

            {!loading && error && (
                <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <>
                    {filteredPhotos.length === 0 ? (
                        <p className="py-10 text-center text-slate-500">
                            {showFavoritesOnly
                                ? "No favourite pictures matched your search."
                                : "No authors matched your search."}
                        </p>
                    ) : (
                        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {filteredPhotos.map((photo) => {
                                const isFavorite = favoriteSet.has(photo.id);

                                return (
                                    <PhotoCard
                                        key={photo.id}
                                        photo={photo}
                                        isFavorite={isFavorite}
                                        onFavouriteClick={onFavouriteClick}
                                    />
                                );
                            })}
                        </section>
                    )}
                </>
            )}
        </main>
    );
}