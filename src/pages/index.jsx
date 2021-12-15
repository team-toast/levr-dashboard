import Layout from "../components/Layout";

export default function Home({ ethPrice }) {
  return (
    <Layout>
      <h1>LEVR Curve Sale</h1>
      <h2>LEVR Curve Sale</h2>
      <div>
        <button>Button</button>
        <button className="green border-radius-0-10">Button</button>
        <button className="red border-radius-0-10">Button</button>
      </div>
      <div>
        <p>
          <strong>This</strong> is a <strong>Strong</strong> element
        </p>
        <button className="action">Button</button>
      </div>
      <div>
        <button className="action">Button</button>
      </div>
      <div>
        <p>
          Since the cost raises with each transaction, the faster you buy, the
          more LEVR you will get for the ETH you spend! Since the cost raises
          with each transaction, the faster you buy, the more LEVR you will get
          for the ETH you spend! Since the cost raises with each transaction,
          the faster you buy, the more LEVR you will get for the ETH you spend!
        </p>
        <p>
          Since the cost raises with each transaction, the faster you buy, the
          more LEVR you will get for the ETH you spend! Since the cost raises
          with each transaction, the faster you buy, the more LEVR you will get
          for the ETH you spend! Since the cost raises with each transaction,
          the faster you buy, the more LEVR you will get for the{" "}
          <a href="https://levr.ly" rel="noreferrer">
            ETH you spend
          </a>
          !
        </p>
      </div>
      <div className="flex">
        <input type="text" />
        <button className="blue border-radius-0-10">Button</button>
      </div>
      <br />
      <div className="flex">
        <div className="bg-red">RED</div>
        <div className="bg-blue">BLUE</div>
        <div className="bg-green">GREEN</div>
        <div className="bg-dark-blue">BLUE</div>
        <div className="bg-yellow">YELLOW</div>
        <div className="bg-darkest-blue">darkest-blue</div>
      </div>
    </Layout>
  );
}
