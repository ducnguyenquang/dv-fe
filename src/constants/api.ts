export const DATA_STATUS = {
  IDDLE: 'IDDLE',
  PENDING: 'PENDING',
  RESOLVED: 'RESOLVED',
  REJECTED: 'REJECTED',
} as const;

export const MIN_REFRESH_TIME_BEFORE_EXPIRE = 30; // in sec
