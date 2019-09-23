import React, { Component } from "react";
import "./Calculator.css";
import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
    displaValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component{
    state = {...initialState}
    clearMemory() {
        this.setState({...initialState})
    }
    
    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({operation, current: 1, clearDisplay: true})
        } else {
            const equals = operation === '=';
            const currentOperation = this.state.operation;
            const values = [...this.state.values]

            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch (error) {
                values[0] = this.state.values[0]
            }
            values[1] = 0 

            this.setState({
                displaValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }
    
    addDigit(digit) {
        if (digit === '.' && this.state.displaValue.includes('.')) {
            return;
        }

        const clearDisplay = this.state.displaValue === '0' || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displaValue;
        const displaValue = currentValue + digit;

        this.setState({displaValue, clearDisplay: false})

        if (digit !== '.') {
            const i = this.state.current;
            const newValue = parseFloat(displaValue);
            const values = [...this.state.values]
            values[i] = newValue;
            this.setState({values})
        }
    }
    
    render(){
        const setOperation = op => this.setOperation(op);
        const addDigit = digit => this.addDigit(digit);
        return (
            <div>
                <h3>Calculator</h3>
                <div className="calculator">
                    <Display value={this.state.displaValue}/>
                    <Button label="AC" click={() => this.clearMemory()} triple />
                    <Button label="/" operation click={setOperation}/>
                    <Button label="7" click={addDigit} />
                    <Button label="8" click={addDigit} />
                    <Button label="9" click={addDigit} />
                    <Button label="*"operation click={setOperation} />
                    <Button label="4" click={addDigit} />
                    <Button label="5" click={addDigit} />
                    <Button label="6" click={addDigit} />
                    <Button label="-" operation click={setOperation}/>
                    <Button label="1" click={addDigit} />
                    <Button label="2" click={addDigit} />
                    <Button label="3" click={addDigit} />
                    <Button label="+" operation click={setOperation}/>
                    <Button label="0" click={addDigit} double/>
                    <Button label="." click={addDigit} />
                    <Button label="=" operation click={setOperation} />
                </div>
            </div>
        )
    }
}