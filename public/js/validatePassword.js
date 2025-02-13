document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const strengthBar = document.getElementById("password-strength");

    const rules = {
      uppercase: document.getElementById("rule-uppercase"),
      lowercase: document.getElementById("rule-lowercase"),
      number: document.getElementById("rule-number"),
      special: document.getElementById("rule-special"),
      length: document.getElementById("rule-length")
    };

    togglePassword.addEventListener("click", () => {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;
      togglePassword.classList.toggle("bi-eye-slash-fill");
    });

    passwordInput.addEventListener("input", () => {
      const password = passwordInput.value;
      let strength = 0;

      const conditions = [
        { regex: /[A-Z]/, rule: "uppercase" },
        { regex: /[a-z]/, rule: "lowercase" },
        { regex: /\d/, rule: "number" },
        { regex: /[@#%^&*]/, rule: "special" },
        { condition: password.length == 8, rule: "length" }
      ];

      conditions.forEach(({ regex, rule, condition }) => {
        const isValid = regex ? regex.test(password) : condition;
        const img = rules[rule].querySelector("img");
        img.src = isValid ? "./../../public/images/Check Mark.png" : "./../../public/images/Box Important.png";
        if (isValid) strength++;
      });

      updateStrengthBar(strength);
    });

    function updateStrengthBar(strength) {
      const classes = ["progress-bar-danger", "progress-bar-warning", "progress-bar-success"];
      strengthBar.className = "progress-bar"; // Remove todas as classes adicionais

      if (strength <= 2) {
        strengthBar.classList.add(classes[0]);
        strengthBar.style.width = "30%";
      } else if (strength === 3) {
        strengthBar.classList.add(classes[1]);
        strengthBar.style.width = "60%";
      } else {
        strengthBar.classList.add(classes[2]);
        strengthBar.style.width = "100%";
      }
    }
  });