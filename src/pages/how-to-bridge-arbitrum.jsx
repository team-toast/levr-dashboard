import Layout from "../components/Layout";
import Header from "../components/Header";
export default function BridgeArbitrum({}) {
  return (
    <Layout>
      <Header noWeb3={true} />
      <div className="content max-width-450">
        <h1>How to Bridge Arbitrum</h1>
        <h2>1. Ethereum Balance</h2>
        <p>You must have Ethereum in your crypto wallet.</p>
        <h2>2. Bridge Arbitrum</h2>
        <p>
          Visit <a href="https://bridge.arbitrum.io/">Arbitrum Bridge</a> and
          follow the easy instructions that help bridge your ETH from Layer 1
          Ethereum to Layer 2 Arbitrum.
        </p>
        <h2>3. Switch</h2>
        <p>
          Once your Bridge is complete, connect your wallet with{" "}
          <strong>levr.ly</strong>
        </p>
      </div>
    </Layout>
  );
}
