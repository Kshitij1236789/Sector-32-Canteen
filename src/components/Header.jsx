
function Header({ onAdminClick }) {
  return (
    <header className="relative overflow-hidden rounded-b-[28px] bg-orange-500 px-5 pt-5 pb-6 text-white shadow-sm">

      {/* Top section */}
      <div className="flex items-center justify-between">

        {/* Canteen Branding */}
        <div>
          <p className="text-[11px] font-semibold tracking-widest uppercase text-orange-100">
            Sector 32 Hospital
          </p>

          <h1 className="text-xl font-extrabold tracking-tight">
            Canteen
          </h1>
        </div>

        {/* Admin Dashboard Icon */}
        <button
          type="button"
          onClick={onAdminClick}
          aria-label="Open Admin Dashboard"
          title="Admin Dashboard"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-orange-600 shadow-md transition duration-200 hover:scale-105 hover:bg-orange-50 active:scale-95"
        >
          {/* Dashboard Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
        </button>

      </div>

      {/* Main Heading */}
      <div className="mt-6">

        <h2 className="text-2xl font-extrabold tracking-tight">
          Hungry? Order & Eat.
        </h2>

        <p className="mt-1 text-sm text-orange-50">
          Fresh food from your hospital canteen.
        </p>

      </div>

    </header>
  );
}

export default Header;
