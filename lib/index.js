import { Component } from "react"
import { createPortal } from "react-dom"
import extend from "extend"
import Button from "button.react"
import util from "util.react"
require('./index.css')
class Modal extends Component {
    constructor (props) {
        super(props)
        const self = this
        this.state = {
            busy: {
                close: false,
                ok: false
            }
        }
        this.components = {
            Button
        }
    }
    emitClose = () => {
        const self = this
        if (self.state.busy.close) { return }
        let output
        if (typeof self.props.onAction === 'function') {
            output = self.props.onAction({name: 'onClose'})
        }
        else {
            output = self.props.onClose()
        }
        if (output && output.constructor === Promise) {
            let state = self.state
            state.busy.close = true
            self.setState(state)
            function free () {
                let state = self.state
                state.busy.close = false
                self.setState(state)
            }
            output.then(free, free)
        }
    }
    emitOk = () => {
        const self = this
        if (self.state.busy.ok) { return }
        let output
        if (typeof self.props.onAction === 'function') {
            output = self.props.onAction({name: 'onOk'})
        }
        else {
            output = self.props.onOk()
        }
        if (output && output.constructor === Promise) {
            let state = self.state
            state.busy.ok = true
            self.setState(state)
            function free() {
                let state = self.state
                state.busy.ok = false
                self.setState(state)
            }
            output.then(free, free)
        }
    }
    render() {
        const self = this
        var rootClassName = [
            self.props.prefixClassName,
            util.themes(self.props),
        ].join(' ')
        if (!self.props.show) {
            return ''
        }
        let components = {
            Button
        }
        return [
                createPortal(
                    <div className={`${self.props.prefixClassName}-mask`}></div>,
                    document.body
                ),
                createPortal(
                    (
                        <div className={`${self.props.prefixClassName}-wrap`}>
                            <div
                                ref={(node) => { self.refsRoot = node}}
                                style={self.props.style}
                                className={rootClassName}
                            >
                                <div className={`${self.props.prefixClassName}-header`}>
                                    <div className={`${self.props.prefixClassName}-header-title`}>{self.props.title}</div>
                                    <div className={`${self.props.prefixClassName}-header-close`}  onClick={() => {
                                        self.emitClose()
                                    }} >&times;</div>
                                </div>
                                <div className={`${self.props.prefixClassName}-body`}>
                                {self.props.children}
                                </div>
                                {
                                    self.props.footer?self.props.footer(self, components):''
                                }
                            </div>
                        </div>
                    ),
                    document.body
                )
        ]
    }
}
require('./props').default(Modal)
export default Modal
module.exports = Modal
