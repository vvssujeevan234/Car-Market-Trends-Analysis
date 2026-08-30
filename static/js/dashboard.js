/* =========================================
   GET FLASK DATA
========================================= */

const dashboardDataElement =
    document.getElementById(
        "dashboard-data"
    );


const dashboardData =
    JSON.parse(
        dashboardDataElement.textContent
    );



/* =========================================
   BUTTON AND CHART SECTION
========================================= */

const showChartsBtn =
    document.getElementById(
        "showChartsBtn"
    );


const chartsSection =
    document.getElementById(
        "chartsSection"
    );



/* =========================================
   CHART STATUS
========================================= */

let chartsCreated = false;



/* =========================================
   SHOW CHARTS BUTTON
========================================= */

showChartsBtn.addEventListener(
    "click",
    function () {


        /* SHOW CHART SECTION */

        chartsSection.classList.add(
            "show"
        );


        /* CREATE CHARTS ONLY ONCE */

        if (!chartsCreated) {

            createCharts();

            chartsCreated = true;
        }


        /* CHANGE BUTTON TEXT */

        showChartsBtn.innerHTML =

            '<i class="fa-solid fa-chart-line"></i> ANALYTICS LOADED';


        showChartsBtn.style.cursor =
            "default";


        /* SCROLL TO CHARTS */

        setTimeout(
            function () {

                chartsSection.scrollIntoView(
                    {

                        behavior:
                            "smooth",

                        block:
                            "start"

                    }
                );

            },
            200
        );

    }
);



/* =========================================
   CREATE ALL CHARTS
========================================= */

function createCharts() {


    /* =====================================
       FUEL TYPE DOUGHNUT CHART
    ===================================== */

    const fuelCanvas =
        document.getElementById(
            "fuelChart"
        );


    new Chart(
        fuelCanvas,
        {

            type:
                "doughnut",

            data:
                {

                    labels:
                        dashboardData.fuelLabels,

                    datasets:
                        [
                            {

                                label:
                                    "Fuel Type",

                                data:
                                    dashboardData.fuelValues,

                                backgroundColor:
                                    [
                                        "#38bdf8",
                                        "#22c55e",
                                        "#f59e0b",
                                        "#a855f7",
                                        "#ef4444"
                                    ],

                                borderColor:
                                    "#0f172a",

                                borderWidth:
                                    3,

                                hoverOffset:
                                    12
                            }
                        ]
                },

            options:
                {

                    responsive:
                        true,

                    maintainAspectRatio:
                        false,

                    plugins:
                        {

                            legend:
                                {

                                    position:
                                        "bottom",

                                    labels:
                                        {

                                            color:
                                                "#cbd5e1",

                                            padding:
                                                20,

                                            font:
                                                {

                                                    size:
                                                        13
                                                }
                                        }
                                }
                        }
                }
        }
    );



    /* =====================================
       TRANSMISSION PIE CHART
    ===================================== */

    const transmissionCanvas =
        document.getElementById(
            "transmissionChart"
        );


    new Chart(
        transmissionCanvas,
        {

            type:
                "pie",

            data:
                {

                    labels:
                        dashboardData.transmissionLabels,

                    datasets:
                        [
                            {

                                label:
                                    "Transmission",

                                data:
                                    dashboardData.transmissionValues,

                                backgroundColor:
                                    [
                                        "#38bdf8",
                                        "#22c55e"
                                    ],

                                borderColor:
                                    "#0f172a",

                                borderWidth:
                                    3,

                                hoverOffset:
                                    12
                            }
                        ]
                },

            options:
                {

                    responsive:
                        true,

                    maintainAspectRatio:
                        false,

                    plugins:
                        {

                            legend:
                                {

                                    position:
                                        "bottom",

                                    labels:
                                        {

                                            color:
                                                "#cbd5e1",

                                            padding:
                                                20
                                        }
                                }
                        }
                }
        }
    );



    /* =====================================
       VEHICLES BY YEAR BAR CHART
    ===================================== */

    const yearCanvas =
        document.getElementById(
            "yearChart"
        );


    new Chart(
        yearCanvas,
        {

            type:
                "bar",

            data:
                {

                    labels:
                        dashboardData.yearLabels,

                    datasets:
                        [
                            {

                                label:
                                    "Vehicles",

                                data:
                                    dashboardData.yearValues,

                                backgroundColor:
                                    "#38bdf8",

                                borderRadius:
                                    7
                            }
                        ]
                },

            options:
                {

                    responsive:
                        true,

                    maintainAspectRatio:
                        false,

                    scales:
                        {

                            x:
                                {

                                    ticks:
                                        {

                                            color:
                                                "#94a3b8"
                                        },

                                    grid:
                                        {

                                            display:
                                                false
                                        }
                                },

                            y:
                                {

                                    beginAtZero:
                                        true,

                                    ticks:
                                        {

                                            color:
                                                "#94a3b8"
                                        },

                                    grid:
                                        {

                                            color:
                                                "rgba(148, 163, 184, 0.1)"
                                        }
                                }
                        },

                    plugins:
                        {

                            legend:
                                {

                                    labels:
                                        {

                                            color:
                                                "#cbd5e1"
                                        }
                                }
                        }
                }
        }
    );



    /* =====================================
       TOP VEHICLES BY SELLING PRICE
    ===================================== */

    const topVehicleCanvas =
        document.getElementById(
            "topVehicleChart"
        );


    new Chart(
        topVehicleCanvas,
        {

            type:
                "bar",

            data:
                {

                    labels:
                        dashboardData.topVehicleLabels,

                    datasets:
                        [
                            {

                                label:
                                    "Selling Price",

                                data:
                                    dashboardData.topVehicleValues,

                                backgroundColor:
                                    "#22c55e",

                                borderRadius:
                                    7
                            }
                        ]
                },

            options:
                {

                    indexAxis:
                        "y",

                    responsive:
                        true,

                    maintainAspectRatio:
                        false,

                    scales:
                        {

                            x:
                                {

                                    beginAtZero:
                                        true,

                                    ticks:
                                        {

                                            color:
                                                "#94a3b8"
                                        },

                                    grid:
                                        {

                                            color:
                                                "rgba(148, 163, 184, 0.1)"
                                        }
                                },

                            y:
                                {

                                    ticks:
                                        {

                                            color:
                                                "#94a3b8"
                                        },

                                    grid:
                                        {

                                            display:
                                                false
                                        }
                                }
                        },

                    plugins:
                        {

                            legend:
                                {

                                    labels:
                                        {

                                            color:
                                                "#cbd5e1"
                                        }
                                }
                        }
                }
        }
    );

}



/* =========================================
   AI ROBOT ASSISTANT
========================================= */

const aiRobotButton =
    document.getElementById(
        "aiRobotButton"
    );


const aiChatbot =
    document.getElementById(
        "aiChatbot"
    );


const closeChat =
    document.getElementById(
        "closeChat"
    );


const chatInput =
    document.getElementById(
        "chatInput"
    );


const sendMessage =
    document.getElementById(
        "sendMessage"
    );


const chatMessages =
    document.getElementById(
        "chatMessages"
    );



/* =========================================
   OPEN AI CHATBOT
========================================= */

aiRobotButton.addEventListener(
    "click",
    function () {


        aiChatbot.classList.toggle(
            "show"
        );


        /* FOCUS INPUT WHEN OPEN */

        if (
            aiChatbot.classList.contains(
                "show"
            )
        ) {

            setTimeout(
                function () {

                    chatInput.focus();

                },
                300
            );

        }

    }
);



/* =========================================
   CLOSE AI CHATBOT
========================================= */

closeChat.addEventListener(
    "click",
    function () {

        aiChatbot.classList.remove(
            "show"
        );

    }
);



/* =========================================
   SEND MESSAGE BUTTON
========================================= */

sendMessage.addEventListener(
    "click",
    function () {

        sendChatMessage();

    }
);



/* =========================================
   ENTER KEY TO SEND
========================================= */

chatInput.addEventListener(
    "keydown",
    function (
        event
    ) {

        if (
            event.key ===
            "Enter"
        ) {

            sendChatMessage();

        }

    }
);



/* =========================================
   SEND CHAT MESSAGE
========================================= */

function sendChatMessage() {


    const userText =
        chatInput.value.trim();


    /* DON'T SEND EMPTY MESSAGE */

    if (
        userText ===
        ""
    ) {

        return;

    }



    /* ADD USER MESSAGE */

    addMessage(
        userText,
        "user-message"
    );



    /* CLEAR INPUT */

    chatInput.value =
        "";



    /* GET BOT RESPONSE */

    setTimeout(
        function () {

            const botResponse =
                getBotResponse(
                    userText
                );


            addMessage(
                botResponse,
                "bot-message"
            );

        },
        500
    );

}



/* =========================================
   ADD MESSAGE TO CHAT
========================================= */

function addMessage(
    message,
    className
) {


    const messageElement =
        document.createElement(
            "div"
        );


    messageElement.className =
        className;


    messageElement.innerHTML =
        message;


    chatMessages.appendChild(
        messageElement
    );



    /* AUTO SCROLL */

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}



/* =========================================
   AI PROJECT KNOWLEDGE BASE
========================================= */

function getBotResponse(
    userMessage
) {


    const message =
        userMessage.toLowerCase();



    /* =====================================
       GREETINGS
    ===================================== */

    if (
        message.includes(
            "hello"
        ) ||
        message.includes(
            "hi"
        ) ||
        message.includes(
            "hey"
        )
    ) {

        return `
            👋 Hello! How can I help you with the
            <b>Car Market Trends Analysis</b> project?
        `;

    }



    /* =====================================
       PROJECT
    ===================================== */

    if (
        message.includes(
            "project"
        ) ||
        message.includes(
            "about"
        )
    ) {

        return `
            🚗 This project analyzes car market data
            using the <b>CarDekho dataset</b>.

            <br><br>

            The system studies:

            <br>

            • Vehicle selling prices<br>
            • Fuel types<br>
            • Transmission types<br>
            • Manufacturing year<br>
            • Vehicle depreciation<br>
            • Market trends

            <br><br>

            The project uses <b>Python, Flask,
            Pandas and Chart.js</b>.
        `;

    }



    /* =====================================
       DATASET
    ===================================== */

    if (
        message.includes(
            "dataset"
        ) ||
        message.includes(
            "cardekho"
        ) ||
        message.includes(
            "data"
        )
    ) {

        return `
            📊 The project uses the
            <b>CarDekho vehicle dataset</b>.

            <br><br>

            The dataset contains information such as:

            <br>

            • Car Name<br>
            • Manufacturing Year<br>
            • Selling Price<br>
            • Present Price<br>
            • Kilometers Driven<br>
            • Fuel Type<br>
            • Seller Type<br>
            • Transmission<br>
            • Number of Owners
        `;

    }



    /* =====================================
       FUEL TYPE
    ===================================== */

    if (
        message.includes(
            "fuel"
        ) ||
        message.includes(
            "petrol"
        ) ||
        message.includes(
            "diesel"
        ) ||
        message.includes(
            "cng"
        )
    ) {

        return `
            ⛽ The dashboard analyzes different
            vehicle fuel types such as:

            <br><br>

            • Petrol<br>
            • Diesel<br>
            • CNG

            <br><br>

            The Fuel Type Analysis chart shows
            how vehicles are distributed across
            these fuel categories.
        `;

    }



    /* =====================================
       TRANSMISSION
    ===================================== */

    if (
        message.includes(
            "transmission"
        ) ||
        message.includes(
            "automatic"
        ) ||
        message.includes(
            "manual"
        )
    ) {

        return `
            ⚙️ The project compares:

            <br><br>

            • Manual Vehicles<br>
            • Automatic Vehicles

            <br><br>

            The dashboard displays their
            distribution using an interactive
            pie chart.
        `;

    }



    /* =====================================
       PRICE
    ===================================== */

    if (
        message.includes(
            "price"
        ) ||
        message.includes(
            "selling"
        ) ||
        message.includes(
            "cost"
        )
    ) {

        return `
            💰 Vehicle prices are one of the
            major components of this project.

            <br><br>

            The system analyzes:

            <br>

            • Selling Price<br>
            • Present Price<br>
            • Price Difference<br>
            • Vehicle Value Retention<br>
            • Depreciation

            <br><br>

            The dashboard also displays
            top vehicles based on selling price.
        `;

    }



    /* =====================================
       DEPRECIATION
    ===================================== */

    if (
        message.includes(
            "depreciation"
        ) ||
        message.includes(
            "decrease"
        ) ||
        message.includes(
            "value loss"
        )
    ) {

        return `
            📉 Vehicle depreciation represents
            the reduction in a vehicle's value
            over time.

            <br><br>

            It can be calculated approximately as:

            <br><br>

            <b>
            Depreciation =
            Present Price − Selling Price
            </b>

            <br><br>

            Factors such as vehicle age,
            kilometers driven, brand,
            condition and transmission can
            influence depreciation.
        `;

    }



    /* =====================================
       YEAR
    ===================================== */

    if (
        message.includes(
            "year"
        ) ||
        message.includes(
            "manufacturing"
        ) ||
        message.includes(
            "old"
        ) ||
        message.includes(
            "new"
        )
    ) {

        return `
            📅 The dashboard includes a
            <b>Vehicles By Year</b> chart.

            <br><br>

            It shows how many vehicles in
            the dataset belong to each
            manufacturing year.

            <br><br>

            This helps analyze market trends
            and vehicle age distribution.
        `;

    }



    /* =====================================
       PYTHON
    ===================================== */

    if (
        message.includes(
            "python"
        )
    ) {

        return `
            🐍 Python is used for data
            processing and backend logic.

            <br><br>

            In this project Python helps:

            <br>

            • Load the dataset<br>
            • Process vehicle data<br>
            • Calculate statistics<br>
            • Perform depreciation analysis<br>
            • Send data to Flask templates
        `;

    }



    /* =====================================
       PANDAS
    ===================================== */

    if (
        message.includes(
            "pandas"
        )
    ) {

        return `
            🐼 Pandas is used for data analysis.

            <br><br>

            It helps the project:

            <br>

            • Read CSV data<br>
            • Filter vehicles<br>
            • Count categories<br>
            • Find maximum and minimum values<br>
            • Calculate averages<br>
            • Analyze correlations
        `;

    }



    /* =====================================
       FLASK
    ===================================== */

    if (
        message.includes(
            "flask"
        ) ||
        message.includes(
            "backend"
        )
    ) {

        return `
            🌐 Flask is the backend framework
            used in this project.

            <br><br>

            Flask is responsible for:

            <br>

            • Running the web application<br>
            • Loading the dataset<br>
            • Processing analytics<br>
            • Sending data to HTML<br>
            • Connecting Python with the dashboard
        `;

    }



    /* =====================================
       CHARTS
    ===================================== */

    if (
        message.includes(
            "chart"
        ) ||
        message.includes(
            "graph"
        ) ||
        message.includes(
            "analytics"
        )
    ) {

        return `
            📈 The dashboard uses
            <b>Chart.js</b> for interactive
            data visualization.

            <br><br>

            Available charts include:

            <br>

            • Fuel Type Analysis<br>
            • Manual vs Automatic<br>
            • Vehicles By Year<br>
            • Top Vehicles By Selling Price
        `;

    }



    /* =====================================
       TECHNOLOGY
    ===================================== */

    if (
        message.includes(
            "technology"
        ) ||
        message.includes(
            "technologies"
        ) ||
        message.includes(
            "tools"
        ) ||
        message.includes(
            "tech stack"
        )
    ) {

        return `
            💻 Technologies used in this project:

            <br><br>

            • Python<br>
            • Flask<br>
            • Pandas<br>
            • HTML<br>
            • CSS<br>
            • JavaScript<br>
            • Chart.js
        `;

    }



    /* =====================================
       HOW IT WORKS
    ===================================== */

    if (
        message.includes(
            "working"
        ) ||
        message.includes(
            "how does"
        ) ||
        message.includes(
            "how work"
        )
    ) {

        return `
            ⚡ Project Working:

            <br><br>

            1️⃣ Python loads the CarDekho dataset.

            <br><br>

            2️⃣ Pandas processes and analyzes
            the vehicle information.

            <br><br>

            3️⃣ Flask sends the processed
            data to the dashboard.

            <br><br>

            4️⃣ JavaScript receives the data.

            <br><br>

            5️⃣ Chart.js creates interactive
            charts for visualization.
        `;

    }



    /* =====================================
       THANK YOU
    ===================================== */

    if (
        message.includes(
            "thank"
        )
    ) {

        return `
            😊 You're welcome!

            <br><br>

            Good luck with your
            <b>Car Market Trends Analysis</b>
            project! 🚗📊
        `;

    }



    /* =====================================
       DEFAULT RESPONSE
    ===================================== */

    return `
        🤖 I can help you with the
        <b>Car Market Trends Analysis</b>
        project.

        <br><br>

        Try asking about:

        <br>

        • Dataset<br>
        • Selling Price<br>
        • Fuel Types<br>
        • Manual vs Automatic<br>
        • Depreciation<br>
        • Python<br>
        • Pandas<br>
        • Flask<br>
        • Charts<br>
        • Project Working
    `;

}