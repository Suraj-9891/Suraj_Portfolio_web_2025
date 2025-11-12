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

    // ======= New Security + Modern Popup Features =======

    // 🔐 Create Modern Popup Element (once)
    const popup = document.createElement("div");
    popup.id = "security-popup";
    popup.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        backdrop-filter: blur(10px);
        background: rgba(0, 0, 0, 0.6);
        border: 1px solid rgba(0, 255, 204, 0.3);
        color: #00ffcc;
        padding: 16px 22px;
        border-radius: 14px;
        font-family: 'Poppins', sans-serif;
        font-size: 15px;
        display: none;
        align-items: center;
        gap: 12px;
        box-shadow: 0 0 20px rgba(0, 255, 200, 0.4);
        z-index: 99999;
        animation: slideFade 0.5s ease, fadeOut 2.5s ease 2s forwards;
    `;

    popup.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;">
            <div style="
                width:34px;
                height:34px;
                background:linear-gradient(135deg, #00ffd0, #0077ff);
                display:flex;
                align-items:center;
                justify-content:center;
                border-radius:50%;
                box-shadow:0 0 10px rgba(0,255,204,0.5);
                font-size:18px;
            ">🔒</div>
            <div style="display:flex;flex-direction:column;">
                <strong id="popup-title" style="font-size:16px;">Access Restricted</strong>
                <span id="popup-text" style="font-size:13px;opacity:0.85;">Action not allowed</span>
            </div>
        </div>
    `;
    document.body.appendChild(popup);

    // 🔔 Popup Show Function
    function showPopup(message) {
        const textEl = document.getElementById("popup-text");
        const titleEl = document.getElementById("popup-title");
        titleEl.textContent = " Security Alert";
        textEl.textContent = message;
        popup.style.display = "flex";
        popup.style.opacity = "1";
        setTimeout(() => { popup.style.display = "none"; }, 2800);
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

    // 🔒 Disable F12, Ctrl+U, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    document.addEventListener("keydown", (e) => {
        if (
            e.key === "F12" ||
            (e.ctrlKey && e.key.toLowerCase() === "u") ||
            (e.ctrlKey && e.shiftKey && (
                e.key.toLowerCase() === "i" ||
                e.key.toLowerCase() === "j" ||
                e.key.toLowerCase() === "c"
            ))
        ) {
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
                    <div style="font-size:60px;">🔒</div>
                    <h2>Developer Tools Access Blocked</h2>
                    <p>Please close DevTools to continue browsing securely.</p>
                </div>
            `;
        }
    }, 1000);

    // ======= Modern CSS Animations for popup =======
    const style = document.createElement("style");
    style.textContent = `
        @keyframes slideFade {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            to { opacity: 0; transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(style);

})();
