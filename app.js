(function () {
    // ======= Your Existing Functional Code =======
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        });
    });

    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });

    // ======= New Security + Popup Features =======

    // 🔐 Create Popup Element (once)
    const popup = document.createElement("div");
    popup.id = "security-popup";
    popup.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0,0,0,0.85);
        color: #00ffcc;
        padding: 14px 18px;
        border-radius: 10px;
        font-family: 'Poppins', sans-serif;
        font-size: 15px;
        display: none;
        align-items: center;
        gap: 8px;
        box-shadow: 0 0 12px rgba(0,255,200,0.4);
        z-index: 99999;
        animation: fadeInOut 2.5s ease;
    `;
    popup.innerHTML = `<span style="font-size:18px;">🔒</span><span id="popup-text">Access Restricted</span>`;
    document.body.appendChild(popup);

    // 🔔 Popup Show Function
    function showPopup(message) {
        const textEl = document.getElementById("popup-text");
        textEl.textContent = message;
        popup.style.display = "flex";
        setTimeout(() => { popup.style.display = "none"; }, 2500);
    }

    // 🔒 Disable Right Click
    document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        showPopup("Right Click Disabled!");
    });

    // 🔒 Disable Double Click
    document.addEventListener("dblclick", (e) => {
        e.preventDefault();
        showPopup("Double Click Disabled!");
    });

    // 🔒 Disable F12 and Ctrl+U keys
    document.addEventListener("keydown", (e) => {
        if (e.key === "F12" || (e.ctrlKey && e.key.toLowerCase() === "u")) {
            e.preventDefault();
            showPopup("Access Denied!");
        }
    });

    // 🔒 Detect if DevTools Opened (Network hiding trick)
    setInterval(function() {
        const start = new Date();
        debugger; // triggers delay when DevTools open
        const end = new Date();
        if (end - start > 100) {
            document.body.innerHTML = `
                <div style="
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    height:100vh;
                    background:#000;
                    color:#00ffcc;
                    font-family:'Poppins',sans-serif;
                    flex-direction:column;
                    text-align:center;
                ">
                    <div style="font-size:50px;">🔒</div>
                    <h2>Developer Tools Access Blocked</h2>
                    <p>Please close the DevTools to continue browsing securely.</p>
                </div>
            `;
        }
    }, 1000);

    // ======= CSS Animation for popup =======
    const style = document.createElement("style");
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-10px); }
            10%, 90% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);

})();
