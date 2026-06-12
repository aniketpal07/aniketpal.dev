export interface Apod {
  title: string;
  url: string;
  hdurl?: string;
  explanation: string;
  date: string;
  media_type: 'image' | 'video' | string;
}

/**
 * Fetches NASA's Astronomy Picture of the Day at build time.
 * Returns null on any failure so the COSMOS WATCH widget can
 * degrade gracefully instead of failing the build.
 */
export async function fetchApod(): Promise<Apod | null> {
  const key = import.meta.env.NASA_API_KEY ?? 'DEMO_KEY';
  try {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`);
    if (!res.ok) return null;
    const data = (await res.json()) as Apod;
    if (!data || !data.title) return null;
    return data;
  } catch {
    return null;
  }
}
