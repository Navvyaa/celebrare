import searchGlass from "../assets/magnifying-glass.svg"


type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="relative mb-6 w-full max-w-md rounded-2xl border border-slate-400 px-4">
            <span className="pointer-events-none absolute rounded-xl inset-y-0 left-4 flex items-center">
                <img src={searchGlass} alt="" />
            </span>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search by author..."
                className="w-full py-3 pl-10 pr-4 outline-none ring-0  rounded-full"
                aria-label="Search photos by author"
            />
        </div>
    );
}


