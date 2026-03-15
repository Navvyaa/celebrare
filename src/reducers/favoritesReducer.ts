export type FavoritesAction = { type: "toggle"; payload: string };

export function favoritesReducer(state: string[], action: FavoritesAction): string[] {
    if (action.type === "toggle") {
        return state.includes(action.payload)
            ? state.filter((id) => id !== action.payload)
            : [...state, action.payload];
    }

    return state;
}
