document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openModalBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  const modal = document.getElementById("searchModal");
  const input = document.getElementById("searchInput");
  const results = document.getElementById("searchResults");

  const data = [
    { name: "Pizza", synonyms: ["margarita", "queso"], target: "pizza" },
    { name: "Hamburguesa", synonyms: ["burger", "carne"], target: "hamburguesa" },
    { name: "Tacos", synonyms: ["mexicano", "tortilla"], target: "tacos" },
  ];

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
    input.focus();
  });

  closeBtn.addEventListener("click", cerrarModal);

  document.addEventListener("mousedown", (e) => {
    const isOutsideModal = !modal.contains(e.target);
    if (modal.style.display === "block" && isOutsideModal) {
      cerrarModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      cerrarModal();
    }
  });

  function cerrarModal() {
    modal.style.display = "none";
    input.value = "";
    results.innerHTML = "";
  }

  let debounceTimer;
  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = input.value.trim().toLowerCase();
      results.innerHTML = "";

      if (query === "") return;

      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.synonyms.some(syn => syn.includes(query))
      );

      if (filtered.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Sin resultados.";
        results.appendChild(li);
        return;
      }

      filtered.forEach(match => {
        const li = document.createElement("li");
        li.textContent = match.name;
        li.addEventListener("click", () => {
          const section = document.getElementById(match.target);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            cerrarModal();
          }
        });
        results.appendChild(li);
      });
    }, 200);
  });
});
