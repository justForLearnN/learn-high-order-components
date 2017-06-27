import React from 'react';

const envs = {
    weixin: '微信',
    qq: 'QQ',
    baiduboxapp: '手机百度',
    weibo: '微博',
    other: '移动端'
}

function withEnvironment(BasicComponent) {
    const ua = navigator.userAgent;
    const isMobile = 'ontouchstart' in document;
    let env = 'other';

    if (ua.match(/MicroMessenger/i)) {
        env = 'weixin';
    }
    if (ua.match(/weibo/i)) {
        env = 'weibo';
    }
    if (ua.match(/qq/i)) {
        env = 'qq';
    }
    if (ua.match(/baiduboxapp/i)) {
        env = 'baiduboxapp'
    }

    // 不同逻辑下返回不同的中间组件
    if (!isMobile) {
        return function () {
            return (
                <div>
                    <div>该页面只能在移动端查看，请扫描下方二维码打开。</div>
                    <div>假设这里有张二维码</div>
                </div>
            )
        }
    }

    // 通过定义的中间组件将页面所处环境通过props传递给基础组件
    const C = props => (
        <BasicComponent {...props} env={env} envdesc={envs[env]} />
    )

    return C;
}

export default withEnvironment;
