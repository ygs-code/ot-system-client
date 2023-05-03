import { Skeleton } from "antd";
import { getUserInfo, checkLogin } from "client/assets/js/request";
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

  const { routesComponent, history } = props;
  const [loading, setLoading] = useState(true);

  const getUser = useCallback(async () => {
    let { data: { flag } = {} } = await checkLogin();
    if (!flag) {
      return false;
    }

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
