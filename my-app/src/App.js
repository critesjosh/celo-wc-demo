import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import { WalletConnectWallet } from '@celo/wallet-walletconnect'
import WalletConnectClient from "@walletconnect/client"
import { CLIENT_EVENTS } from "@walletconnect/client"
import QRCode from 'qrcode.react'

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      uri: ""
    }
  }

  componentDidMount(){
    this.connect()
  }

  async connect() {

    const wallet = new WalletConnectWallet({
      connect: {
        metadata: {
          name: 'The name of your awesome DApp',
          description: 'Your DApp description',
          url: 'https://example.com',
          icons: ['https://example.com/favicon.ico'],
        },
      },
    })

    const uri = await wallet.getUri()

    this.setState({
      uri: uri
    })

    console.log(uri)

    wallet.init()

    // const client = await WalletConnectClient.init({
    //   relayProvider: "wss://walletconnect.celo-networks-dev.org",
    //   metadata: {
    //     name: "Example Dapp",
    //     description: "Example Dapp",
    //     url: "#",
    //     icons: ["https://walletconnect.org/walletconnect-logo.png"],
    //   },
    // });

    // client.on(
    //   CLIENT_EVENTS.pairing.proposal,
    //   async (proposal) => {
    //     // uri should be shared with the Wallet either through QR Code scanning or mobile deep linking
    //     const { uri } = proposal.signal.params;
    //     this.setState({
    //       uri: uri
    //     })
    //     console.log(uri)
    //   }
    // );
  
    // const session = await client.connect({
    //   permissions: {
    //     blockchain: {
    //       chains: ["eip155:1", 42220],
    //     },
    //     jsonrpc: {
    //       methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
    //     },
    //   },
    // });
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <QRCode value={this.state.uri} size="200" />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
