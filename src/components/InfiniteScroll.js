import React, { useEffect, useRef, useState } from 'react';

export default function InfiniteScroll({
  dataLength,
  onNext,
  hasMore = true,
  loadingElem,
  error,
  children,
}) {
  const [loadingMore, setLoadingMore] = useState(false);

  function handleIntersect([entry]) {
    if (entry.isIntersecting) {
      onNext();
      setLoadingMore(true);
    }
  }

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };

  const intersectionObserver = useRef(
    new IntersectionObserver(handleIntersect, options)
  );

  const intersectionTarget = useRef(null);

  useEffect(() => {
    const observer = intersectionObserver.current;
    const target = intersectionTarget.current;

    if (dataLength > 0) {
      observer.observe(target);
    }

    if (!hasMore || error) {
      // Disconnect observer when there is no more data to load
      // or there is an error
      observer.disconnect();
    }

    return () => {
      observer.disconnect();
    };
  }, [dataLength, hasMore, error]);

  useEffect(() => {
    setLoadingMore(false);
  }, [dataLength]);

  return (
    <article>
      {children}
      <div ref={intersectionTarget} />
      {loadingMore && loadingElem && !error && (
        <div className="mt-3">{loadingElem}</div>
      )}
      {error && <div className="text-red-500 mt-3">{error}</div>}
    </article>
  );
}
