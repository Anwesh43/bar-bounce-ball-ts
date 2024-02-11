import {useState, useEffect, CSSProperties} from 'react'

export const useAnimatedScale = (scGap : number = 0.01, delay : number = 20) => {
    const [scale, setScale] = useState<number>(0)
    const [animated, setAnimated] = useState<boolean>(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            clearInterval(interval)
                            setAnimated(false)
                            return 0 
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        const resizeListener = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        window.addEventListener('resize', resizeListener, false)
        return () => {
            window.removeEventListener('resize', resizeListener)
        }
    })
    return {
        w, 
        h
    }
}

interface CSSStyleProperties {
    parentStyle() : CSSProperties
    barStyle() : CSSProperties 
    circleStyle() : CSSProperties 
}

const sinify = (scale : number) : number => Math.sin(scale * Math.PI)

export const useStyle = (w : number, h : number, scale : number) : CSSStyleProperties => {
    const size : number = Math.min(w, h) / 10 
    const position = 'absolute'
    const background = 'indigo'
   
    return {
        parentStyle() : CSSProperties {
            return {
                position,
                left: `${w / 2}px`,
                top: `${h / 2}px`
            }
        },
        barStyle() : CSSProperties {
            return {
                position,
                left: `${-size / 2}px`,
                top: `0px`,
                width: `${size}px`,
                height: `${size}px`,
                background
            }
        },
        circleStyle() : CSSProperties {
            return {
                position,
                left: `${-size / 2}px`,
                top: `${-h * 0.5 * (1 - sinify(scale))}px`,
                width: `${size}px`,
                height: `${size}px`,
                background , 
                borderRadius: `50%`
            }
        }
    }
}