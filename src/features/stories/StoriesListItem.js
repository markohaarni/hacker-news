import React from 'react';
import TimeAgo from './TimeAgo';

export default function StoriesListItem({ story, index }) {
  const { title, by, time } = story;

  return (
    <article className="flex items-start mb-5">
      <div className="md:text-lg font-bold mr-4">{index + 1}.</div>
      <div>
        <p className="md:text-lg font-bold">{title}</p>
        <p className="text-xs text-neutral-500">
          <span>by {by}</span>&nbsp;
          <TimeAgo unixTime={time} />
        </p>
      </div>
    </article>
  );
}
