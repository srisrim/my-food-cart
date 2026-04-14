import { memo, useCallback, useState } from "react"

const UseCallbackDemo = () => {
    const [count, setCount] = useState(0); 
    /**
     * 
     */
    const increment = useCallback(() => {
        setCount(count + 1);
    });

    return (
    <div>
      <p>Count: {count}</p>
      <br />
      <Increment incMethod={increment} />
    </div>
  );
}

export const Increment = memo(({incMethod}) => {
    console.log('Re-Rendered..', incMethod); // fn
    return (
        <button className="btn" onClick={incMethod}>Increment</button>
    )
})

export default UseCallbackDemo;