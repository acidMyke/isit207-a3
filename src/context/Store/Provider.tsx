import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { createActions, createStoreState } from './Actions';

type PetDataStoreContextData = Pick<
  ReturnType<typeof createStoreState>,
  'pets' | 'adoptions' | 'rehomes'
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
  const { pets, setPets, adoptions, setAdoptions, rehomes, setRehomes } =
    storeInternalState;

  const actions = useMemo(
    () => createActions(storeInternalState),
    [pets, setPets, adoptions, setAdoptions, rehomes, setRehomes],
  );

  return (
    <petStoreContext.Provider value={{ pets, adoptions, rehomes, ...actions }}>
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
