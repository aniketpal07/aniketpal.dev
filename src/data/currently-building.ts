export interface CurrentlyBuilding {
  project: string;
  description: string;
  stack: string[];
  startedDate: string;
}

export const currentlyBuilding: CurrentlyBuilding = {
  project: 'DevProxy v2',
  description:
    'Rebuilding the proxy core around io_uring, with TLS termination and per-route circuit breakers.',
  stack: ['C++20', 'io_uring', 'OpenSSL', 'Docker'],
  startedDate: '2026-05-10',
};
