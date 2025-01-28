import React, { useState } from 'react'
import { generateMnemonic } from 'bip39';
import { EthWallet } from './components/ETHwallet';
import { SolanaWallet } from './components/SolanaWallet';
import { Maximize2, Copy, Check, Wallet as WalletIcon, RefreshCw, Github, Linkedin, Twitter, Home } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { motion } from 'framer-motion';
import { SeedPhrase } from './components/SeedPhrase';

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [showWalletSelect, setShowWalletSelect] = useState(false);

  const generateNewPhrase = () => {
    const mn = generateMnemonic();
    setMnemonic(mn);
  };

  const proceedToWallets = () => {
    if (!mnemonic) {
      generateNewPhrase();
    }
    setShowWalletSelect(true);
  };

  const goHome = () => {
    setMnemonic("");
    setSelectedWallet(null);
    setShowWalletSelect(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={goHome}>
            <h1 className="text-xl font-bold">Wallet Generator</h1>
            <span className="px-2 py-1 text-xs bg-white/10 rounded">v1.3</span>
          </div>
          {(showWalletSelect || selectedWallet) && (
            <Button
              variant="ghost"
              size="icon"
              onClick={goHome}
              className="text-gray-400 hover:text-white"
            >
              <Home className="w-5 h-5" />
            </Button>
          )}
        </div>
      </header>

      <main className="p-6 flex-grow">
        {!showWalletSelect ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[80vh]"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mb-8"
            >
              <WalletIcon className="w-24 h-24 text-purple-500" />
            </motion.div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Create Your Secret Phrase
            </h2>
            <p className="text-gray-400 mb-8 text-center max-w-md">
              This secret phrase is the key to your wallets. Keep it safe and never share it with anyone.
            </p>
            {!mnemonic ? (
              <Button
                size="lg"
                onClick={generateNewPhrase}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Generate Secret Phrase
              </Button>
            ) : (
              <div className="space-y-6 w-full max-w-3xl">
                <SeedPhrase mnemonic={mnemonic} />
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={generateNewPhrase}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Regenerate Phrase
                  </Button>
                  <Button
                    size="lg"
                    onClick={proceedToWallets}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Continue to Wallets
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <SeedPhrase mnemonic={mnemonic} />

            {/* Wallet Selection */}
            {!selectedWallet ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-4"
              >
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button
                    className="w-full h-32 bg-gradient-to-br from-blue-500 to-purple-600"
                    onClick={() => setSelectedWallet('eth')}
                  >
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">Ethereum Wallet</h3>
                      <p className="text-sm opacity-80">Generate ETH wallet</p>
                    </div>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button
                    className="w-full h-32 bg-gradient-to-br from-purple-500 to-pink-600"
                    onClick={() => setSelectedWallet('sol')}
                  >
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">Solana Wallet</h3>
                      <p className="text-sm opacity-80">Generate SOL wallet</p>
                    </div>
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {selectedWallet === 'eth' ? (
                  <EthWallet mnemonic={mnemonic} />
                ) : (
                  <SolanaWallet mnemonic={mnemonic} />
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Developed by Mahendra Kumawat
            </span>
            <span className="text-sm text-gray-400">Full Stack Web3 Builder</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/mk016"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mahendra-kumawat-59911a253/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/Mk__0168"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
