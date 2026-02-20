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
  const objectUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        onCleanup?.();
      }
    };
  }, [objectUrl]);

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
