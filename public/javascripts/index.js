const fakeDatabase = (() => {
  const db = {
    // Unique category ID
    1: {
      categoryName: 'Finance / Analysis',
      products: {
        // Unique product ID (DRN?)
        // 0001: {
        //   name: 'test',
        //   status: 0
        // },
      },
    },
    2: {
      categoryName: 'Sales & Marketing',
      products: {

      },
    },
    3: {
      categoryName: 'Third Party Risk',
      products: {

      },
    },
    4: {
      categoryName: 'Master Data',
      products: {

      },
    },
    5: {
      categoryName: 'Corporate Compliance',
      products: {

      },
    },
    6: {
      categoryName: 'Small Business',
      products: {

      },
    },
  };

  const _generateEntries = () => {
    for (const entry in db) {
      // Random number of entries between 5 and 20
      const count = Math.floor(Math.random() * 15) + 5;
      for (let i = 0; i < count; i++) {
        const state = () => {
          // 0 = up, 1 = down, 2 = errored
          const random = Math.floor(Math.random() * 100);
          if ((random % 3) === 0) {
            if (random < 50) {
              return 2;
            }
            return 1;
          }
          return 0;
        }
        db[entry].products[`${i}`] = {
          name: 'Test',
          status: state(),
        };
      }
    }
  };

  _generateEntries();

  return {
    db,
  }
})();

const statusModule = (() => {
  // DOM Cache
  const _categoryContainer = document.querySelector('.categories');

  const _createModule = (obj) => {
    const docFrag = document.createDocumentFragment();

    // Create category card
    const module = document.createElement('div');
    module.classList.add('category-card');

    // Create card header
    const header = document.createElement('div');
    header.classList.add('category-header');
    header.innerHTML = obj.categoryName;

    // Create card info container
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('category-info');

    // Create status module for each entry
    for (const [key, value] of Object.entries(obj.products)) {
      // Create module container
      const statusModule = document.createElement('div');
      statusModule.classList.add('status-module');

      // Create colored status indicator
      const statusOrb = _drawOrb(value.status);

      // Create module product identifier
      const statusText = document.createElement('div');
      statusText.classList.add('status-text');
      statusText.innerHTML = value.name;

      statusModule.appendChild(statusOrb);
      statusModule.appendChild(statusText);
      infoContainer.appendChild(statusModule);
    }

    module.appendChild(header);
    module.appendChild(infoContainer);
    docFrag.appendChild(module);

    return docFrag;
  };

  const _getStatusColor = (statusCode) => {
    // 0 = up, 1 = down, 2 = errored
    switch (statusCode) {
      case 0:
        return '#74AA50';
      case 1:
        return '#BC2C2C';
      case 2:
        return '#E6A65D';
    }
  };

  const _drawOrb = (code) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svg.setAttribute('viewBox', '0 0 24 24');
    path.setAttribute('fill', _getStatusColor(code));
    path.setAttribute('d', 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z');
    svg.appendChild(path);
    return svg;
  }

  const _draw = () => {
    for (const [key, value] of Object.entries(fakeDatabase.db)) {
      const module = _createModule(value);
      _categoryContainer.appendChild(module);
    }
  };

  _draw();

  return {

  };
})();