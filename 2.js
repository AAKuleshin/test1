const logger = (param) => {
    const colors = {
        warning: '\x1b[1;33m',
        error: '\x1b[0;31m',
        info: '\x1b[1;37m',
    }
    const color = colors[param] || colors.info
    return (str) => {
        const date = new Date().toISOString()
        console.log(color + date + `\t` + str)
    }
}

const warning = logger('warning')
const error = logger('error')
const info = logger('info')

warning('WARNINGGGGG')
error('THIS IS ERROR')
info('IT`s TEXT')    

warning("ZARABOTALO")
