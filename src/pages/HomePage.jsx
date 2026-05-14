import { useEffect, useState } from 'react';
import CalorieForm from '../components/CalorieForm.jsx';
import CalorieList from '../components/CalorieList.jsx';
import { sampleEntries } from '../data/sampleData.js';

const STORAGE_KEY = 'kalorihesaplama_entries';

function HomePage() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : sampleEntries;
  });
  const [editingEntry, setEditingEntry] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  // localStorage'a kaydet her değişimde
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const upsertEntry = (entry) => {
    if (entry.id) {
      setEntries((prev) => prev.map((item) => (item.id === entry.id ? entry : item)));
    } else {
      const nextEntry = { ...entry, id: crypto.randomUUID() };
      setEntries((prev) => [nextEntry, ...prev]);
    }
    setEditingEntry(null);
  };

  const deleteEntry = (id) => {
    setEntries((prev) => prev.filter((item) => item.id !== id));
  };

  const editEntry = (entry) => {
    setEditingEntry(entry);
  };

  // Seçili güne ait toplam protein ve kalori hesapla
  const dailyEntries = entries.filter((item) => item.date === selectedDate);
  const totalProtein = dailyEntries.reduce((sum, item) => sum + (item.protein || 0), 0);
  const totalCalories = dailyEntries.reduce((sum, item) => sum + (item.calories || 0), 0);

  // Tarih formatı (Türkçe gün adı)
  const dateObj = new Date(selectedDate);
  const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const dayName = dayNames[dateObj.getDay()];
  const formattedDate = `${dayName}, ${dateObj.toLocaleDateString('tr-TR')}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-10 rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-500 p-8 text-white shadow-lg shadow-cyan-200/40">
        <h1 className="text-4xl font-semibold">Besin Cetveli</h1>
        <p className="mt-3 max-w-2xl text-slate-100/90">
          Günlük beslenmenizi takip edin. Verileriniz otomatik olarak kaydedilir.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <section className="space-y-6 rounded-3xl bg-white p-6 shadow-md shadow-slate-200">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Besin Kaydı</h2>
          </div>
          
          <CalorieForm entry={editingEntry} onSave={upsertEntry} onCancel={() => setEditingEntry(null)} />
        </section>

        <section className="space-y-6 rounded-3xl bg-white p-6 shadow-md shadow-slate-200">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Günlük Özet</h2>
          </div>
          
          <div className="space-y-4">
            <div className="rounded-2xl bg-gradient-to-r from-blue-100 to-blue-50 p-4 border border-blue-200">
              <p className="text-sm font-medium text-blue-700">Seçili Gün</p>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-2 w-full rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm text-blue-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <p className="mt-2 text-sm text-blue-600">📅 {formattedDate}</p>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-orange-100 to-orange-50 p-4 border border-orange-200">
              <p className="text-sm font-medium text-orange-700">Toplam Kalori</p>
              <p className="mt-2 text-4xl font-bold text-orange-600">{totalCalories.toFixed(0)} kcal</p>
            </div>
            
            <div className="rounded-2xl bg-gradient-to-r from-purple-100 to-purple-50 p-4 border border-purple-200">
              <p className="text-sm font-medium text-purple-700">Toplam Protein</p>
              <p className="mt-2 text-4xl font-bold text-purple-600">{totalProtein.toFixed(1)} gr</p>
            </div>

            <div className="text-sm text-slate-500 pt-2 border-t">
              <p>Bu güne ait giriş: <strong>{dailyEntries.length}</strong></p>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-md shadow-slate-200">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Tüm Kaydedilen Besinler</h2>
        <CalorieList items={entries} onEdit={editEntry} onDelete={deleteEntry} />
      </section>
    </div>
  );
}

export default HomePage;
