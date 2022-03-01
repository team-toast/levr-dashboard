import Layout from "../components/Layout";
import Header from "../components/Header";
export default function TermsAndConditions({}) {
    return (
        <Layout>
            <Header noWeb3={true} />
            <div className="content">
                <h1>Terms and Conditions</h1>
                <p>
                    {" "}
                    <strong>Version 1.0, last edited 28 Feb 2022</strong>
                </p>
                <p>
                    <ul data-indent-level="1">
                        <li>
                            <p data-renderer-start-pos="50">
                                I am an adult, over the age of 18, capable of
                                making my own decisions, evaluating my own risks
                                and engaging with others for mutual benefit.
                            </p>
                        </li>
                        <li>
                            <p data-renderer-start-pos="194">
                                levr.ly and/or LEVR are extremely experimental
                                and could enter into several failure modes.
                            </p>
                        </li>
                        <li>
                            <p data-renderer-start-pos="289">
                                levr.ly and/or LEVR could fail technically
                                through a software vulnerability.
                            </p>
                        </li>
                        <li>
                            <p data-renderer-start-pos="369">
                                While levr.ly and/or LEVR have been thoroughly
                                tested, bugs may have nonetheless snuck through.
                            </p>
                        </li>
                        <li>
                            <p data-renderer-start-pos="469">
                                levr.ly and/or LEVR could fail due to an
                                economic attack, the details of which might not
                                even be suspected at the time of launch.
                            </p>
                        </li>
                        <li>
                            <p data-renderer-start-pos="603">
                                The projects that levr.ly fund may turn out to
                                be flawed technically or have economic attack
                                vectors that make them infeasible.
                            </p>
                        </li>
                        <li>
                            <p data-renderer-start-pos="736">
                                LEVR, and the projects funded by levr.ly, might
                                never find profitable returns.
                            </p>
                        </li>
                        <li>
                            <p data-renderer-start-pos="819">
                                I will not hold the creators of this autonomous
                                code liable for damages or losses. Even if I
                                did, they will be unlikely to have the resources
                                to settle.
                            </p>
                        </li>
                        <li>
                            <p data-renderer-start-pos="977">
                                ETH deposited on the levr.ly interface will be
                                held in a variety of smart contracts, which no
                                one has direct control over, but may also be
                                technically flawed.
                            </p>
                        </li>
                        <li>
                            <p data-renderer-start-pos="1140">
                                I agree levr.ly may track anonymized data about
                                my interactions with the sale.
                            </p>
                        </li>
                        <li>
                            <p data-renderer-start-pos="1223">
                                Entering ETH into the sale is irrevocable,
                                therefore, I will have to sell my LEVR into
                                whatever is on offer on the secondary market at
                                that time.
                            </p>
                        </li>
                        <li>
                            <p data-renderer-start-pos="1372">
                                US citizens and residents are strictly
                                prohibited from this sale.
                            </p>
                        </li>
                        <li>
                            <p data-renderer-start-pos="1442">
                                I am not a citizen or resident of the&nbsp;USA.
                            </p>
                        </li>
                    </ul>
                </p>
            </div>
        </Layout>
    );
}
