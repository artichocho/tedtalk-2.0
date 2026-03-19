(() => {
  const overlay = document.getElementById("easter-egg");
  const closeButton = document.getElementById("close-egg");
  const konamiToast = document.getElementById("konami-egg");
  const vipForm = document.getElementById("vip-form");
  const vipResult = document.getElementById("vip-result");
  const statsDataElement = document.getElementById("stats-data");

  const modalEls = {
    whitepaper: document.getElementById("modal-whitepaper"),
    iso: document.getElementById("modal-iso"),
    legal: document.getElementById("modal-legal"),
  };

  const closeAllModals = () => {
    Object.entries(modalEls).forEach(([, el]) => {
      if (!el) return;
      el.classList.add("hidden");
      el.classList.remove("flex");
      el.setAttribute("aria-hidden", "true");
    });
  };

  const openModal = (key) => {
    const el = modalEls[key];
    if (!el) return;
    closeAllModals();
    el.classList.remove("hidden");
    el.classList.add("flex");
    el.setAttribute("aria-hidden", "false");
  };

  const openEgg = () => {
    if (!overlay) return;
    overlay.classList.add("is-open");
    overlay.classList.remove("hidden");
    overlay.classList.add("flex");
    overlay.setAttribute("aria-hidden", "false");
  };

  const closeEgg = () => {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    overlay.classList.add("hidden");
    overlay.classList.remove("flex");
    overlay.setAttribute("aria-hidden", "true");
  };

  const konami = [
    "arrowup",
    "arrowup",
    "arrowdown",
    "arrowdown",
    "arrowleft",
    "arrowright",
    "arrowleft",
    "arrowright",
    "b",
    "a",
  ];
  const sequence = [];

  const closeFakeCheckout = (() => {
    const fakeOverlay = document.getElementById("fake-checkout-overlay");
    const fakeBar = document.getElementById("fake-checkout-bar");
    const fakeStatus = document.getElementById("fake-checkout-status");
    const fakeClose = document.getElementById("fake-checkout-close");
    const fakeBilletWrap = document.getElementById("fake-checkout-billet-wrap");
    const fakeBilletLink = document.getElementById("fake-checkout-billet");
    if (!fakeOverlay || !fakeBar || !fakeStatus) {
      return () => {};
    }

    let running = false;

    const close = () => {
      fakeOverlay.classList.add("hidden");
      fakeOverlay.classList.remove("flex");
      fakeOverlay.setAttribute("aria-hidden", "true");
      running = false;
      fakeBar.style.transition = "none";
      fakeBar.style.width = "0%";
      fakeStatus.classList.add("hidden");
      fakeBilletWrap?.classList.add("hidden");
      if (fakeBilletLink) {
        fakeBilletLink.setAttribute("href", "#");
      }
    };

    const open = (billetUrl) => {
      if (running) return;
      running = true;
      fakeOverlay.classList.remove("hidden");
      fakeOverlay.classList.add("flex");
      fakeOverlay.setAttribute("aria-hidden", "false");
      fakeStatus.classList.add("hidden");
      fakeBilletWrap?.classList.add("hidden");
      fakeBar.style.transition = "none";
      fakeBar.style.width = "0%";
      void fakeBar.offsetWidth;
      fakeBar.style.transition = "width 3s linear";
      fakeBar.style.width = "100%";
      window.setTimeout(() => {
        fakeStatus.classList.remove("hidden");
        if (billetUrl && fakeBilletLink && fakeBilletWrap) {
          fakeBilletLink.setAttribute("href", billetUrl);
          fakeBilletWrap.classList.remove("hidden");
        }
        running = false;
      }, 3000);
    };

    document.querySelectorAll(".js-fake-checkout").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        const billetUrl = event.currentTarget.dataset.billetUrl || null;
        open(billetUrl);
      });
    });

    fakeClose?.addEventListener("click", close);

    fakeOverlay.addEventListener("click", (event) => {
      if (event.target === fakeOverlay) {
        close();
      }
    });

    return close;
  })();

  document.addEventListener("keydown", (event) => {
    if (event.shiftKey && event.key.toLowerCase() === "t") {
      openEgg();
    }

    sequence.push(event.key.toLowerCase());
    if (sequence.length > konami.length) {
      sequence.shift();
    }
    if (sequence.join(",") === konami.join(",")) {
      if (konamiToast) {
        konamiToast.classList.remove("hidden");
        setTimeout(() => konamiToast.classList.add("hidden"), 3500);
      }
      sequence.length = 0;
    }

    if (event.key === "Escape") {
      closeEgg();
      closeAllModals();
      closeFakeCheckout();
    }
  });

  if (overlay) {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeEgg();
      }
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeEgg);
  }

  document.querySelectorAll("[data-close-modal]").forEach((btn) => {
    btn.addEventListener("click", () => closeAllModals());
  });

  Object.entries(modalEls).forEach(([, el]) => {
    if (!el) return;
    el.addEventListener("click", (event) => {
      if (event.target === el) {
        closeAllModals();
      }
    });
  });

  document.getElementById("btn-whitepaper")?.addEventListener("click", () => openModal("whitepaper"));

  document.getElementById("footer-iso")?.addEventListener("click", () => openModal("iso"));

  document.getElementById("footer-legal")?.addEventListener("click", () => openModal("legal"));

  document.getElementById("btn-methodologie")?.addEventListener("click", () => {
    const target = document.getElementById("methodologie-complete");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  const assistantToggle = document.getElementById("assistant-toggle");
  const assistantPanel = document.getElementById("assistant-panel");
  const assistantForm = document.getElementById("assistant-form");
  const assistantInput = document.getElementById("assistant-input");
  const assistantLog = document.getElementById("assistant-log");
  let assistantOpen = false;
  let assistantTurn = 0;

  const assistantReplies = [
    "Merci pour votre message. Votre demande a été enregistrée avec le sérieux qu’elle mérite.",
    "Un conseiller virtuel examine votre cas. D’ici là, hydratez-vous : c’est dans la FAQ, à peu près.",
    "Nous traitons les tickets par ordre d’arrivée et de bonne foi. Votre patience est notre KPI préféré.",
    "Réponse standard : oui, c’est possible, sous réserve de consentement mutuel et d’un café correct.",
    "Si votre question porte sur le programme, sachez que l’ordre des interventions peut varier… comme la vie.",
    "Notre politique de remboursement est alignée sur celle des licornes : élégante, rare, surtout théorique.",
    "Pour une question technique, nous vous recommandons la méthode « essayer, demander, réécouter ».",
    "Ticket clôturé : résolu émotionnellement, en attente côté punchline.",
  ];

  const appendAssistantLine = (who, text) => {
    if (!assistantLog) return;
    const row = document.createElement("p");
    row.className = who === "user" ? "text-slate-200" : "text-slate-400 italic";
    row.textContent = (who === "user" ? "Vous : " : "Assistant : ") + text;
    assistantLog.appendChild(row);
    assistantLog.scrollTop = assistantLog.scrollHeight;
  };

  assistantToggle?.addEventListener("click", () => {
    assistantOpen = !assistantOpen;
    if (!assistantPanel) return;
    if (assistantOpen) {
      assistantPanel.classList.remove("hidden");
      assistantPanel.style.display = "flex";
      assistantPanel.setAttribute("aria-hidden", "false");
      assistantInput?.focus();
    } else {
      assistantPanel.classList.add("hidden");
      assistantPanel.style.display = "";
      assistantPanel.setAttribute("aria-hidden", "true");
    }
  });

  assistantForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = (assistantInput?.value || "").trim();
    if (!text) return;
    appendAssistantLine("user", text);
    assistantInput.value = "";
    const reply = assistantReplies[assistantTurn % assistantReplies.length];
    assistantTurn += 1;
    appendAssistantLine("bot", reply);
  });

  if (vipForm && vipResult) {
    vipForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const codeField = document.getElementById("code");
      const codeValue = (codeField?.value || "").trim().toUpperCase();
      const successMessage =
        vipResult.dataset.successMessage || "Accès accordé. Badge validé.";
      const waitingMessage =
        "Code incomplet. Indice : le mot de passe a la langue bien pendue.";

      const isSuccess = codeValue === "LANGUEPENDUE";
      vipResult.textContent = isSuccess ? successMessage : waitingMessage;
      vipResult.classList.remove(
        "border-emerald-300/20",
        "bg-emerald-900/30",
        "text-emerald-100",
        "border-red-300/25",
        "bg-red-900/30",
        "text-red-100"
      );
      vipResult.classList.add(
        ...(isSuccess
          ? ["border-emerald-300/20", "bg-emerald-900/30", "text-emerald-100"]
          : ["border-red-300/25", "bg-red-900/30", "text-red-100"])
      );
      vipResult.classList.remove("hidden");
    });
  }

  if (statsDataElement && typeof Chart !== "undefined") {
    const data = JSON.parse(statsDataElement.textContent || "{}");
    const sessions = data.sessions || [];
    const repartition = data.repartition || {};
    const safePractices = data.safe_practices || [];
    const palette = {
      primary: "#E62B1E",
      accent: "#F97373",
      soft: "rgba(230, 43, 30, 0.22)",
      line: "#FB7185",
      grid: "rgba(148, 163, 184, 0.15)",
      text: "#CBD5E1",
      ticks: "#94A3B8",
    };

    const sharedOptions = {
      plugins: {
        legend: {
          labels: { color: palette.text },
        },
      },
      scales: {
        r: {
          grid: { color: palette.grid },
          angleLines: { color: palette.grid },
          pointLabels: { color: palette.text },
          ticks: { color: palette.ticks, backdropColor: "transparent" },
        },
        x: {
          ticks: { color: palette.ticks },
          grid: { color: palette.grid },
        },
        y: {
          ticks: { color: palette.ticks },
          grid: { color: palette.grid },
          beginAtZero: true,
        },
      },
    };

    const radarCanvas = document.getElementById("stats-radar");
    if (radarCanvas) {
      new Chart(radarCanvas, {
        type: "radar",
        data: {
          labels: data.labels || [],
          datasets: [
            {
              label: "Satisfaction (%)",
              data: data.satisfaction || [],
              fill: true,
              backgroundColor: palette.soft,
              borderColor: palette.primary,
              pointBackgroundColor: palette.accent,
            },
          ],
        },
        options: sharedOptions,
      });
    }

    const lineCanvas = document.getElementById("stats-line");
    if (lineCanvas) {
      new Chart(lineCanvas, {
        type: "line",
        data: {
          labels: sessions.map((entry) => entry.mois),
          datasets: [
            {
              label: "Score mensuel",
              data: sessions.map((entry) => entry.score),
              borderColor: palette.line,
              backgroundColor: "rgba(251, 113, 133, 0.15)",
              tension: 0.35,
              fill: true,
            },
          ],
        },
        options: sharedOptions,
      });
    }

    const donutCanvas = document.getElementById("stats-donut");
    if (donutCanvas) {
      new Chart(donutCanvas, {
        type: "doughnut",
        data: {
          labels: Object.keys(repartition),
          datasets: [
            {
              data: Object.values(repartition),
              backgroundColor: ["#E62B1E", "#FB7185", "#FCA5A5", "#7F1D1D"],
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: "bottom",
              labels: { color: palette.text },
            },
          },
        },
      });
    }

    const safeBarCanvas = document.getElementById("stats-safe-bar");
    if (safeBarCanvas) {
      new Chart(safeBarCanvas, {
        type: "bar",
        data: {
          labels: safePractices.map((entry) => entry.pratique),
          datasets: [
            {
              label: "Adoption (%)",
              data: safePractices.map((entry) => entry.score),
              backgroundColor: ["#E62B1E", "#FB7185", "#F97373", "#BE123C", "#7F1D1D"],
              borderRadius: 6,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: { color: palette.text },
            },
          },
          scales: {
            x: {
              ticks: { color: palette.ticks },
              grid: { color: palette.grid },
            },
            y: {
              ticks: { color: palette.ticks },
              grid: { color: palette.grid },
              beginAtZero: true,
              max: 100,
            },
          },
        },
      });
    }
  }
})();
