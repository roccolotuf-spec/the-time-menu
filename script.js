// Dati reali presi dalle foto del menu "The Time"
const menuData = [
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

// Funzione per generare il menu sulla pagina HTML
const container = document.getElementById('menu-container');

menuData.forEach(section => {
    // 1. Crea il titolo della categoria
    const title = document.createElement('div');
    title.className = 'section-title';
    title.innerText = section.category;
    container.appendChild(title);

    // 2. Crea i singoli elementi
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