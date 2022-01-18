import React, { useEffect } from 'react';
import { format, fromUnixTime } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchComments, selectStoryByID } from './storiesSlice';

export default function SingleStoryPage() {
  const dispatch = useDispatch();

  const { storyId } = useParams();

  const story = useSelector((state) =>
    selectStoryByID(state, parseInt(storyId))
  );
  const comments = useSelector((state) => state.stories.comments);

  useEffect(() => {
    if (story && story.kids && story.kids.length > 0) {
      dispatch(fetchComments(story.kids));
    }
  }, [dispatch, story]);

  let content;
  if (!story) {
    content = <p>No story found</p>;
  } else {
    const { title, time, by, url } = story;
    const formattedTime = format(fromUnixTime(time), 'dd/MM/yyyy');

    content = (
      <div>
        <h1 className="text-2xl sm:text-3xl sm:font-semibold">{title}</h1>
        <p className="text-xs sm:text-sm text-neutral-500 mb-3">
          {formattedTime}
        </p>
        <p className="text-sm sm:text-base sm:font-medium">by {by}</p>
        <p className="text-xs sm:text-sm text-neutral-500 mb-3">
          {comments.length} comments
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm sm:text-base text-sky-400 break-words"
        >
          {url}
        </a>
      </div>
    );
  }

  return (
    <article className="max-w-screen-md p-6 sm:flex">
      <div className="mb-8 mr-8">
        <Link to="/">
          <button className="border rounded py-1 px-4">Back</button>
        </Link>
      </div>
      {content}
    </article>
  );
}
