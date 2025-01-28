import { useState } from "react"
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { WalletCard } from './WalletCard';
import { FiDownload } from "react-icons/fi";

export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wallets, setWallets] = useState([]);

    const generateWallet = () => {
        mnemonicToSeed(mnemonic).then(seed => {
            try {
                const path = `m/44'/501'/${currentIndex}'/0'`;
                const derivedSeed = derivePath(path, Buffer.from(seed).toString('hex')).key;
                const keypair = Keypair.fromSeed(derivedSeed.slice(0, 32));
                setCurrentIndex(currentIndex + 1);
                setWallets([...wallets, {
                    publicKey: keypair.publicKey,
                    privateKey: Buffer.from(keypair.secretKey).toString('hex')
                }]);
            } catch (error) {
                console.error('Failed to generate Solana wallet:', error);
            }
        }).catch(error => {
            console.error('Failed to generate seed:', error);
        });
    };

    const downloadAllKeys = () => {
        const content = wallets.map((wallet, index) => 
            `Wallet ${index + 1}\nPublic Key: ${wallet.publicKey.toBase58()}\nPrivate Key: ${wallet.privateKey}\n\n`
        ).join('');
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'all-solana-wallets.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-4">
            {wallets.length > 0 && (
                <button
                    onClick={downloadAllKeys}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <FiDownload /> Download All Keys
                </button>
            )}
            
            <div className="grid gap-4">
                {wallets.map((wallet, index) => (
                    <WalletCard 
                        key={wallet.publicKey.toBase58()}
                        wallet={wallet}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}