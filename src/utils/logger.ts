/**
 * logger — Winston-backed logging for the TTACart framework.
 *
 * Two ways to use it:
 *   - `logger`              -> the shared root logger (framework-wide messages)
 *   - `createLogger(scope)` -> a child logger tagged with a scope label, so
 *                              every line shows WHERE it came from. Page Objects
 *                              pass their class name as the scope, e.g.
 *                              `createLogger('LoginPage')`.
 *
 * Level is driven by the LOG_LEVEL env var (default 'info'). Output goes to the
 * console (pretty, colourised) and to `logs/combined.log` (plain text) so CI
 * runs leave an artifact behind.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as winston from 'winston';

const { combine, timestamp, printf, colorize, errors } = winston.format;

const LOG_LEVEL = process.env.LOG_LEVEL ?? 'info';

// Ensure logs directory exists so File transport doesn't fail at runtime.
const logsDir = path.resolve(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
    try {
        fs.mkdirSync(logsDir, { recursive: true });
    } catch (e) {
        // If we cannot create the directory, continue — console transport will still work.
        // Avoid throwing during import.
    }
}

/** `2026-06-02 07:40:01 [info] [LoginPage] clicked #login-button` */
const lineFormat = printf((info: any) => {
    const level: string = info.level;
    const message: string = info.message;
    const ts: string = info.timestamp;
    const scope: string | undefined = info.scope;
    const tag = scope ? ` [${scope}]` : '';
    return `${ts} [${level}]${tag} ${message}`;
});

export const logger = winston.createLogger({
    level: LOG_LEVEL,
    format: combine(errors({ stack: true }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), lineFormat),
    transports: [
        new winston.transports.Console({
            format: combine(colorize({ level: true }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), lineFormat),
        }),
        new winston.transports.File({ filename: path.join(logsDir, 'combined.log') }),
    ],
    exceptionHandlers: [new winston.transports.File({ filename: path.join(logsDir, 'exceptions.log') })],
    rejectionHandlers: [new winston.transports.File({ filename: path.join(logsDir, 'rejections.log') })],
});

/**
 * Build a scoped child logger. Every line it emits carries the `scope` label.
 * Use the calling class name as the scope.
 */
/**
 * Create or return a child logger tagged with a `scope` label so callers
 * (page objects, utils) can identify where messages originated.
 */
export function createLogger(scope: string): any {
    return logger.child({ scope });
}

/**
 * Convenience alias for `createLogger` used across the codebase.
 */
export function getLogger(scope: string): any {
    return createLogger(scope);
}

export type Logger = any;

export default logger;