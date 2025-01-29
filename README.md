# Crypto Wallet Generator

A modern, secure web application for generating Ethereum and Solana wallets with seed phrase management.

![Wallet Generator Screenshot](ss.png)

## Features

- 🔐 Secure seed phrase generation
- 💼 Multiple wallet generation (ETH & SOL)
- 🎨 Modern, responsive UI with animations
- 🔄 Copy/Download functionality
- 👁️ Private key visibility toggle
- 🏠 Easy navigation with home button
- 📱 Mobile-friendly design

## Tech Stack

- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS + ShadcnUI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Crypto Libraries**:
  - Ethereum: ethers.js
  - Solana: @solana/web3.js
  - BIP39 for mnemonic generation
  - ED25519 for Solana key derivation

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mk016/WebBaseWallet.git
cd Web_wallet
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage

1. **Generate Seed Phrase**
   - Click "Generate Secret Phrase"
   - Save your seed phrase securely
   - Option to regenerate if needed

2. **Create Wallets**
   - Choose between Ethereum or Solana
   - Generate multiple wallets from same seed
   - View public and private keys
   - Copy or download wallet information

3. **Security Features**
   - Private key masking
   - Client-side only operations
   - No data storage
   - Secure key derivation

## Security Considerations

- Never share your seed phrase or private keys
- Store backup information securely
- Use only on trusted devices
- Consider using hardware wallets for large amounts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Developer

**Mahendra Kumawat**
- GitHub: [@mk016](https://github.com/mk016)
- LinkedIn: [Mahendra Kumawat](https://www.linkedin.com/in/mahendra-kumawat-59911a253/)
- Twitter: [@Mk__0168](https://x.com/Mk__0168)

## Acknowledgments

- [ShadcnUI](https://ui.shadcn.com/) for UI components
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Ethereum](https://ethereum.org/) and [Solana](https://solana.com/) documentation
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Support

For support, email [Mahendrakumawat80224@gmail.com] or raise an issue in the repository.

## Roadmap

- [ ] Add more blockchain networks
- [ ] Implement wallet import functionality
- [ ] Add transaction simulation
- [ ] Enhanced security features
- [ ] Dark/Light theme toggle

---

Made with ❤️ by Mahendra Kumawat
