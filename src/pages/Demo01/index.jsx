import React from 'react';
import withEnvironment from '../../container/withEnvironment';

function Demo01(props) {
    return (
        <div>你现在正在{props.envdesc}中访问该页面</div>
    )
}

export default withEnvironment(Demo01);
