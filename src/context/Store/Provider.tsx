import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { createActions, createStoreState } from './Actions';

type PetDataStoreContextData = Pick<
  ReturnType<typeof createStoreState>,
  'pets' | 'adoptions' | 'releases'
> &
  ReturnType<typeof createActions>;

const petStoreContext = createContext<PetDataStoreContextData | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export function PetDataStoreProvider({ children }: Props) {
  const storeInternalState = createStoreState();
  const { pets, setPets, adoptions, setAdoptions, releases, setReleases } =
    storeInternalState;

  const actions = useMemo(
    () => createActions(storeInternalState),
    [pets, setPets, adoptions, setAdoptions, releases, setReleases],
  );

  return (
    <petStoreContext.Provider value={{ pets, adoptions, releases, ...actions }}>
      {children}
    </petStoreContext.Provider>
  );
}

export function useStore(): PetDataStoreContextData {
  const contextData = useContext(petStoreContext);

  if (!contextData) {
    throw new Error('useStore must be used within PetStoreProvider');
  }

  return contextData;
}
