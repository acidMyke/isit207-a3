import { Suspense, use, useMemo, useEffect, useState } from 'react';
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

type FileImageProps = {
  file: File | Blob | null;
  alt?: string;
  className?: string;
  onCleanup?: () => void;
};

export function FileImage({
  file,
  alt = '',
  className,
  onCleanup,
}: FileImageProps) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setObjectUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setObjectUrl(url);

    return () => {
      URL.revokeObjectURL(url);
      onCleanup?.();
    };
  }, [file, onCleanup]);

  if (!objectUrl) {
    return <div>No image found</div>;
  }

  return <img src={objectUrl} alt={alt} className={className} />;
}

function ImageInner({ imageId, ...rest }: Props) {
  const blob = use(getImagePromise(imageId));

  return (
    <FileImage
      file={blob}
      onCleanup={() => promiseCache.delete(imageId)}
      {...rest}
    />
  );
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
