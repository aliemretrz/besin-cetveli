function CalorieList({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 py-12 text-center">
        <p className="text-sm text-slate-500">Henüz besin kaydı yok. Yukarıdan bir besin ekleyin.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article key={item.id} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-4 shadow-sm transition hover:shadow-md">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                <p className="text-sm text-slate-500 mt-1">
                  <span className="inline-block bg-slate-200 px-2 py-1 rounded">{item.portion}</span>
                  <span className="ml-2 text-slate-600">📅 {item.date}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 py-2 border-t border-slate-200">
              <div className="rounded-lg bg-white p-3">
                <p className="text-xs font-medium text-slate-600 uppercase">Protein</p>
                <p className="mt-2 text-xl font-bold text-purple-600">{item.protein.toFixed(1)} gr</p>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="text-xs font-medium text-slate-600 uppercase">Kalori</p>
                <p className="mt-2 text-xl font-bold text-orange-600">{item.calories.toFixed(0)} kcal</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                ✏️ Düzenle
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Bu besin kaydını silmek istediğinize emin misiniz?')) {
                    onDelete(item.id);
                  }
                }}
                className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
              >
                🗑️ Sil
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default CalorieList;
