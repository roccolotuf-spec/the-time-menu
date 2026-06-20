const defaultMenuData = [
    {
        category: "Special Cocktails",
        items: [
            { name: "Mango Smash", price: "€ 5,00", desc: "Rum bianco, purè di mango, succo lime, sciroppo di zucchero." },
            { name: "Coconut Margarita", price: "€ 5,00", desc: "Tequila, crema di cocco, triple sec, succo di lime, zucchero." },
            { name: "Jungle Bird", price: "€ 6,00", desc: "Rum scuro, Campari, succo di lime, sciroppo di zucchero, succo d'ananas." },
            { name: "Tequila Seduction", price: "€ 6,00", desc: "Tequila, maracuja, Aperol, succo di lime, sciroppo di zucchero." },
            { name: "Monte Bianco", price: "€ 6,00", desc: "Amaro Montenegro, succo di lime, Disaronno Velvet, sciroppo di zucchero." }
        ]
    },
    {
        category: "Birreria",
        items: [
            { name: "Nastro Azzurro", price: "€ 2,50", desc: "" },
            { name: "Beck's", price: "€ 2,50", desc: "" },
            { name: "Heineken", price: "€ 2,50", desc: "" },
            { name: "Corona", price: "€ 3,00", desc: "" },
            { name: "Super Tennent's", price: "€ 3,00", desc: "" },
            { name: "Ichnusa Non Filtrata (50cl)", price: "€ 3,50", desc: "" }
        ]
    }
];

let menuData = JSON.parse(localStorage.getItem('theTimeMenu')) || defaultMenuData;

// --- 1. RENDERIZZA MENU CLIENTE (index.html) ---
function renderMenu() {
    const container = document.getElementById('menu-container');
    if (!container) return; 

    container.innerHTML = ''; 

    menuData.forEach(section => {
        const title = document.createElement('div');
        title.className = 'section-title';
        title.innerText = section.category;
        container.appendChild(title);

        section.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'menu-item';
            itemDiv.innerHTML = `
                <div class="item-header">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">${item.price}</span>
                </div>
                ${item.desc ? `<div class="item-description">${item.desc}</div>` : ''}
            `;
            container.appendChild(itemDiv);
        });
    });
}

// --- 2. RENDERIZZA LISTA MODIFICA NELL'ADMIN (admin.html) ---
function renderAdminList() {
    const adminContainer = document.getElementById('admin-list-container');
    if (!adminContainer) return;

    adminContainer.innerHTML = '';

    menuData.forEach((section, catIndex) => {
        const catTitle = document.createElement('h4');
        catTitle.style.color = '#c9a054';
        catTitle.style.margin = '15px 0 5px 0';
        catTitle.style.fontSize = '13px';
        catTitle.innerText = section.category.toUpperCase();
        adminContainer.appendChild(catTitle);

        section.items.forEach((item, itemIndex) => {
            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.justifyContent = 'space-between';
            row.style.alignItems = 'center';
            row.style.padding = '8px 0';
            row.style.borderBottom = '1px solid rgba(255,255,255,0.05)';

            row.innerHTML = `
                <span style="font-size:14px;">${item.name} (${item.price})</span>
                <button onclick="deleteItem(${catIndex}, ${itemIndex})" style="background:#d9534f; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-size:12px;">Elimina</button>
            `;
            adminContainer.appendChild(row);
        });
    });
}

// --- 3. FUNZIONE PER ELIMINARE UN PRODOTTO ---
window.deleteItem = function(catIndex, itemIndex) {
    if (confirm(`Vuoi davvero eliminare ${menuData[catIndex].items[itemIndex].name}?`)) {
        // Rimuove l'elemento dall'array usando lo splice
        menuData[catIndex].items.splice(itemIndex, 1);
        
        // Aggiorna la memoria locale
        localStorage.setItem('theTimeMenu', JSON.stringify(menuData));
        
        // Ridisegna la lista admin corrente
        renderAdminList();
    }
}

// --- 4. GESTIONE INVIO MODULO ADDIZIONE ---
const adminForm = document.getElementById('admin-form');
if (adminForm) {
    adminForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const category = document.getElementById('admin-category').value;
        const name = document.getElementById('admin-name').value;
        const price = document.getElementById('admin-price').value;
        const desc = document.getElementById('admin-desc').value;

        const targetSection = menuData.find(section => section.category === category);

        if (targetSection) {
            targetSection.items.push({
                name: name,
                price: `€ ${price}`,
                desc: desc
            });

            localStorage.setItem('theTimeMenu', JSON.stringify(menuData));

            document.getElementById('admin-name').value = '';
            document.getElementById('admin-price').value = '';
            document.getElementById('admin-desc').value = '';
            
            // Aggiorna subito la lista visibile nell'admin
            renderAdminList();
            alert('Prodotto aggiunto con successo!');
        }
    });
}

// Avvio automatico in base alla pagina in cui ci troviamo
renderMenu();
renderAdminList();