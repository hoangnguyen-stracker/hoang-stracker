import { getLocale, m, overwriteSetLocale, setLocale } from './index';

describe('translation package', () => {
  it('resolves the base locale (en) by default', () => {
    expect(getLocale()).toBe('en');
    expect(m.example_greeting({ name: 'Stracker' })).toBe('Hello, Stracker!');
  });

  it('resolves fr after setLocale', async () => {
    await setLocale('fr');

    expect(getLocale()).toBe('fr');
    expect(m.example_greeting({ name: 'Stracker' })).toBe(
      'Bonjour, Stracker !'
    );

    await setLocale('en');
  });

  it('lets overwriteSetLocale wrap the real implementation (used by consumers to notify subscribers on a switch)', async () => {
    const original = setLocale;
    const calls: string[] = [];

    overwriteSetLocale(async (locale, options) => {
      calls.push(locale);
      return original(locale, options);
    });

    try {
      await setLocale('fr');
      expect(calls).toEqual(['fr']);
      expect(getLocale()).toBe('fr');
    } finally {
      overwriteSetLocale(original);
      await setLocale('en');
    }
  });

  it('picks the exact-zero branch of a plural message ahead of the plural category', () => {
    // regression guard: this message's `match` key order (zero-case first) is what makes
    // the compiled if/else chain check it before falling through to the "other" category
    expect(m.table_results_count({ count: 0 })).toBe('No result found');
    expect(m.table_results_count({ count: 1 })).toBe('1 result found');
    expect(m.table_results_count({ count: 7 })).toBe('7 results found');
  });

  it('exposes markup parts for messages with embedded rich text', () => {
    expect(m.sign_up_form_tou_label.parts({})).toEqual([
      { type: 'text', value: 'I accept the ' },
      { attributes: {}, name: 'link', options: {}, type: 'markup-start' },
      { type: 'text', value: 'terms and conditions of use' },
      { attributes: {}, name: 'link', options: {}, type: 'markup-end' }
    ]);
  });
});
