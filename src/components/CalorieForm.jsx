import { useEffect, useState } from 'react';
import { defaultCalorieEntry, portionOptions } from '../interfaces/calorieEntry.js';

function CalorieForm({ entry, onSave, onCancel }) {
  const [formState, setFormState] = useState(defaultCalorieEntry);

  useEffect(() => {
    if (entry) {
      setFormState(entry);
    } else {
      setFormState(defaultCalorieEntry);
    }
  }, [entry]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === 'protein' || name === 'calories' ? Number(value) : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formState.name.trim()) {
      alert('Lütfen besin adı giriniz');
      return;
    }
    if (formState.calories < 0 || formState.protein < 0) {
      alert('Kalori ve protein negatif olamaz');
      return;
    }
    onSave({ 
      ...formState, 
      calories: Number(formState.calories),
      protein: Number(formState.protein)
    });
  };

  const handleReset = () => {
    setFormState(defaultCalorieEntry);
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Besin Adı *</label>
        <input
          name="name"
          value={formState.name}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          placeholder="Örn: Tavuk göğsü, Yumurta"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Ölçek *</label>
        <select
          name="portion"
          value={formState.portion}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        >
          {portionOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Protein (gr) *</label>
          <input
            type="number"
            name="protein"
            value={formState.protein}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            min="0"
            step="0.1"
            placeholder="0"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Kalori (kcal) *</label>
          <input
            type="number"
            name="calories"
            value={formState.calories}
            onChange={handleChange}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            min="0"
            step="0.1"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Tarih</label>
        <input
          type="date"
          name="date"
          value={formState.date}
          onChange={handleChange}
          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          {entry ? 'Güncelle' : 'Kaydet'}
        </button>
        {entry && (
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            İptal
          </button>
        )}
      </div>
    </form>
  );
}

export default CalorieForm;
