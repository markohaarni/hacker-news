import React, { useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTopStories, fetchTopStoryIds } from './storiesSlice';
import StoriesListItem from './StoriesListItem';
import InfiniteScroll from '../../components/InfiniteScroll';

const STORIES_TO_LOAD = 20;

export default function StoriesList() {
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

  function loadNextStories() {
    setFromIndex((prevIndex) => prevIndex + STORIES_TO_LOAD);
  }

  const loadingElement = <p>Loading...</p>;

  let content;
  if (storiesStatus === 'loading' && stories.length === 0) {
    content = loadingElement;
  } else if (storiesStatus === 'failed' && stories.length === 0) {
    content = <p className="text-red-500">{error}</p>;
  } else {
    content = (
      <InfiniteScroll
        dataLength={stories.length}
        onNext={loadNextStories}
        hasMore={stories.length !== storyIds.length}
        loadingElem={loadingElement}
        error={error && 'Error loading next stories'}
      >
        {stories.map((story, index) => (
          <Link key={story.id} to={`/${story.id}`}>
            <StoriesListItem story={story} index={index} />
          </Link>
        ))}
      </InfiniteScroll>
    );
  }

  return <div className="max-w-screen-lg m-auto p-4">{content}</div>;
}
