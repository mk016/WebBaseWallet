import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { FiCopy, FiCheck } from "react-icons/fi";

export const EthWallet = ({mnemonic, theme}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [copying, setCopying] = useState({});

    const copyToClipboard = async (address) => {
        await navigator.clipboard.writeText(address);
        setCopying({...copying, [address]: true});
        setTimeout(() => {
            setCopying({...copying, [address]: false});
        }, 2000);
    };

    return (
        <div className="space-y-4">
            <button
                onClick={async function() {
                    const seed = await mnemonicToSeed(mnemonic);
                    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
                    const hdNode = HDNodeWallet.fromSeed(seed);
                    const child = hdNode.derivePath(derivationPath);
                    const privateKey = child.privateKey;
                    const wallet = new Wallet(privateKey);
                    setCurrentIndex(currentIndex + 1);
                    setAddresses([...addresses, wallet.address]);
                }}
                className={`w-full py-2 px-4 rounded-lg font-medium
                    ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}
                    text-white transform hover:scale-[1.02] transition-all duration-200
                    active:scale-[0.98] shadow-md hover:shadow-lg`}
            >
                Generate ETH Address
            </button>

            <div className="space-y-2">
                {addresses.map((address, index) => (
                    <div key={address} 
                        className={`flex items-center justify-between p-3 rounded-lg
                        ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}
                        transition-all duration-200`}
                    >
                        <span className="font-mono text-sm truncate">
                            {address.slice(0, 6)}...{address.slice(-4)}
                        </span>
                        <button
                            onClick={() => copyToClipboard(address)}
                            className={`p-2 rounded-full hover:bg-gray-700/20 transition-all duration-200`}
                        >
                            {copying[address] ? 
                                <FiCheck className="text-green-500" /> : 
                                <FiCopy className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                            }
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}