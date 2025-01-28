import { useState } from 'react'
import { generateMnemonic } from 'bip39';
import { EthWallet } from './components/ETHwallet';
import { SolanaWallet } from './components/SolanaWallet';
import { Maximize2, Copy, Check } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [copying, setCopying] = useState(false);

  const copyMnemonic = async () => {
    await navigator.clipboard.writeText(mnemonic);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">Wallet Generator</h1>
            <span className="px-2 py-1 text-xs bg-white/10 rounded">v1.3</span>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Secret Phrase */}
        <Card className="bg-neutral-900 border-neutral-800 mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Secret Phrase</CardTitle>
            <Button variant="ghost" size="icon">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {mnemonic.split(" ").map((word, index) => (
                <div
                  key={index}
                  className="bg-neutral-800 p-3 rounded-lg text-sm text-neutral-300"
                >
                  {word || "\u00A0"}
                </div>
              ))}
            </div>
            <Button 
              variant="ghost" 
              className="mt-4 text-neutral-500 hover:text-neutral-400"
              onClick={copyMnemonic}
            >
              {copying ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              Click Anywhere To Copy
            </Button>
          </CardContent>
        </Card>

        {/* Wallets */}
        <div className="space-y-8">
          {/* Solana Wallet */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Solana Wallet</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="secondary"
                    onClick={() => {
                      const mn = generateMnemonic();
                      setMnemonic(mn);
                    }}
                  >
                    Add Wallet
                  </Button>
                  <Button variant="destructive">
                    Clear Wallets
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <SolanaWallet mnemonic={mnemonic} />
            </CardContent>
          </Card>

          {/* Ethereum Wallet */}
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Ethereum Wallet</CardTitle>
                <div className="flex gap-2">
                  <Button variant="secondary">Add Wallet</Button>
                  <Button variant="destructive">Clear Wallets</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <EthWallet mnemonic={mnemonic} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default App
