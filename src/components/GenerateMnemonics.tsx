import { useState } from 'react';
import * as bip39 from 'bip39';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store';
import { setMnenonics } from '../features/slices/mnemonicsSlice';
import toast from 'react-hot-toast';

const GenerateMnemonics = () => {
  const storedMnemonic = useSelector((state: RootState) => state.mnemonics.mnemonics);
  const dispatch = useDispatch();
  
  const [inputMnemonic, setInputMnemonic] = useState('');
  const [error, setError] = useState('');

  const generateMnemonic = () => {
    const newMnemonic = bip39.generateMnemonic();
    dispatch(setMnenonics(newMnemonic));
    setInputMnemonic(''); // Clear input field
    setError('');
  };

  const copyToClipboard = () => {
    if (!storedMnemonic) return;
    navigator.clipboard.writeText(storedMnemonic);
    toast.success("Mnemonic copied!");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMnemonic(e.target.value);
    setError('');
  };

  const validateMnemonic = () => {
    if (bip39.validateMnemonic(inputMnemonic.trim())) {
      dispatch(setMnenonics(inputMnemonic.trim()));
      toast.success("Mnemonic is valid!");
      setInputMnemonic('');
      setError('');
    } else {
      setError("Invalid mnemonic. Please check the words and try again.");
    }
  };

  return (
    <div className="w-full  bg-gray-900 text-white flex flex-col items-center  ">
      <h1 className="text-3xl font-bold mb-4">Mnemonic Generator & Validator</h1>

      
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={generateMnemonic}
      >
        Generate Mnemonic
      </button>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xl mt-6">
        <h2 className="text-xl font-semibold mb-2">Enter Mnemonic</h2>
        <textarea
          className="w-full p-3 bg-gray-700 rounded-lg text-white resize-none"
          rows={3}
          placeholder="Enter your 12 or 24-word mnemonic here..."
          value={inputMnemonic}
          onChange={handleInputChange}
        />
        {error && <p className="text-red-400 mt-2">{error}</p>}
        <button
          className="bg-green-500   hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-4 w-full"
          onClick={validateMnemonic}
        >
          Validate Mnemonic
        </button>
      </div>
      <br></br>
     
      {storedMnemonic && (
        <div className="bg-gray-800   rounded-lg shadow-lg w-full max-w-xl p-6">
          <h2 className="text-xl font-semibold mb-2">Generated Mnemonic</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            {storedMnemonic.split(' ').map((word, index) => (
              <div key={index} className="bg-gray-700 p-3 rounded-lg shadow-md text-lg font-semibold">
                {index + 1}. {word}
              </div>
            ))}
          </div>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 w-full"
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
