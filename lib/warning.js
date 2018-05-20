import React , { Component } from "react"
import { createPortal, render } from "react-dom"
import Modal from "./index"
import Command from "./Command"
import extend from "safe-extend"
module.exports = function success (settings) {
    let node = document.createElement('div')
    document.body.appendChild(node)
    if (typeof settings === 'string') {
        settings = {content: settings}
    }
    settings = extend(true, {
        title: '提醒'
    }, settings)
    render(
        createPortal(
            <Command
                type="warning"
                title={settings.title}
                content={settings.content}
                close=""
             />,
            document.body
        ),
        node
    )
}
