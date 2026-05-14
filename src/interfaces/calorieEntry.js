/**
 * @typedef {Object} CalorieEntry
 * @property {string} [id]
 * @property {string} name - Besin adı
 * @property {string} portion - Ölçek (gram, ml, adet)
 * @property {number} protein - Protein miktarı (gr)
 * @property {number} calories - Kalori miktarı (kcal)
 * @property {string} date - Tarih
 */

/**
 * Default shape for a calorie entry.
 * @type {CalorieEntry}
 */
export const defaultCalorieEntry = {
  id: undefined,
  name: '',
  portion: '100 gram',
  protein: 0,
  calories: 0,
  date: new Date().toISOString().slice(0, 10),
};

export const portionOptions = ['100 gram', '100 ml', '1 adet', '150 gram', '200 gram'];
