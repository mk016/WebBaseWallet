import { useState } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { WalletCard } from './WalletCard';
import { Trash2 } from "lucide-react";

export function EthWallet({ mnemonic }) {
    const [wallets, setWallets] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const generateWallet = () => {
        try {
            const path = `m/44'/60'/0'/0/${currentIndex}`;
            const wallet = ethers.Wallet.fromPhrase(mnemonic, path);
            
            const newWallet = {
                publicKey: wallet.address,
                privateKey: wallet.privateKey,
                name: `Wallet ${currentIndex + 1}`
            };

            setWallets([...wallets, newWallet]);
            setCurrentIndex(currentIndex + 1);
        } catch (error) {
            console.error('Failed to generate ETH wallet:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Button
                    onClick={generateWallet}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                    Generate New Wallet
                </Button>
                {wallets.length > 0 && (
                    <Button
                        variant="destructive"
                        onClick={() => setWallets([])}
                    >
                        Clear All
                    </Button>
                )}
            </div>

            <motion.div 
                layout 
                className="grid gap-6"
            >
                {wallets.map((wallet, index) => (
                    <WalletCard 
                        key={wallet.publicKey}
                        wallet={wallet}
                        index={index}
                        type="eth"
                        onDelete={() => {
                            setWallets(wallets.filter((_, i) => i !== index));
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
}