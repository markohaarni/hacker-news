import { formatDistanceToNowStrict, fromUnixTime } from 'date-fns';
import React from 'react';

export default function TimeAgo({ unixTime }) {
  const timeAgo = formatDistanceToNowStrict(fromUnixTime(unixTime));

  return <span>{timeAgo} ago</span>;
}
