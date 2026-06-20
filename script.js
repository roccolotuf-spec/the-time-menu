// 1. Dati iniziali del menu (se non c'è nulla salvato nel browser)
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

// Carica i dati salvati o usa quelli di default
let menuData = JSON.parse(localStorage.getItem('theTimeMenu')) || defaultMenuData;

// 2. Funzione per renderizzare il menu nell'HTML
function renderMenu() {
    const container = document.getElementById('menu-container');
    container.innerHTML = ''; // Svuota prima di rifare il ciclo

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

// 3. Logica del Pannello Admin per aggiungere prodotti al volo
document.getElementById('admin-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Blocca il ricaricamento della pagina

    const category = document.getElementById('admin-category').value;
    const name = document.getElementById('admin-name').value;
    const price = document.getElementById('admin-price').value;
    const desc = document.getElementById('admin-desc').value;

    // Trova la categoria giusta nell'array
    const targetSection = menuData.find(section => section.category === category);

    if (targetSection) {
        // Aggiunge il nuovo prodotto
        targetSection.items.push({
            name: name,
            price: `€ ${price}`,
            desc: desc
        });

        // Salva nel localStorage del browser
        localStorage.setItem('theTimeMenu', JSON.stringify(menuData));

        // Aggiorna la vista del menu all'istante
        renderMenu();

        // Svuota i campi del form
        document.getElementById('admin-name').value = '';
        document.getElementById('admin-price').value = '';
        document.getElementById('admin-desc').value = '';
        
        alert('Prodotto aggiunto al volo con successo! 🔥');
    }
});

// Mostra il menu all'avvio
renderMenu();