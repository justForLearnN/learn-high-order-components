import React from 'react';
import $ from 'jquery';

// 假设已经封装了一个叫做getCookie的方法获取cookie
import { getCookie } from 'cookie';

function withRule(BasicComponent) {

    return class C extends React.Component {
        state = {
            islogin: false,
            rule: -1,
            loading: true,
            error: null
        }

        componentDidMount() {
            // 如果能直接在cookie中找到uid，说明已经登录过并保存了相关信息
            if (getCookie('uid')) {
                this.setState({
                    islogin: true,
                    rule: getCookie('rule') || 0,
                    loading: false
                })
            } else {
                // 如果找不到uid，则尝试自动登录，先从kookie中查找是否保存了登录账号与密码
                const userinfo = getCookie('userinfo');
                if (userinfo) {
                    $.post('/api/login', {
                        username: userinfo.username,
                        password: userinfo.password
                    }).then(resp => {
                        this.setState({
                            islogin: true,
                            rule: resp.rule,
                            islogin: false
                        })
                    }).catch(err => this.setState({ error: err.message }))
                } else {
                    // 当无法自动登录时，你可以选择在这里弹出登录框，或者直接显示未登录页面的样式等都可以
                }
            }
        }

        render() {
            const { islogin, rule, loading, error } = this.state;

            if (error) {
                return (
                    <div>登录接口请求失败！错误信息为：{error}</div>
                )
            }

            if (loading) {
                return (
                    <div>页面加载中, 请稍后...</div>
                )
            }

            return (
                <BasicComponent {...props} islogin={islogin} rule={rule} />
            )
        }
    }
}

export default withRule;
