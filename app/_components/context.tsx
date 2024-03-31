const Context = () => {
    return (
      <div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="animate-pulse flex space-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-slate-700 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded "></div>
              </div>
            </div>
          </div>
        ))}
    </div>
    );
}

export default Context;