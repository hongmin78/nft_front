import React, { useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import styled from 'styled-components';

const App = () => {
  const [account, setAccount] = useState('');
  const [to, setTo] = useState('');
  const [tokenURI, setTokenURI] = useState('');
  const [message, setMessage] = useState('');

  const web3 = new Web3(Web3.givenProvider);

  const connectWallet = async () => {
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);
  };

  const mintNFT = async () => {
    try {
      const response = await axios.post('http://localhost:3000/mint', {
        to,
        tokenURI,
      });
      setMessage(`Success! Transaction hash: ${response.data.transactionHash}`);
    } catch (error) {
      setMessage(`Error: ${error.toString()}`);
    }
  };

  return (
    <AppContainer>
      <VideoBackground autoPlay loop muted>
        <source src="/background.mp4" type="video/mp4" />
      </VideoBackground>
      <Content>
        <ConnectButton onClick={connectWallet}>Connect Wallet</ConnectButton>
        <p>Connected account: {account}</p>
        <InputContainer>
          <input
            type="text"
            placeholder="Recipient address"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Token URI"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)}
          />
          <MintButton onClick={mintNFT}>Mint NFT</MintButton>
        </InputContainer>
        <p>{message}</p>
      </Content>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
`;

const ConnectButton = styled.button`
  background-color: #1e90ff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 16px;
  border-radius: 5px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  input {
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
  }
`;

const MintButton = styled.button`
  background-color: #32cd32;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
`;

export default App;

