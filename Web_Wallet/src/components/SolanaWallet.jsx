import { useState } from "react"
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Copy, Check, Eye, EyeOff, Trash2 } from "lucide-react";
import { WalletCard } from "./WalletCard";

export function SolanaWallet({ mnemonic }) {
    const [wallets, setWallets] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [copying, setCopying] = useState({});
    const [showingPrivateKey, setShowingPrivateKey] = useState({});

    const generateWallet = () => {
        try {
            const seed = Buffer.from(mnemonicToSeedSync(mnemonic));
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString('hex')).key;
            const keypair = Keypair.fromSeed(Uint8Array.from(derivedSeed.slice(0, 32)));
            
            const newWallet = {
                publicKey: keypair.publicKey.toBase58(),
                privateKey: Buffer.from(keypair.secretKey).toString('hex'),
                name: `Wallet ${currentIndex + 1}`
            };

            setWallets([...wallets, newWallet]);
            setCurrentIndex(currentIndex + 1);
        } catch (error) {
            console.error('Failed to generate wallet:', error);
        }
    };

    const copyToClipboard = async (text, id) => {
        await navigator.clipboard.writeText(text);
        setCopying({...copying, [id]: true});
        setTimeout(() => {
            setCopying({...copying, [id]: false});
        }, 2000);
    };

    const deleteWallet = (index) => {
        setWallets(wallets.filter((_, i) => i !== index));
    };

    const togglePrivateKey = (index) => {
        setShowingPrivateKey(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Button
                    onClick={generateWallet}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
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
                        type="sol"
                        onDelete={() => {
                            setWallets(wallets.filter((_, i) => i !== index));
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
}