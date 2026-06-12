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
  repoName: string;
  message: string;
  date: string;
  repoUrl: string;
}

/**
 * Fetches recent public push events for the configured GitHub user.
 * Public events require no authentication. Never throws — returns an
 * empty array on any failure so GITHUB PULSE degrades gracefully.
 */
export async function fetchRecentPushes(limit = 3): Promise<PushItem[]> {
  const username = import.meta.env.GITHUB_USERNAME || 'aniketpal07';
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=10`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'kaalniti-portfolio',
        },
      }
    );
    if (!res.ok) return [];
    const events = (await res.json()) as GithubEvent[];
    if (!Array.isArray(events)) return [];
    return events
      .filter((e) => e.type === 'PushEvent')
      .slice(0, limit)
      .map((e) => ({
        repoName: e.repo.name,
        message: e.payload.commits?.[0]?.message.split('\n')[0] ?? 'Pushed commits',
        date: e.created_at,
        repoUrl: `https://github.com/${e.repo.name}`,
      }));
  } catch {
    return [];
  }
}
