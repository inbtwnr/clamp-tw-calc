import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [before, setBefore] = useState(0)
    const [after, setAfter] = useState(0)
    const FONT_SIZE = 16
    const TAILWIND_COEF = 4

    const beforeRem = before / FONT_SIZE
    const afterRem = after / FONT_SIZE

    // 1 / 4 = beforeRem / x
    const beforeTw =  TAILWIND_COEF * beforeRem
    const afterTw = TAILWIND_COEF * afterRem

    const [minViewport, setMinViewport] = useState(0)
    const [maxViewport, setMaxViewport] = useState(0)

    const handleValue = (e, setValue) => {
        e.preventDefault()
        const value = e.target.value;
        setValue(value)
    }

    const handleBefore = (e) => {
        handleValue(e, setBefore)
    }

    const handleAfter = (e) => {
        handleValue(e, setAfter)
    }

    const handleMinViewport = (e) => {
        handleValue(e, setMinViewport)
    }

    const handleMaxViewport = (e) => {
        handleValue(e, setMaxViewport)
    }

    function calculateClamp(minValue, maxValue, minViewportWidth, maxViewportWidth) {
        // Convert all inputs to floating-point numbers for calculations
        minValue = parseFloat(minValue);
        maxValue = parseFloat(maxValue);
        minViewportWidth = parseFloat(minViewportWidth);
        maxViewportWidth = parseFloat(maxViewportWidth);

        // Calculate the slope (how much the value changes per unit of viewport width)
        let slope = (maxValue - minValue) / (maxViewportWidth - minViewportWidth);

        // Calculate the offset (the starting value for the dynamic calculation)
        let offset = -minViewportWidth * slope + minValue;

        // Convert the slope to a percentage for use with vw (viewport width)
        let vwSlope = slope * 100;

        // Return the final CSS clamp() value
        return `'clamp-${beforeTw}-${afterTw}': 'clamp(${minValue.toFixed(3)}rem, ${offset.toFixed(3)}rem + ${vwSlope.toFixed(3)}vw, ${maxValue.toFixed(3)}rem)'`;
    }

    const clamp = calculateClamp(before, after, minViewport, maxViewport)

  return (
      <div>
          <h1>px to rem converter</h1>
          <form>
              <label>
                  Before, in px
                  <input
                      onChange={handleBefore}
                      type="text"
                      placeholder={'Before value in px'}
                      value={before}
                  />
              </label>
              <label>
                  After, in px
                  <input
                      onChange={handleAfter}
                      type="text"
                      placeholder={'After value in px'}
                      value={after}
                  />
              </label>
          </form>
          <p>before in rem {beforeRem}</p>
          <p>after in rem {afterRem}</p>
          <p>{`'${beforeTw}': '${beforeRem}'`}</p>
          <p>{`'${afterTw}': '${afterRem}'`}</p>
          <h2>Clamp calculator</h2>
          <form action="">
              <label>
                  min viewport
                  <input type="text" placeholder={'min viewport'} value={minViewport} onChange={handleMinViewport} />
              </label>
              <label htmlFor="">
                  max viewport
                  <input type="text" placeholder={'max viewport'} value={maxViewport} onChange={handleMaxViewport} />
              </label>
          </form>
          <p>{clamp}</p>
      </div>
  )
}

export default App
