import React from "react";
import { Route } from "react-router-dom";

// 인증 필요로하지 않는 컴포넌트 라우팅
export default ({ component: C, props: cProps, ...rest }) =>
  <Route 
    {...rest} 
    render={props => 
      <C {...props} {...cProps} />} 
  />;
