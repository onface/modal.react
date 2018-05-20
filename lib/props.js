import p from 'prop-types'
export default function (app) {
    app.defaultProps = {
        prefixClassName: 'face-modal',
        themes: '',
        title: '标题',
        close:"关闭",
        ok:"确认",
        footer: (self) => {
            let Button = self.components.Button
            return (
                <div className={`${self.props.prefixClassName}-footer`}>
                    {
                        self.props.close?
                            typeof self.props.close === 'string'?
                            (
                                <Button
                                    loading={self.state.busy.close}
                                    style={{marginRight: '.5em'}}
                                    onClick={() => {
                                        self.emitClose()
                                    }}
                                >{self.props.close}</Button>
                            )
                            :
                            self.props.close(self)
                        :
                        null
                    }
                    {
                        self.props.ok?
                            typeof self.props.ok === 'string'?
                            (
                                <Button
                                    loading={self.state.busy.ok}
                                    type="primary"
                                    style={{marginRight: '.5em'}}
                                    onClick={() => {
                                        self.emitOk()
                                    }}
                                >{self.props.ok}</Button>
                            )
                            :
                            self.props.ok(self)
                        :
                        null
                    }
                </div>
            )
        }
    }
    app.propTypes = {
        prefixClassName: p.string,
        themes: p.string
    }
}
