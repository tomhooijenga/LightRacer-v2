/**
 * Created by Tom on 17-Jul-15.
 */

window.requestAnimationFrame = window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.oRequestAnimationFrame
        || window.msRequestAnimationFrame;

window.cancelAnimationFrame = window.cancelAnimationFrame
    || window.cancelRequestAnimationFrame
    || window.webkitCancelAnimationFrame
    || window.webkitCancelRequestAnimationFrame
    || window.mozCancelAnimationFrame
    || window.mozCancelRequestAnimationFrame
    || window.msCancelAnimationFrame
    || window.msCancelRequestAnimationFrame
    || window.oCancelAnimationFrame
    || window.oCancelRequestAnimationFrame;