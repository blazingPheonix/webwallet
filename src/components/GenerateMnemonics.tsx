import React, { useState } from 'react';
import * as bip39 from 'bip39';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store';
import { setMnenonics } from '../features/slices/mnemonicsSlice';
import toast from 'react-hot-toast';

const GenerateMnemonics = () => {
  const mnemonic = useSelector((state: RootState) => state.mnemonics.mnemonics);
  const dispatch = useDispatch();

  const handlegenerateMnemonic = () => {
    const new_mnemonic = bip39.generateMnemonic();
    dispatch(setMnenonics(new_mnemonic));
  };

  const copyToClipboard = () => {
    if (!mnemonic) return;
    navigator.clipboard.writeText(mnemonic);
    toast.success("copied");
  };

  return (
    <div className='w-full  bg-gray-900 text-white flex flex-col items-center p-6'>
      
      <button
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4'
        onClick={handlegenerateMnemonic}
      >
        Generate Mnemonic
      </button>
      {mnemonic && (
        <div className='bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xl'>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4 text-center'>
            {mnemonic.split(' ').map((word, index) => (
              <div key={index} className='bg-gray-700 p-3 rounded-lg shadow-md text-lg font-semibold'>
                {index + 1}. {word}
              </div>
            ))}
          </div>
          <button
            className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 w-full'
            onClick={copyToClipboard}
          >
            Copy Mnemonic
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateMnemonics;
