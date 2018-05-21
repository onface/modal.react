import React , { Component } from "react"
import { createPortal, render } from "react-dom"
import Modal from "./index"
import Command from "./Command"
import extend from "safe-extend"
module.exports = function confirm (settings, callback) {
    let node = document.createElement('div')
    document.body.appendChild(node)
    if (typeof settings === 'string') {
        settings = {content: settings}
    }
    if (typeof callback === 'function') {
        settings.onConfirm = callback
    }
    settings = extend(true, {
        title: '请确认操作'
    }, settings)
    render(
        createPortal(
            <Command
                type="confirm"
                title={settings.title}
                content={settings.content}
                close="取消"
                ok="确认"
                onConfirm={settings.onConfirm}
             />,
            document.body
        ),
        node
    )
}
