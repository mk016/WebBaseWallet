import { useState } from 'react';
import { Download, Copy, Check, Eye, EyeOff, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

export function WalletCard({ wallet, index, onDelete, type = 'sol' }) {
    const [copying, setCopying] = useState({});
    const [showingPrivateKey, setShowingPrivateKey] = useState(false);

    const copyToClipboard = async (text, id) => {
        await navigator.clipboard.writeText(text);
        setCopying({...copying, [id]: true});
        setTimeout(() => {
            setCopying({...copying, [id]: false});
        }, 2000);
    };

    const downloadWalletInfo = () => {
        const content = `Wallet ${index + 1}\n\n` +
            `Public Key: ${wallet.publicKey}\n` +
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
                    <CardTitle>{wallet.name}</CardTitle>
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={downloadWalletInfo}
                            title="Download wallet info"
                            className="text-neutral-400 hover:text-neutral-300"
                        >
                            <Download className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(index)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Public Key */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-neutral-400">Public Key</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(wallet.publicKey, `pub-${index}`)}
                        >
                            {copying[`pub-${index}`] ? 
                                <Check className="h-4 w-4 text-green-500" /> : 
                                <Copy className="h-4 w-4" />
                            }
                        </Button>
                    </div>
                    <div className="bg-neutral-900 p-3 rounded-lg">
                        <code className="text-xs text-neutral-300 break-all">
                            {wallet.publicKey}
                        </code>
                    </div>
                </div>

                {/* Private Key */}
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
                                    onClick={() => copyToClipboard(wallet.privateKey, `priv-${index}`)}
                                >
                                    {copying[`priv-${index}`] ? 
                                        <Check className="h-4 w-4 text-green-500" /> : 
                                        <Copy className="h-4 w-4" />
                                    }
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className="bg-neutral-900 p-3 rounded-lg">
                        <code className="text-xs text-neutral-300 break-all">
                            {showingPrivateKey ? 
                                wallet.privateKey : 
                                "•".repeat(64)
                            }
                        </code>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 