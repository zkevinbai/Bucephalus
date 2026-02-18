/**
 * Utility functions for Chinese Zodiac calculations
 */

// 12 Chinese Zodiac Animals (in order)
export const ANIMALS = [
  'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
  'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
]

// 5 Chinese Zodiac Elements
export const ELEMENTS = ['Wood', 'Fire', 'Earth', 'Metal', 'Water']

// Reference year: 1900 is Year of the Rat
const REFERENCE_YEAR = 1900
const REFERENCE_ANIMAL_INDEX = 0 // Rat

/**
 * Get the Chinese zodiac animal for a given year
 * @param {number} year - The year to look up
 * @returns {string} The animal name
 */
export function getAnimalForYear(year) {
  const animalIndex = (year - REFERENCE_YEAR) % 12
  // Handle negative modulo for years before 1900
  const normalizedIndex = animalIndex < 0 ? animalIndex + 12 : animalIndex
  return ANIMALS[normalizedIndex]
}

/**
 * Get the Chinese zodiac element for a given year
 * @param {number} year - The year to look up
 * @returns {string} The element name
 */
export function getElementForYear(year) {
  const lastDigit = year % 10
  if (lastDigit === 0 || lastDigit === 1) return 'Metal'
  if (lastDigit === 2 || lastDigit === 3) return 'Water'
  if (lastDigit === 4 || lastDigit === 5) return 'Wood'
  if (lastDigit === 6 || lastDigit === 7) return 'Fire'
  if (lastDigit === 8 || lastDigit === 9) return 'Earth'
  return 'Earth' // fallback
}

/**
 * Get both animal and element for a given year
 * @param {number} year - The year to look up
 * @returns {Object} Object with animal and element
 */
export function getZodiacForYear(year) {
  return {
    year,
    animal: getAnimalForYear(year),
    element: getElementForYear(year),
    combination: `${getElementForYear(year)} ${getAnimalForYear(year)}`
  }
}

/**
 * Generate zodiac data for a range of years
 * @param {number} startYear - Start year (inclusive)
 * @param {number} endYear - End year (inclusive)
 * @returns {Array} Array of zodiac objects
 */
export function generateYearRange(startYear, endYear) {
  const years = []
  for (let year = startYear; year <= endYear; year++) {
    years.push(getZodiacForYear(year))
  }
  return years
}

/**
 * Validate if a year is within the supported range
 * @param {number} year - Year to validate
 * @param {number} minYear - Minimum year (default: 1900)
 * @param {number} maxYear - Maximum year (default: 2100)
 * @returns {boolean} True if valid
 */
export function isValidYear(year, minYear = 1900, maxYear = 2100) {
  return Number.isInteger(year) && year >= minYear && year <= maxYear
}
