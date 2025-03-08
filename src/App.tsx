import   { useState } from 'react';
import SolWallet from './components/SolWallet';
import EthWallet from './components/EthWallet';
import GenerateMnemonics from './components/GenerateMnemonics';
import { motion } from 'framer-motion';

const App = () => {
  const [selectedWallet, setSelectedWallet] = useState('eth');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center w-full">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-4xl font-bold mb-6 text-center"
      >
        Wallet App
      </motion.h1>
    <div>
      
    </div>
      <GenerateMnemonics />

      <div className="mt-6 w-full max-w-xl">
        <select 
          className="w-full p-2 bg-gray-800 rounded-md text-white outline-none"
          value={selectedWallet} 
          onChange={(e) => setSelectedWallet(e.target.value)}
        >
         
          <option value="eth">Ethereum Wallet</option>
          <option value="sol">Solana Wallet</option>
        </select>
      </div>

      <div className="mt-8  flex w-full      ">
        {( selectedWallet === 'sol') && (
          <motion.div className='mx-auto w-[70%]' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SolWallet />
          </motion.div>
        )}
        {( selectedWallet === 'eth') && (
          <motion.div className='mx-auto w-[70%]' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <EthWallet />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default App;
