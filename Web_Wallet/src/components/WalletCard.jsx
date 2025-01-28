import { useState } from 'react';
import { Download, Copy, Check, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

export function WalletCard({ wallet, index }) {
    const [copying, setCopying] = useState({});
    const [showingPrivateKey, setShowingPrivateKey] = useState(false);

    const copyToClipboard = async (text, type) => {
        await navigator.clipboard.writeText(text);
        setCopying({...copying, [type]: true});
        setTimeout(() => {
            setCopying({...copying, [type]: false});
        }, 2000);
    };

    const downloadWalletInfo = () => {
        const content = `Wallet ${index + 1}\n\n` +
            `Public Key: ${wallet.publicKey.toBase58()}\n` +
            `Private Key: ${wallet.privateKey}\n`;
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `wallet-${index + 1}-keys.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <Card className="bg-neutral-800 border-neutral-700">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Wallet {index + 1}</CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={downloadWalletInfo}
                        title="Download wallet info"
                    >
                        <Download className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-neutral-400">Public Key</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(wallet.publicKey.toBase58(), 'public')}
                        >
                            {copying['public'] ? 
                                <Check className="h-4 w-4 text-green-500" /> : 
                                <Copy className="h-4 w-4" />
                            }
                        </Button>
                    </div>
                    <div className="bg-neutral-900 p-3 rounded-lg">
                        <code className="text-xs text-neutral-300 break-all">
                            {wallet.publicKey.toBase58()}
                        </code>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-neutral-400">Private Key</span>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowingPrivateKey(!showingPrivateKey)}
                            >
                                {showingPrivateKey ? 
                                    <EyeOff className="h-4 w-4" /> : 
                                    <Eye className="h-4 w-4" />
                                }
                            </Button>
                            {showingPrivateKey && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => copyToClipboard(wallet.privateKey, 'private')}
                                >
                                    {copying['private'] ? 
                                        <Check className="h-4 w-4 text-green-500" /> : 
                                        <Copy className="h-4 w-4" />
                                    }
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className="bg-neutral-900 p-3 rounded-lg">
                        <code className="text-xs text-neutral-300 break-all">
                            {showingPrivateKey ? wallet.privateKey : "•".repeat(64)}
                        </code>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 