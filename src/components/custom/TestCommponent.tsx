export const TestCommponent = () => {
  return (
    <div className="p-6">
      <div className="p-4 border border-border bg-background text-foreground">
        <h1 className="text-3xl font-cinzel text-primary">Test Colors</h1>
        <p className="text-secondary-foreground">Secondary text</p>
        <div className="mt-4 p-3 bg-accent text-accent-foreground">
          Accent box
        </div>
        <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded">
          Primary Button
        </button>
      </div>

      {/* Disney colors test */}
      <div className="mt-6 p-4 bg-disney-blue text-white">
        Disney Blue Background
      </div>
      <div className="mt-2 p-4 bg-disney-gold text-black">
        Disney Gold Background
      </div>
      <div className="h-40 w-96 p-2 bg-gray-200 flex flex-wrap content-center">
        <div className="px-10 py-2 bg-teal-400 rounded">1</div>
        <div className="px-10 py-2 bg-purple-400 rounded">2</div>
        <div className="px-10 py-2 bg-indigo-400 rounded">3</div>
        <div className="px-10 py-2 bg-teal-400 rounded">4</div>
        <div className="px-10 py-2 bg-purple-400 rounded">5</div>
        <div className="px-10 py-2 bg-indigo-400 rounded">6</div>
      </div>
    </div>
  );
};
