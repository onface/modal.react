import React , { Component } from "react"
import Modal from "./index"
import { createPortal, render } from "react-dom"
import Icon from "icon.react"
class Command extends Component {
    constructor (props) {
        super(props)
        const self = this
        self.state = {
            show: true
        }
    }
    render() {
        const self = this
        return (
            <Modal
                {...self.props}
                themes={'tip'}
                style={{
                    width: '30em'
                }}
                show={self.state.show}
                header=""
                onAction={(data) => {
                    let output
                    let hide = () => {
                        self.setState({
                            show: false
                        })
                    }
                    if (data.name === 'onOk' && self.props.type === 'confirm') {
                        output = self.props.onConfirm()
                        if (output && output.constructor === Promise) {
                            output.then(hide, function() {
                                console.log('fail')
                            })
                            return output
                        }
                        else {
                            hide()
                        }
                    }
                    else {
                        hide()
                    }
                }}
            >
            {(self) => {
                let iconMap = {
                    success: 'check-of',
                    info: 'info-of',
                    warning: 'warning-of',
                    danger: 'warning-of',
                    confirm: 'question-of'
                }
                return (
                    <div className={`${self.props.prefixClassName}-tip ${self.props.prefixClassName}-tip--${self.props.type}`}>
                        <div className={`${self.props.prefixClassName}-tip-title`} >
                            <span className={`${self.props.prefixClassName}-tip-title-icon`} >
                                <Icon type={iconMap[self.props.type]}  />
                            </span>
                            {self.props.title}
                        </div>
                        <div className={`${self.props.prefixClassName}-tip-content`} >
                            {self.props.content}
                        </div>
                    </div>
                )
            }}
            </Modal>
        )
    }
}

export default Command
