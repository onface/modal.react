var React = require('react')
var Button = require('button.react')
var Modal = require('modal.react')
var message = require('face-message')
class Basic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            simple: false,
            async: false
        }
    }
    render () {
        const self = this
        return (
            <div>
                <Button
                    onClick={() => {
                        self.setState({
                            simple: true
                        })
                    }}
                >click</Button>
                <Modal
                    title="《相思》"
                    show={self.state.simple}
                    onOk={() => {
                        self.setState({
                            simple: false
                        })
                    }}
                    onClose={() => {
                        self.setState({
                            simple: false
                        })
                    }}
                >
                    <p>
                    红豆生南国，春来发几枝。<br/>
                    愿君多采撷，此物最相思。
                    </p>
                </Modal>
                <hr />
                <Button
                    onClick={() => {
                        self.setState({
                            async: true
                        })
                    }}
                >async</Button>
                <Modal
                    title="异步关闭"
                    show={self.state.async}
                    onOk={() => {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                message.success('成功')
                                self.setState({
                                    async: false
                                }, resolve)
                            }, 3000)
                        })
                    }}
                    onClose={() => {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                reject()
                                message.error('失败')
                                // self.setState({
                                //     async: false
                                // }, reject)
                            }, 3000)
                        })
                    }}
                >
                    <p>
                     Promise
                    </p>
                </Modal>
                <Button
                    onClick={() => {
                        self.setState({
                            action: true
                        })
                    }}
                >action</Button>
                <Modal
                    title="onAction"
                    show={self.state.action}
                    onAction={(data) => {
                        if (data.name === 'onOk') {
                            console.log('修改某些数据')
                        }
                        self.setState({
                            action: false
                        })
                    }}
                >
                    <p>
                     action
                    </p>
                </Modal>
            </div>
        )
    }
}
/*ONFACE-DEL*/Basic = require("react-hot-loader").hot(module)(Basic)
module.exports = Basic
