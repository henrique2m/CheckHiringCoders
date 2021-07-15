window.onload = () => {
  const uri = document.documentURI;

  if (uri !== "https://xpcorp.gama.academy/aluno/playlists") return;

  const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

  const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const handleChangeBackgroundColor = (idElement, color, statusCheckbox) => {
    const checkboxModule = document.querySelector(`#${idElement}`);

    checkboxModule.checked = statusCheckbox;

    const elementParent = checkboxModule.parentNode;
    const elementsChild = elementParent.children;

    for (let i = 0; i < elementsChild.length - 1; i++) {
      elementsChild[i].style.backgroundColor = color;
    }
  };

  const toggleCheckboxModule = (event) => {
    const checkboxModule = event.target;
    const { id, checked } = checkboxModule;
    const modules = getLocalStorage("modules");
    let backgroundColor = "#c9f8a6";

    modules.map((module) => {
      if (module.id === id) {
        module.status = !module.status;

        if (!module.status) {
          backgroundColor = "#fff";
        }
      }
    });

    setLocalStorage("modules", modules);

    handleChangeBackgroundColor(id, backgroundColor, checked);
  };

  const createInputCheckboxModules = (elementParent, idModule) => {
    const card = elementParent;
    const input = document.createElement("input");

    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "module");
    input.setAttribute("id", `module-${idModule}`);

    input.style.position = "absolute";
    input.style.marginLeft = "100%";
    input.style.left = "-28px";
    input.style.width = "25px";
    input.style.height = "25px";

    input.addEventListener("click", toggleCheckboxModule);

    card.appendChild(input);
  };

  const handleInputCheckboxModules = () => {
    const cards = document.querySelectorAll(".col-lg-4");
    const modules = [];

    for (let id = 0; id < cards.length; id++) {
      const card = cards[id];

      if (!getLocalStorage("modules")) {
        const dataModule = {
          id: `module-${id}`,
          status: false,
        };

        modules.push(dataModule);
      }

      createInputCheckboxModules(card, id);
    }

    return modules;
  };

  const handleAddNewInputCheckboxModules = (oldNumberModules) => {
    const cards = document.querySelectorAll(".col-lg-4");
    const oldModules = getLocalStorage("modules");
    const newModules = [];

    for (let id = oldNumberModules; id < cards.length; id++) {
      const card = cards[id];

      const dataModule = {
        id: `module-${id}`,
        status: false,
      };

      newModules.push(dataModule);

      createInputCheckboxModules(card, id);

      const modules = [...oldModules, ...newModules];

      setLocalStorage("modules", modules);
      setLocalStorage("numberModules", modules.length);
    }
  };

  const start = () => {
    const cards = document.querySelectorAll(".col-lg-4");
    const modules = handleInputCheckboxModules();

    if (!getLocalStorage("modules")) {
      setLocalStorage("modules", modules);
      setLocalStorage("numberModules", modules.length);
      return;
    }

    const oldNumberModules = getLocalStorage("numberModules");

    if (cards.length > oldNumberModules) {
      handleAddNewInputCheckboxModules(oldNumberModules);
    }

    const startModulesChecked = getLocalStorage("modules");

    startModulesChecked.map((module) => {
      if (module.status) {
        handleChangeBackgroundColor(module.id, "#c9f8a6", module.status);
      }
    });
  };

  start();
};
