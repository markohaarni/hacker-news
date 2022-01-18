import React, { useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopStories, fetchTopStoryIds } from './storiesSlice';
import StoriesListItem from './StoriesListItem';

const STORIES_TO_LOAD = 20;

export function StoriesList() {
  const dispatch = useDispatch();

  const storyIds = useSelector(
    (state) => state.stories.storyIds,
    (prev, curr) => isEqual(prev, curr)
  );

  const stories = useSelector(
    (state) => state.stories.stories,
    (prev, curr) => isEqual(prev, curr)
  );

  const storiesStatus = useSelector((state) => state.stories.status);
  const error = useSelector((state) => state.stories.error);

  const [fromIndex, setFromIndex] = useState(stories.length);

  useEffect(() => {
    if (storiesStatus === 'idle') {
      dispatch(fetchTopStoryIds());
    }
  }, [storiesStatus, dispatch]);

  useEffect(() => {
    if (storyIds.length > 0) {
      const storyIdsToFetch = storyIds.slice(
        fromIndex,
        fromIndex + STORIES_TO_LOAD
      );

      dispatch(fetchTopStories(storyIdsToFetch));
    }
  }, [storyIds, fromIndex, dispatch]);

  let content;
  if (storiesStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (storiesStatus === 'failed') {
    content = <p className="text-red-500">{error}</p>;
  } else {
    content = (
      <article>
        {stories.map((story, index) => (
          <StoriesListItem key={story.id} story={story} index={index} />
        ))}
      </article>
    );
  }

  return <div className="max-w-screen-lg m-auto p-4">{content}</div>;
}
