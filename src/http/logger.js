export class Logger {
    constructor(opts = {}) {
        this.$consoleColor = {
            info: '#2db7f5',
            success: '#87d068',
            warn: '#faad14',
            error: '#f50'
        };
        this.opts = opts;
    }

    initParams(...args) {
        const len = args.length;
        const opts = len && args[len - 1];
        if (opts && typeof opts === 'string') {
            args.push({});
        }
        return {
            prefix: this.opts.prefix || '>>  Log',
            color: '',
            ...(typeof opts === 'object' && opts)
        };
    }

    log(...args) {
        const { prefix, color } = this.initParams(...args);
        if (!this.opts.colorful) {
            console.log(prefix, ...args.slice(0, -1));
            return;
        }
        console.log(`%c${prefix}`, `color:${color || this.$consoleColor.info}`, ...args.slice(0, -1));
    }

    info(...args) {
        const { prefix } = this.initParams(...args);
        if (!this.opts.colorful) {
            console.info(prefix, ...args.slice(0, -1));
            return;
        }
        console.log(`%c${prefix}`, `color:${this.$consoleColor.info}`, ...args.slice(0, -1));
    }

    success(...args) {
        const { prefix } = this.initParams(...args);
        if (!this.opts.colorful) {
            console.info(prefix, ...args.slice(0, -1));
            return;
        }
        console.log(`%c${prefix}`, `color:${this.$consoleColor.success}`, ...args.slice(0, -1));
    }

    warn(...args) {
        const { prefix } = this.initParams(...args);
        if (!this.opts.colorful) {
            console.warn(prefix, ...args.slice(0, -1));
            return;
        }
        console.log(`%c${prefix}`, `color:${this.$consoleColor.warn}`, ...args.slice(0, -1));
    }

    error(...args) {
        const { prefix } = this.initParams(...args);
        if (!this.opts.colorful) {
            console.error(prefix, ...args.slice(0, -1));
            return;
        }
        console.log(`%c${prefix}`, `color:${this.$consoleColor.error}`, ...args.slice(0, -1));
    }
}

export const logRequest = (requestParams) => {
    const { method, data, url, header } = requestParams
    let vconsoleEnv = null;
    /* #ifdef MP-WEIXIN */
    // eslint-disable-next-line no-undef
    vconsoleEnv = !/devtools/i.test(__wxConfig.platform) && __wxConfig.debug;
    /* #endif */
    const log = new Logger({ colorful: !vconsoleEnv });
    !vconsoleEnv && console.groupCollapsed(`Request: [${method.toUpperCase()}]${url}`);
    vconsoleEnv && console.debug('---------------------Before Request ---------------------')
    vconsoleEnv && log.log(`${url}`, { prefix: `[${method.toUpperCase()}]` })
    log.log(data, { prefix: `[data]` })
    // log.log(header.requestId, { prefix: `[requestId]` })
    log.log(header, { prefix: `[Headers]` })
    !vconsoleEnv && console.groupEnd()
}

export const logReponse = (requestParams, response, { type = 'success' }) => {
    const { method, data, url, header } = requestParams
    let vconsoleEnv = null;
    /* #ifdef MP-WEIXIN */
    // eslint-disable-next-line no-undef
    vconsoleEnv = !/devtools/i.test(__wxConfig.platform) && __wxConfig.debug;
    /* #endif */
    const log = new Logger({ colorful: !vconsoleEnv });
    const headColor = { 'success': '#5eead4', 'error': '#ec4899' }
    if (!vconsoleEnv) {
        const info = `%cResponse: (${method.toUpperCase()}) ${url}`
        const color = `color: ${headColor[type]}`
        if (type === 'success') {
            console.groupCollapsed(info, color);
        } else if (type === 'error') {
            console.group(info, color);
        }
    }
    vconsoleEnv && console.debug('---------------------Receive Reponse ---------------------')
    vconsoleEnv && log.log(`${url}`, { prefix: `[${method.toUpperCase()}]` })
    if (type === 'success') {
        // log.success(header.requestId, { prefix: `[requestId]` })
        // log.success(response, { prefix: `[原始信息]` })
        log.success(response?.data, { prefix: `[data]` })
    } else if (type === 'error') {
        response?.data && log.error(response?.data?.code || response?.data?.error, { prefix: `[错误代码]` })
        response?.data && log.error(response?.data?.message || response?.data?.msg, { prefix: `[错误信息]` })
        log.error(response, { prefix: `[原始信息]` })
    }

    !vconsoleEnv && console.groupEnd()
}
