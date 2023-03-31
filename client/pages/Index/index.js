import { Skeleton } from "antd";
import { getUserInfo } from "client/assets/js/request";
import Layout from "client/component/Layout";
import { mapRedux } from "client/redux";
import Routers, { addRouterApi } from "client/router";
import React, { useCallback, useEffect, useState } from "react";

const Index = (props) => {
  const {
    dispatch: {
      user: { setUserInfo }
    }
  } = props;

  console.log('props123=======',props)

  const { routesComponent, history } = props;
  const [loading, setLoading] = useState(true);

  const getUser = useCallback(async () => {
    let { data } = await getUserInfo({});
    setUserInfo(data);
  }, []);

  useEffect(() => {
    getUser().then(() => {
      setLoading(false);
    });
  }, []);
  return (
    <Skeleton active loading={loading}>
      
        <Routers
          {...props}
          level={2}
          history={history}
          routesComponent={routesComponent}
        />
  
    </Skeleton>
  );
};

export default mapRedux()(addRouterApi(Index));
