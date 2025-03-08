import { useState } from 'react';
import { HDNodeWallet, Wallet } from 'ethers';
import { mnemonicToSeedSync } from 'bip39';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import toast from 'react-hot-toast';

const EthWallet = () => {
  const mnemonic = useSelector((state: RootState) => state.mnemonics.mnemonics);
  const [index, setIndex] = useState(1);
  const solkeypairarr = localStorage.getItem('ethkeypair');
  const toset = solkeypairarr && solkeypairarr !== 'undefined' ? JSON.parse(solkeypairarr) : [];
  const [storekeypair, setkeypair] = useState<{ privateKey: string; publicKey: string }[]>(toset);

  const handleClick = () => {
    if (!mnemonic) {
      alert('Please set mnemonic first!');
      return;
    }
    const seed = mnemonicToSeedSync(mnemonic);
    setIndex((index) => index + 1);
    const hdNode = HDNodeWallet.fromSeed(seed);
    const path = `m/44'/60'/${index}'`;
    const child = hdNode.derivePath(path);
    const privatekey = child.privateKey;
    const wallet = new Wallet(privatekey);
    const publickey = wallet.address;
    setkeypair((storekeypair) => {
      const newpairs = [...storekeypair, { privateKey: privatekey, publicKey: publickey }];
      localStorage.setItem('ethkeypair', JSON.stringify(newpairs));
      return newpairs;
    });
  };

  const clearStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("copied");
  };

  return (
    <div className='w-full     text-white flex flex-col items-center  '>
      <h1 className='text-3xl font-bold mb-4'>Ethereum Wallet Generator</h1>
      <button
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4'
        onClick={handleClick}
      >
        Generate Eth Keypair
      </button>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-lvw'>
        {storekeypair.map((item, index) => (
          <div key={index} className='bg-gray-800 p-6 rounded-lg shadow-lg'>
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

export default EthWallet;