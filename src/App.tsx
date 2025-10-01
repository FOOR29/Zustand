import './App.css'
import useCounterStore from './stores/CounterStore'

function App() {
  // creamo una constante con los "parametros" y llamamos la funcion
  const { count, increment, decrement } = useCounterStore()

  return (
    <div className='contaier-count'>
      <h1>Contador Global Zustand: {count}</h1>
      <div className="buttons">
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    </div>
  )
}

export default App
