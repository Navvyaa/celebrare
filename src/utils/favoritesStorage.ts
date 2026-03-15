const FAVORITES_KEY = "favourite_photo_ids";

export function loadFavorites(): string[] {
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

export function saveFavorites(favorites: string[]): void {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
