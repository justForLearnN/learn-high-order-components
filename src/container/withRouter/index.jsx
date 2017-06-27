import React from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import Route from './Route';

// 传入基础组件作为参数
const withRouter = (Component) => {

    // 创建中间组件
    const C = (props) => {
        const { wrappedComponentRef, ...remainingProps } = props;
        return (
            <Route render={routeComponentProps => (
                // wrappedComponentRef 用来解决高阶组件无法正确获取到ref的问题
                <Component {...remainingProps} {...routeComponentProps} ref={wrappedComponentRef}/>
            )}/>
        )
    }

    C.displayName = `withRouter(${Component.displayName || Component.name})`;
    C.WrappedComponent = Component;
    C.propTypes = {
        wrappedComponentRef: PropTypes.func
    }

    // hoistStatics类似于Object.assign，用于解决基础组件因为高阶组件的包裹而丢失静态方法的问题
    return hoistStatics(C, Component);
}

export default withRouter;
