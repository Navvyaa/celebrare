import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { useFetchPhoto } from "../hooks/useFetchPhotos";
import type { Photo } from "../types/photoType";
import { SearchBar } from "./SearchBar";
import heart from "../assets/heart.svg"
import heartFill from "../assets/heart-fill.svg"
type FavoritesAction =
    | { type: "toggle"; payload: string };

const FAVORITES_KEY = "favourite_photo_ids";

function favoritesReducer(state: string[], action: FavoritesAction): string[] {
    if (action.type === "toggle") {
        return state.includes(action.payload)
            ? state.filter((id) => id !== action.payload)
            : [...state, action.payload];
    }
    return state;
}

function loadFavorites(): string[] {
    try {
        const raw = localStorage.getItem(FAVORITES_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw) as unknown;
        if (!Array.isArray(parsed)) return [];
        return parsed.filter((id): id is string => typeof id === "string");
    } catch {
        return [];
    }
}

export function Gallery() {
    const { photos, loading, error } = useFetchPhoto();
    const [search, setSearch] = useState("");

    const [favorites, dispatch] = useReducer(favoritesReducer, [], loadFavorites);

    useEffect(() => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

    const onSearchChange = useCallback((value: string) => {
        setSearch(value);
    }, []);

    const filteredPhotos = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return photos;
        return photos.filter((photo: Photo) => photo.author.toLowerCase().includes(term));
    }, [photos, search]);

    return (
        <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8">
            <div className="flex items-center justify-between mb-5">
                <h1 className="mb-6 text-3xl font-bold tracking-tight">Picsum Gallery</h1>
                <SearchBar value={search} onChange={onSearchChange} />
            </div>


            {loading && (
                <div className="flex items-center justify-center gap-3 py-16">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-700" />
                    <p className="text-slate-600">Loading photos...</p>
                </div>
            )}

            {error && (
                <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <>
                    {filteredPhotos.length === 0 ? (
                        <p className="py-10 text-center text-slate-500">No authors matched your search.</p>
                    ) : (
                        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {filteredPhotos.map((photo) => {
                                const isFavorite = favoriteSet.has(photo.id);

                                return (
                                    <div
                                        key={photo.id}
                                        className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-300 hover:shadow-xl"
                                    >
                                        <img
                                            src={photo.download_url}
                                            alt={photo.author}
                                            className="h-56 w-full object-cover"
                                            loading="lazy"
                                        />
                                        <div className="flex items-center justify-between p-3">
                                            <p className="truncate text-sm font-semibold text-slate-700">{photo.author}</p>
                                            <button
                                                type="button"
                                                onClick={() => dispatch({ type: "toggle", payload: photo.id })}
                                                className={`rounded-full p-2 transition ${isFavorite
                                                    ? "bg-rose-100 text-rose-600"
                                                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                                    }`}
                                                aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
                                            >
                                                <img src={isFavorite? heartFill:heart} alt="" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </section>
                    )}
                </>
            )}
        </main>
    );
}