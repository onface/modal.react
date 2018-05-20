var React = require('react')
var Button = require('button.react')
var Modal = require('modal.react')
class Basic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            simple: false,
            async: true
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
                    title="相思"
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
                    title="相思"
                    show={self.state.async}
                    onOk={() => {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                resolve()
                                self.setState({
                                    async: false
                                })
                            }, 3000)
                        })
                    }}
                    onClose={() => {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                resolve()
                                self.setState({
                                    async: false
                                })
                            }, 3000)
                        })
                    }}
                >
                    <p>
                     Promise
                    </p>
                </Modal>
            </div>
        )
    }
}
/*ONFACE-DEL*/Basic = require("react-hot-loader").hot(module)(Basic)
module.exports = Basic
