import { Suspense, use, useMemo, useEffect } from 'react';
import { getImage } from '../context/Store/Indexeddb';

type Props = {
  imageId: string;
  alt?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
};

const promiseCache = new Map<string, Promise<Blob | null>>();

function getImagePromise(imageId: string) {
  if (!promiseCache.has(imageId)) {
    promiseCache.set(imageId, getImage(imageId));
  }
  return promiseCache.get(imageId)!;
}

function ImageInner({ imageId, alt = '', className }: Props) {
  const blob = use(getImagePromise(imageId));

  const objectUrl = useMemo(() => {
    return blob ? URL.createObjectURL(blob) : null;
  }, [blob]);

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        promiseCache.delete(imageId);
      }
    };
  }, [objectUrl]);

  if (!objectUrl) {
    return <div>No image found</div>;
  }

  return <img src={objectUrl} alt={alt} className={className} />;
}

export function IndexedDbImage(props: Props) {
  return (
    <Suspense
      fallback={
        <div
          className='loadingbox'
          style={{ width: props.width, height: props.height }}
        />
      }
    >
      <ImageInner {...props} />
    </Suspense>
  );
}
