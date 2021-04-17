import React from 'react';
import './InputForm.css';

const InputForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className='ma4 mt0'>
            <p className='f3 white'>
                {'Masukan sampiran pantun dan tekan Generate untuk membuat pantun'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <textarea className='f4 pa2 w-70 center' onChange={onInputChange} />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit} >Generate</button>
                </div>
                
            </div>
        </div>
    )
}

export default InputForm;