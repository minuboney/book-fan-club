import * as React from 'react';
export interface BaseUser {
  name: string;
  role: string;
  dateJoined: string;
}
export interface User extends BaseUser {
  id: number;
}
export interface BaseBook {
  title: string;
  description: string;
  genre: string;
  year: string;
  availability: boolean;
}
export interface Book extends BaseBook {
  id: number;
}

export function createCtx<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    role: defaultValue,
    update: defaultUpdate,
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [role, update] = React.useState(defaultValue);
    return <ctx.Provider value={{ role, update }} {...props} />;
  }
  return [ctx, Provider] as const;
}
const [RoleContext, RoleProvider] = createCtx(0);
export { RoleContext, RoleProvider };
