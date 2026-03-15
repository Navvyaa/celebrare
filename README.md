# Picsum Gallery

A responsive photo gallery built with React, TypeScript, Vite, and Tailwind CSS.

The app fetches photos from Picsum, supports author search, allows users to mark favourites, and persists favourites in localStorage.

## Features

- Fetches photos from the Picsum API
- Search photos by author name
- Add or remove favourites from each photo card
- Toggle between all photos and favourites only
- Persists favourites in localStorage
- Image skeleton placeholders while each image loads
- Loading and error states for API requests
- Responsive grid layout with hover card scale effect

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- ESLint

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Project Structure

```text
src/
	assets/                    Static icons and images
	components/
		Gallery.tsx              Main gallery container and UI controls
		PhotoCard.tsx            Individual photo card with skeleton loading
		SearchBar.tsx            Search input component
	hooks/
		useFetchPhotos.ts        Data fetching hook for Picsum photos
	reducers/
		favoritesReducer.ts      Reducer for favourite toggle state updates
	utils/
		favoritesStorage.ts      localStorage load/save helpers
	types/
		photoType.ts             Shared photo and hook result types
```

## Application Flow

1. `useFetchPhoto` fetches photos from `https://picsum.photos/v2/list?limit=30`.
2. `Gallery` manages search text, favourites filter mode, and favourites state.
3. Favourites state is handled with `favoritesReducer`.
4. Favourites are loaded from and saved to localStorage through `favoritesStorage`.
5. `PhotoCard` renders each image, heart button, and per-image skeleton while loading.

## Favourites Persistence

- localStorage key: `favourite_photo_ids`
- Value format: JSON array of photo ID strings

## Notes

- Search currently uses prefix matching (`startsWith`) on author names.
- Favourites are browser-local and not synced to any backend.

## Future Improvements

- Add pagination or infinite scroll
- Add image detail modal
- Add unit tests for reducer and storage helpers
- Add component tests for search and favourites filter flow
