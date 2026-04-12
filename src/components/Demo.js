import { useCallback, useMemo, useState } from "react"

const Demo = () => {
    const [count, setCount] = useState(0); 
    /**
     * everytime count changes, react re-renders the complete page.
     * So, square component also gets called with the given number, initially 0.
     * next it as the number provided by user it will start calc square for N number
     * everytime count changes by its increment method.
     * Results in performance issue by blocking the user in the page.
     * 
     * So, usememo to skip the unnecessary renders, only renders square component if the
     * number changes overtime
     */
    const increment = useCallback(() => {
        setCount(Math.floor(Math.random() * 100));
    });
    return (
    <div>
      Count: {count}
      <br />
      <Increment incMethod={increment} />
      <br />
      <Square count={count} />
    </div>
  );
}

export const Increment = (props) => {
    console.log('Re-Rendered..', props); // fn
    return (
        <button className="btn" onClick={props.incMethod}>Increment</button>
    )
}

const squareNumber = (number) => {
    if (number && number > 0) {
      const time = new Date().getTime();
      let value = 0;
      while (value < 3) {
        value = ((new Date().getTime()) - time) / 1000;
      }
      return number * number;
    }
    else {
      return 0;
    }
}

export const Square = (props) => {
    const [number, setNumber] = useState(0);

    const onNumberChanged = (event) => {
        setNumber(event.target.value)
    }

    const calculate = useMemo(() => squareNumber(number), [number]);
    /**
     * triggers only if the number changes otherwise it will skip this method as it already cached
     * the prev value and it will show that value only but the above increment method works
     * smoother without any delay
     */

    return (
        <>
            <p>{props.count} </p>
            <input className="input" type="number" onChange={onNumberChanged} value={number} />
            is  {calculate}
        </>
    )
}



export default Demo;