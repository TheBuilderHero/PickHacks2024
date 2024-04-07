import group from "./pictures/group.jpg";

function AboutUs() {
    return (
        <>
            <div>
                <h1 className="l_title">About Us</h1>
            </div>
            <img src={group} alt="groupPhoto" className="siteLogo" style={{display: "block", margin: "auto"}}/>
            <h1 style={{color: "white", textAlign: "center"}}>Team Members</h1>
            <body style={{color: "white", textAlign: "center", paddingLeft: 200, paddingRight: 200}}>
            Rohan Keenoy<br/>
            Dakota Stevens<br/>
            David Pham<br/>
            Christopher Angus<br/>
            <br/>
            "For PickHacks 2024, our team set out to develop a privacy policy analyzer as a Google
            Chrome Extension. We sourced a dataset of privacy policies from various popular websites,
            carefully annotated to assess compliance with data privacy regulations. To enhance our analysis,
            we refined Google's natural language processing program, BERT, to detect any potential sale of user
            data within these policies. We then created a user-friendly web-scraping Google Chrome extension
            named Privacy Peekaboo, specifically tailored to extract privacy policies from websites. This data was
            seamlessly stored in MongoDB, enabling BERT to efficiently process policies and identify any instances
            of user data commercialization by associated companies. Upon completion of our analysis, we presented
            the findings on our website, "privacypeekaboo.com", aiming to promote awareness of privacy issues
            online."
            </body>
            <br/>
        </>

    );

}

export default AboutUs;
