/* =========================================
   SCROLL FUNCTIONS
========================================= */

function scrollToResults() {

    const results =
        document.getElementById(
            "results"
        );


    if (results) {

        results.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =========================================
   REDIRECT TO DASHBOARD
========================================= */

function scrollToDashboard() {

    window.location.href =
        "/dashboard";

}


/* =========================================
   WAIT FOR PAGE TO LOAD
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =========================================
           DARK / LIGHT MODE
        ========================================= */

        const themeToggle =
            document.getElementById(
                "themeToggle"
            );


        const themeIcon =
            document.getElementById(
                "themeIcon"
            );


        const savedTheme =
            localStorage.getItem(
                "theme"
            );


        function updateThemeIcon() {

            if (!themeIcon) {

                return;

            }


            if (
                document.body.classList.contains(
                    "light-mode"
                )
            ) {

                themeIcon.textContent =
                    "☾";

            }
            else {

                themeIcon.textContent =
                    "☀";

            }

        }


        /* LOAD SAVED THEME */

        if (
            savedTheme === "light"
        ) {

            document.body.classList.add(
                "light-mode"
            );

        }
        else {

            document.body.classList.remove(
                "light-mode"
            );

        }


        updateThemeIcon();


        /* THEME BUTTON CLICK */

        if (themeToggle) {

            themeToggle.addEventListener(
                "click",
                function () {


                    document.body.classList.toggle(
                        "light-mode"
                    );


                    const isLightMode =
                        document.body.classList.contains(
                            "light-mode"
                        );


                    if (isLightMode) {

                        localStorage.setItem(
                            "theme",
                            "light"
                        );

                    }
                    else {

                        localStorage.setItem(
                            "theme",
                            "dark"
                        );

                    }


                    updateThemeIcon();


                }
            );

        }


        /* =========================================
           HAMBURGER BUTTON
           CLICK → DASHBOARD
        ========================================= */

        const hamburgerButton =
            document.getElementById(
                "hamburgerButton"
            );


        const navIcon =
            document.getElementById(
                "nav-icon2"
            );


        /*
        IMPORTANT:

        Your HTML hamburger should be:

        <a href="/dashboard"
           id="hamburgerButton"
           class="hamburger-button">

        JavaScript does NOT block the redirect.
        */


        if (
            hamburgerButton &&
            navIcon
        ) {

            /* CURSOR ENTER */

            hamburgerButton.addEventListener(
                "mouseenter",
                function () {

                    navIcon.classList.add(
                        "open"
                    );

                }
            );


            /* CURSOR LEAVE */

            hamburgerButton.addEventListener(
                "mouseleave",
                function () {

                    navIcon.classList.remove(
                        "open"
                    );

                }
            );

        }


        /* =========================================
           VEHICLE SEARCH DROPDOWN
        ========================================= */

        const carSearch =
            document.getElementById(
                "carSearch"
            );


        const dropdownToggle =
            document.getElementById(
                "dropdownToggle"
            );


        const searchDropdownContainer =
            document.querySelector(
                ".custom-search-dropdown"
            );


        const carDropdown =
            document.getElementById(
                "carDropdown"
            );


        const carOptions =
            document.querySelectorAll(
                ".car-option"
            );


        const noVehicleFound =
            document.getElementById(
                "noVehicleFound"
            );


        /* OPEN DROPDOWN */

        function openDropdown() {

            if (
                searchDropdownContainer
            ) {

                searchDropdownContainer.classList.add(
                    "active"
                );

            }

        }


        /* CLOSE DROPDOWN */

        function closeDropdown() {

            if (
                searchDropdownContainer
            ) {

                searchDropdownContainer.classList.remove(
                    "active"
                );

            }

        }


        /* TOGGLE DROPDOWN BUTTON */

        if (
            dropdownToggle &&
            searchDropdownContainer
        ) {

            dropdownToggle.addEventListener(
                "click",
                function (event) {


                    event.preventDefault();

                    event.stopPropagation();


                    searchDropdownContainer.classList.toggle(
                        "active"
                    );


                    if (
                        searchDropdownContainer.classList.contains(
                            "active"
                        )
                    ) {

                        if (carSearch) {

                            carSearch.focus();

                        }

                    }


                }
            );

        }


        /* CLICK INPUT → OPEN DROPDOWN */

        if (
            carSearch &&
            searchDropdownContainer
        ) {

            carSearch.addEventListener(
                "focus",
                function () {

                    openDropdown();

                }
            );


            carSearch.addEventListener(
                "click",
                function () {

                    openDropdown();

                }
            );

        }


        /* =========================================
           FILTER VEHICLE NAMES
        ========================================= */

        if (carSearch) {

            carSearch.addEventListener(
                "input",
                function () {


                    const searchValue =
                        this.value
                            .toLowerCase()
                            .trim();


                    let visibleCount =
                        0;


                    carOptions.forEach(
                        function (option) {


                            const vehicleName =
                                (
                                    option.dataset.value ||
                                    option.textContent
                                )
                                    .toLowerCase()
                                    .trim();


                            if (
                                vehicleName.includes(
                                    searchValue
                                )
                            ) {

                                option.style.display =
                                    "block";


                                visibleCount++;

                            }
                            else {

                                option.style.display =
                                    "none";

                            }


                        }
                    );


                    /* NO VEHICLE FOUND */

                    if (noVehicleFound) {


                        if (
                            visibleCount === 0
                        ) {

                            noVehicleFound.style.display =
                                "block";

                        }
                        else {

                            noVehicleFound.style.display =
                                "none";

                        }


                    }


                    openDropdown();


                }
            );

        }


        /* =========================================
           SELECT VEHICLE
        ========================================= */

        carOptions.forEach(
            function (option) {


                option.addEventListener(
                    "click",
                    function (event) {


                        event.preventDefault();

                        event.stopPropagation();


                        const selectedVehicle =
                            this.dataset.value ||
                            this.textContent.trim();


                        if (carSearch) {

                            carSearch.value =
                                selectedVehicle;

                        }


                        closeDropdown();


                    }
                );


            }
        );


        /* =========================================
           CLOSE DROPDOWN OUTSIDE CLICK
        ========================================= */

        document.addEventListener(
            "click",
            function (event) {


                if (
                    searchDropdownContainer &&
                    !searchDropdownContainer.contains(
                        event.target
                    )
                ) {

                    closeDropdown();

                }


            }
        );


        /* =========================================
           ESCAPE KEY
        ========================================= */

        document.addEventListener(
            "keydown",
            function (event) {


                if (
                    event.key === "Escape"
                ) {

                    closeDropdown();

                }


            }
        );


        /* =========================================
           MISSING VALUES CHECK
        ========================================= */

        const checkMissingBtn =
            document.getElementById(
                "checkMissingBtn"
            );


        const missingLoading =
            document.getElementById(
                "missingLoading"
            );


        const missingTableContainer =
            document.getElementById(
                "missingTableContainer"
            );


        const missingTableBody =
            document.getElementById(
                "missingTableBody"
            );


        const missingResult =
            document.getElementById(
                "missingResult"
            );


        const missingResultTitle =
            document.getElementById(
                "missingResultTitle"
            );


        const missingResultText =
            document.getElementById(
                "missingResultText"
            );


        if (checkMissingBtn) {

            checkMissingBtn.addEventListener(
                "click",
                async function () {


                    /* RESET */

                    if (
                        missingTableContainer
                    ) {

                        missingTableContainer.style.display =
                            "none";

                    }


                    if (
                        missingResult
                    ) {

                        missingResult.style.display =
                            "none";

                    }


                    /* SHOW LOADING */

                    if (
                        missingLoading
                    ) {

                        missingLoading.style.display =
                            "block";

                    }


                    checkMissingBtn.disabled =
                        true;


                    checkMissingBtn.innerHTML =
                        `
                        <span class="button-spinner"></span>
                        CHECKING...
                        `;


                    try {


                        const response =
                            await fetch(
                                "/api/missing-values"
                            );


                        if (
                            !response.ok
                        ) {

                            throw new Error(
                                "Unable to fetch missing values"
                            );

                        }


                        const result =
                            await response.json();


                        /* CLEAR TABLE */

                        if (
                            missingTableBody
                        ) {

                            missingTableBody.innerHTML =
                                "";


                            result.columns.forEach(
                                function (item) {


                                    const row =
                                        document.createElement(
                                            "tr"
                                        );


                                    row.innerHTML =
                                        `
                                        <td>
                                            ${item.column}
                                        </td>

                                        <td class="
                                            missing-count
                                            ${
                                                item.missing > 0
                                                    ? "has-missing"
                                                    : ""
                                            }
                                        ">
                                            ${item.missing}
                                        </td>
                                        `;


                                    missingTableBody.appendChild(
                                        row
                                    );


                                }
                            );


                        }


                        /* HIDE LOADING */

                        if (
                            missingLoading
                        ) {

                            missingLoading.style.display =
                                "none";

                        }


                        /* SHOW TABLE */

                        if (
                            missingTableContainer
                        ) {

                            missingTableContainer.style.display =
                                "block";

                        }


                        /* SHOW RESULT */

                        if (
                            missingResult
                        ) {

                            missingResult.style.display =
                                "block";

                        }


                        if (
                            result.total_missing === 0
                        ) {


                            missingResult.classList.remove(
                                "warning-result"
                            );


                            missingResult.classList.add(
                                "success-result"
                            );


                            if (
                                missingResultTitle
                            ) {

                                missingResultTitle.textContent =
                                    "✓ Dataset Quality Result";

                            }


                            if (
                                missingResultText
                            ) {

                                missingResultText.textContent =
                                    "No missing values were found in the dataset. The dataset is complete and ready for analysis.";

                            }


                        }
                        else {


                            missingResult.classList.remove(
                                "success-result"
                            );


                            missingResult.classList.add(
                                "warning-result"
                            );


                            if (
                                missingResultTitle
                            ) {

                                missingResultTitle.textContent =
                                    "⚠ Missing Values Found";

                            }


                            if (
                                missingResultText
                            ) {

                                missingResultText.textContent =
                                    result.total_missing +
                                    " missing values were found in the dataset.";

                            }


                        }


                    }
                    catch (
                        error
                    ) {


                        console.error(
                            error
                        );


                        if (
                            missingLoading
                        ) {

                            missingLoading.style.display =
                                "none";

                        }


                        if (
                            missingResult
                        ) {

                            missingResult.style.display =
                                "block";


                            missingResult.classList.remove(
                                "success-result"
                            );


                            missingResult.classList.add(
                                "warning-result"
                            );

                        }


                        if (
                            missingResultTitle
                        ) {

                            missingResultTitle.textContent =
                                "⚠ Error";

                        }


                        if (
                            missingResultText
                        ) {

                            missingResultText.textContent =
                                "Unable to check the dataset. Please try again.";

                        }


                    }
                    finally {


                        checkMissingBtn.disabled =
                            false;


                        checkMissingBtn.innerHTML =
                            `
                            <span>🔍</span>
                            CHECK DATASET
                            `;


                    }


                }
            );

        }


        /* =========================================
           AI CHATBOT
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


        /* OPEN / CLOSE CHATBOT */

        if (
            aiRobotButton &&
            aiChatbot
        ) {

            aiRobotButton.addEventListener(
                "click",
                function () {


                    aiChatbot.classList.toggle(
                        "active"
                    );


                    if (
                        aiChatbot.classList.contains(
                            "active"
                        ) &&
                        chatInput
                    ) {

                        chatInput.focus();

                    }


                }
            );

        }


        /* CLOSE CHAT */

        if (
            closeChat &&
            aiChatbot
        ) {

            closeChat.addEventListener(
                "click",
                function () {

                    aiChatbot.classList.remove(
                        "active"
                    );

                }
            );

        }


        /* ADD MESSAGE */

        function addMessage(
            message,
            sender
        ) {


            if (
                !chatMessages
            ) {

                return;

            }


            const messageDiv =
                document.createElement(
                    "div"
                );


            messageDiv.className =
                "ai-message " +
                sender;


            messageDiv.textContent =
                message;


            chatMessages.appendChild(
                messageDiv
            );


            chatMessages.scrollTop =
                chatMessages.scrollHeight;


        }


        /* =========================================
           CHATBOT RESPONSES
        ========================================= */

        function getBotResponse(
            message
        ) {


            const text =
                message.toLowerCase();


            if (
                text.includes("hello") ||
                text.includes("hi")
            ) {

                return "Hello! 👋 I am your Car Market Analysis AI Assistant. How can I help you?";

            }


            if (
                text.includes("dataset") ||
                text.includes("cardekho")
            ) {

                return "This project uses the CarDekho dataset for analyzing vehicle prices, manufacturing years, fuel types, ownership, transmission and depreciation.";

            }


            if (
                text.includes("depreciation")
            ) {

                return "Depreciation is calculated as Present Price minus Selling Price.";

            }


            if (
                text.includes("age") ||
                text.includes("vehicle age")
            ) {

                return "Vehicle age in this project is calculated using 2018 minus the manufacturing year.";

            }


            if (
                text.includes("fuel")
            ) {

                return "The dataset analyzes fuel types such as Petrol, Diesel and CNG.";

            }


            if (
                text.includes("transmission") ||
                text.includes("automatic") ||
                text.includes("manual")
            ) {

                return "The project compares Manual and Automatic transmission vehicles.";

            }


            if (
                text.includes("price") ||
                text.includes("selling price")
            ) {

                return "Vehicle selling price can be analyzed along with present price, age, kilometers driven and other dataset features.";

            }


            if (
                text.includes("python")
            ) {

                return "Python is used as the main programming language for this project.";

            }


            if (
                text.includes("pandas")
            ) {

                return "Pandas is used to load, clean, process and analyze the CarDekho dataset.";

            }


            if (
                text.includes("project")
            ) {

                return "This is a Car Market Trends Analysis project. It analyzes vehicle market data and provides interactive results, charts and vehicle depreciation calculations.";

            }


            return "I can help you with CarDekho dataset analysis, vehicle prices, depreciation, fuel types, transmission, Python, Pandas and project features.";

        }


        /* SEND MESSAGE */

        function sendChatMessage() {


            if (
                !chatInput
            ) {

                return;

            }


            const message =
                chatInput.value.trim();


            if (
                message === ""
            ) {

                return;

            }


            /* USER MESSAGE */

            addMessage(
                message,
                "user"
            );


            chatInput.value =
                "";


            /* BOT RESPONSE */

            setTimeout(
                function () {


                    const botResponse =
                        getBotResponse(
                            message
                        );


                    addMessage(
                        botResponse,
                        "bot"
                    );


                },
                400
            );


        }


        /* SEND BUTTON */

        if (
            sendMessage
        ) {

            sendMessage.addEventListener(
                "click",
                sendChatMessage
            );

        }


        /* ENTER KEY */

        if (
            chatInput
        ) {

            chatInput.addEventListener(
                "keydown",
                function (
                    event
                ) {


                    if (
                        event.key === "Enter"
                    ) {

                        event.preventDefault();


                        sendChatMessage();


                    }


                }
            );

        }


        /* =========================================
           DASHBOARD CHARTS
        ========================================= */

        if (
            typeof Chart === "undefined"
        ) {

            console.log(
                "Chart.js not available"
            );

        }
        else if (
            typeof dashboardData !== "undefined"
        ) {


            /* =====================================
               FUEL PIE CHART
            ===================================== */

            const fuelPieChart =
                document.getElementById(
                    "fuelPieChart"
                );


            if (
                fuelPieChart
            ) {

                new Chart(
                    fuelPieChart,
                    {

                        type:
                            "doughnut",


                        data:
                            {

                                labels:
                                    dashboardData.fuel_labels,


                                datasets:
                                    [
                                        {

                                            data:
                                                dashboardData.fuel_values,


                                            backgroundColor:
                                                [
                                                    "#ff7200",
                                                    "#00c8ff",
                                                    "#00d084",
                                                    "#a855f7"
                                                ],


                                            borderWidth:
                                                0,


                                            hoverOffset:
                                                10

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
                                                    "bottom"

                                            }

                                    }

                            }

                    }
                );

            }


            /* =====================================
               SELLING PRICE BAR CHART
            ===================================== */

            const sellingPriceBarChart =
                document.getElementById(
                    "sellingPriceBarChart"
                );


            if (
                sellingPriceBarChart
            ) {

                new Chart(
                    sellingPriceBarChart,
                    {

                        type:
                            "bar",


                        data:
                            {

                                labels:
                                    dashboardData.top_vehicle_labels,


                                datasets:
                                    [
                                        {

                                            label:
                                                "Selling Price (Lakhs)",


                                            data:
                                                dashboardData.top_vehicle_values,


                                            backgroundColor:
                                                "#ff7200",


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


                                plugins:
                                    {

                                        legend:
                                            {

                                                display:
                                                    false

                                            }

                                    },


                                scales:
                                    {

                                        x:
                                            {

                                                ticks:
                                                    {

                                                        maxRotation:
                                                            45,


                                                        minRotation:
                                                            45

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
                                                    true

                                            }

                                    }

                            }

                    }
                );

            }


            /* =====================================
               TRANSMISSION CHART
            ===================================== */

            const transmissionChart =
                document.getElementById(
                    "transmissionChart"
                );


            if (
                transmissionChart
            ) {

                new Chart(
                    transmissionChart,
                    {

                        type:
                            "bar",


                        data:
                            {

                                labels:
                                    dashboardData.transmission_labels,


                                datasets:
                                    [
                                        {

                                            label:
                                                "Number of Vehicles",


                                            data:
                                                dashboardData.transmission_values,


                                            backgroundColor:
                                                [
                                                    "#00c8ff",
                                                    "#ff7200"
                                                ],


                                            borderRadius:
                                                8

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

                                                display:
                                                    false

                                            }

                                    },


                                scales:
                                    {

                                        y:
                                            {

                                                beginAtZero:
                                                    true

                                            }

                                    }

                            }

                    }
                );

            }


            /* =====================================
               YEAR LINE CHART
            ===================================== */

            const yearChart =
                document.getElementById(
                    "yearChart"
                );


            if (
                yearChart
            ) {

                new Chart(
                    yearChart,
                    {

                        type:
                            "line",


                        data:
                            {

                                labels:
                                    dashboardData.year_labels,


                                datasets:
                                    [
                                        {

                                            label:
                                                "Vehicles",


                                            data:
                                                dashboardData.year_values,


                                            borderColor:
                                                "#ff7200",


                                            backgroundColor:
                                                "rgba(255,114,0,0.15)",


                                            fill:
                                                true,


                                            tension:
                                                0.4,


                                            pointBackgroundColor:
                                                "#ff9500",


                                            pointBorderColor:
                                                "#ff7200",


                                            pointRadius:
                                                4

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

                                        y:
                                            {

                                                beginAtZero:
                                                    true

                                            }

                                    }

                            }

                    }
                );

            }


        }


    }
);