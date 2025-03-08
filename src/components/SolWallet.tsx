import { useState } from 'react';
import { Keypair } from '@solana/web3.js';
import { mnemonicToSeedSync } from 'bip39';
import bs58 from 'bs58';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import toast from 'react-hot-toast';

const SolWallet = () => {
  const mnemonic = useSelector((state: RootState) => state.mnemonics.mnemonics);
  const [index, setIndex] = useState(1);
  const solkeypairarr = localStorage.getItem('solkeypair');
  const toset = solkeypairarr && solkeypairarr !== 'undefined' ? JSON.parse(solkeypairarr) : [];
  const [storekeypair, setkeypair] = useState<{ privateKey: string; publicKey: string }[]>(toset);

  const handleClick = () => {
    if (!mnemonic) {
      toast('Please set mnemonic first!');
      return;
    }
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${index}'/0'`;
    setIndex((index) => index + 1);
    const derivedSeed = derivePath(path, seed.toString('hex')).key;
    const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);
    const solanakeypair = Keypair.fromSecretKey(keypair.secretKey);
    const publickey = solanakeypair.publicKey.toBase58();
    const privatekey = bs58.encode(solanakeypair.secretKey);

    setkeypair((prevKeypairs) => {
      const updatedKeypairs = [...prevKeypairs, { privateKey:privatekey, publicKey: publickey }];
      localStorage.setItem('solkeypair', JSON.stringify(updatedKeypairs));
      return updatedKeypairs;
    });
  };

  const clearStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied ');
  };

  return (
    <div className='w-full min-h-screen bg-gray-900 text-white flex flex-col items-center mt-2'>
      <h1 className='text-3xl font-bold mb-4'>Solana Wallet Generator</h1>
      <button
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4'
        onClick={handleClick}
      >
        Generate Sol Keypair
      </button>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl'>
        {storekeypair.map((item, index) => (
          <div key={index} className='bg-gray-800 p-6 rounded-lg shadow-lg '>
            <div className='mb-2'>
              <span className='text-gray-400'>Private Key:</span>
              <div
                className='bg-gray-700 p-2 rounded mt-1 cursor-pointer text-center'
                onClick={() => copyToClipboard(item.privateKey)}
              >
                ************
              </div>
            </div>
            <div>
              <span className='text-gray-400'>Public Key:</span>
              <div
                className='bg-gray-700 p-2 rounded mt-1 cursor-pointer text-center'
                onClick={() => copyToClipboard(item.publicKey)}
              >
                {item.publicKey.slice(0, 6)}...{item.publicKey.slice(-6)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-6' onClick={clearStorage}>
        Clear
      </button>
    </div>
  );
};

export default SolWallet;
