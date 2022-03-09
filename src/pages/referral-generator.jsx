import Layout from "../components/Layout";
import Header from "../components/Header";
export default function GenerateReferral({}) {
    return (
        <Layout>
            <Header noWeb3={true} />
            <div className="content max-width-450">
                <h1>Generate Referral Link</h1>
                <p>Get 5% LEVR bonus if someone uses your link.</p>
                <input
                    value={null}
                    onChange={() => {}}
                    type="text"
                    placeholder="Enter your wallet address"
                />
                <div className="flex position-relative">
                    <button onClick={() => {}} className={"b-r-0-10-10-0"}>
                        Generate Referral Link
                    </button>
                </div>
            </div>
        </Layout>
    );
}
