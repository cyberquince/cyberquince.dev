export const useCountry = () => {
  const countryCode = useState('countryCode', () => null);
  const locale = useState('locale', () => null);

  async function loadCountry() {
    if (import.meta.client) {
      const stored = localStorage.getItem('countryCode');
      if (!stored) {
        const { country } = await $fetch('https://api.country.is');
        countryCode.value = country;
        localStorage.setItem('countryCode', country);
      }
      else {
        countryCode.value = stored;
      }
      return stored;
    }
  }

  function loadLocale() {
    if (import.meta.client) {
      const stored = localStorage.getItem('locale');
      if (!stored) {
        locale.value = navigator.language;
        localStorage.setItem('locale', locale.value);
      }
      else {
        locale.value = stored;
      }
      return stored;
    }
  }

  return { countryCode, loadCountry, locale, loadLocale };
};
