import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../components/Interface';

const withProtectRoute = (ChildComp: React.ComponentType<any | string>) => {
  /*
    Using withProtectRoute probably means the page is not public facing,
    which means it can be client-side rendered (no SSR).
    Hence, pages using withProtectRoute should consider doing client-side
    fetch to get the page data.
    */
  const WrappedComponent = (props: any) => {
    const router = useRouter();
    const { state } = React.useContext(UserContext);

    useEffect(() => {
      if (!state) {
        router.push('/');
      }
    }, [state, router]);
    // At this point, the props being passed in are the original props the component expects.
    return <ChildComp {...props} />;
  };
  WrappedComponent.displayName = 'WrappedComponent';
  return WrappedComponent;
};

export default withProtectRoute;
