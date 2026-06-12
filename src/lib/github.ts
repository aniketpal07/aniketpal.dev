interface GithubCommit {
  message: string;
}

interface GithubEvent {
  type: string;
  created_at: string;
  repo: { name: string };
  payload: { commits?: GithubCommit[] };
}

export interface PushItem {
  repo: string;
  message: string;
  date: string;
  url: string;
}

/**
 * Fetches recent public push events for the configured GitHub user.
 * Public events require no authentication. Returns an empty array on
 * any failure so the GITHUB PULSE widget can degrade gracefully.
 */
export async function fetchRecentPushes(limit = 3): Promise<PushItem[]> {
  const user = import.meta.env.GITHUB_USERNAME ?? 'aniketpal';
  try {
    const res = await fetch(`https://api.github.com/users/${user}/events/public`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'kaalniti-portfolio',
      },
    });
    if (!res.ok) return [];
    const events = (await res.json()) as GithubEvent[];
    if (!Array.isArray(events)) return [];
    return events
      .filter((e) => e.type === 'PushEvent' && (e.payload.commits?.length ?? 0) > 0)
      .slice(0, limit)
      .map((e) => {
        const commits = e.payload.commits as GithubCommit[];
        return {
          repo: e.repo.name,
          message: commits[commits.length - 1].message.split('\n')[0],
          date: e.created_at,
          url: `https://github.com/${e.repo.name}`,
        };
      });
  } catch {
    return [];
  }
}
