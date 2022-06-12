import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { RoleContext } from '../components/Interface';

const withProtectRoute = (ChildComp: React.ComponentType<any | string>) => {
  /*
    Using withProtectRoute probably means the page is not public facing,
    which means it can be client-side rendered (no SSR).
    Hence, pages using withProtectRoute should consider doing client-side
    fetch to get the page data.
    */
  const WrappedComponent = (props: React.ComponentType<any | string>) => {
    const router = useRouter();
    const { role } = React.useContext(RoleContext);

    useEffect(() => {
      if (!role) {
        router.push('/');
      }
    }, [role, router]);
    // At this point, the props being passed in are the original props the component expects.
    return <ChildComp {...props} />;
  };
  WrappedComponent.displayName = 'WrappedComponent';
  return WrappedComponent;
};

export default withProtectRoute;
