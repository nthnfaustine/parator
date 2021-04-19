import React from 'react';
// import './InputForm.css'

const Result = ({ sampiran1, sampiran2, output1, output2 }) => {
    return (
        <div className='ma4 mt0 shadow-5 pa4 br3'>
            <p className='white'>{ sampiran1 }</p>
            <p className='white'>{ sampiran2 }</p>
            <p className='white'>{ output1 }</p>
            <p className='white'>{ output2 }</p>
        </div>
    )
}

export default Result;