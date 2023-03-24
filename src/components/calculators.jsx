import React, { useState } from 'react'
import './style.css'
import './jsom.css'

export default function Calculator(){

  const [num, setNum]= useState("");
  const [primaryN, setPrimary] = useState(0);
  const [operador, setOperador] = useState();
  const [valordolar, setValordolar] = useState();
  

function httpGet(theUrl)
{
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

function renderValue() {
  var dolar = httpGet("https://economia.awesomeapi.com.br/last/USD-BRL")
  var parsedDolar = JSON.parse(dolar)["USDBRL"] ["high"]
  setValordolar(parsedDolar);
  console.log(num);
  console.log(valordolar)
  setNum(num*parsedDolar);
  }
   
  const numberValue = (event) => {
    let number = event.target.value;
    if(num === 0){
      setNum(number)
    }else{
      setNum(num + number)
    }
  }
 
  const operators = (e) => {
    let operator = e.target.value;
    setOperador(operator);
    setPrimary(num);
    setNum(0)
  }
  
  const Result = () => {
    if(operador === "+"){
      setNum(parseFloat(primaryN) + parseFloat(num))
  }else if (operador === "-"){
      setNum(parseFloat(primaryN) - parseFloat(num))
  }else if (operador ==="/"){
      setNum(parseFloat(primaryN) / parseFloat(num))
  }else if (operador ==="x"){
      setNum(parseFloat(primaryN) * parseFloat(num))
  }
  }
  console.log(num)  

  const  clear = ()=>{
    setNum(0)
  }

  return (
    <div className="container">

      <div className="title">Calculator</div>
      <div className='calculator-container'>
      <div className='calculator'>
          <div className='display'>
            <div className='result' id='result'>{num}</div>
          </div>

          <div className="button-container">
            <div className="button-row">
              <button className='buttons white clear' onClick={clear} >C</button>
              <button className='buttons azul dividir' onClick={operators} value={'/'} >/</button>
            </div>

            <div className="button-row">
              <button className='buttons black sete' onClick={numberValue} value={7} >7</button>
              <button className='buttons black oito' onClick={numberValue}  value={8} >8</button>
              <button className='buttons black nove' onClick={numberValue} value={9} >9</button>
              <button className='buttons azul multiplicar'onClick={operators} value= {'x'}>x</button>
            </div>

            <div className="button-row">
              <button className='buttons black quatro' onClick={numberValue} value={4} >4</button>
              <button className='buttons black cinco' onClick={numberValue} value={5} >5</button>
              <button className='buttons black seis' onClick={numberValue} value={6} >6</button>
              <button className='buttons azul diminuir'onClick={operators} value={'-'} >-</button>
            </div>

            <div className="button-row">
              <button className='buttons black um' onClick={numberValue} value={1} >1</button>
              <button className='buttons black dois' onClick={numberValue} value={2} >2</button>
              <button className='buttons black tres' onClick={numberValue} value={3} >3</button>
              <button className='buttons azul somar' 
              onClick={operators} value={'+'} >+</button>
            </div>
            <div className="Button-row">
              <button className='buttons black zero' onClick={numberValue} value={0} >0</button>
              <button className='buttons azul resultado' onClick={Result}>=</button>
            </div>
          </div>
        </div>
       
        <div className="dolar-container">
            <button onClick={renderValue} className="button-dolar">
                Converter para dolar
            </button>
            <h1>{valordolar}</h1>
        </div>

      </div>


    </div>
   
  );
}